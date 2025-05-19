'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields as any,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          // Successfully submitted form, now send notification email
          // Format data for email
          const emailField =
            dataToSend.find((item) => item.field === 'email')?.value || 'No email provided'
          const nameField = dataToSend.find((item) => item.field === 'name')?.value || 'Unknown'
          const messageField =
            dataToSend.find((item) => item.field === 'message')?.value || 'No message content'

          // Create HTML email body
          const mailBody = `
            <h2>New Lead From Website</h2>
            <p><strong>Name:</strong> ${nameField}</p>
            <p><strong>Email:</strong> ${emailField}</p>
            <p><strong>Message:</strong></p>
            <p>${messageField}</p>
            <hr />
            <h3>All Form Fields:</h3>
            <ul>
              ${dataToSend.map((item) => `<li><strong>${item.field}:</strong> ${item.value || 'Not provided'}</li>`).join('')}
            </ul>
          `

          // Send notification email via our API
          try {
            const req = await fetch(`${getClientSideURL()}/api/send-notification`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: emailField || 'client@example.com',
                subject: `New Contact Form Submission: ${nameField}`,
                mailBody,
              }),
            })
            const res = await req.json()
            if (!res.success) {
              setIsLoading(false)
              reset(formFromProps.fields as any)
              setError({
                message: res.message || 'Internal Server Error',
              })

              return
            }
            // We don't need to handle the response as this is just a notification
          } catch (emailError) {
            // Log error but don't disrupt user flow
            console.error('Failed to send notification email:', emailError)
          }

          setIsLoading(false)
          setHasSubmitted(true)

          // Reset form fields to their default values
          // reset(formFromProps.fields as any)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, reset, formFromProps.fields],
  )

  return (
    <div className="container">
      <div className="lg:max-w-[48rem] mt-4  border rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
        {enableIntro && introContent && !hasSubmitted && !error && (
          <RichText className="mb-6 lg:mb-6" data={introContent} enableGutter={false} />
        )}
        <div className="px-4 pt-4 lg:px-6 lg:pt-6 pb-0">
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <div className="bg-primary-foreground p-4 rounded-md mb-4">
                <RichText data={confirmationMessage} className="text-sm text-muted-foreground" />
              </div>
            )}

            {error && (
              <div className="bg-red-400 p-4 rounded-md mb-4">{`${error.status || '500'}: ${error.message || ''}`}</div>
            )}
            {
              <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 last:mb-0">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                </div>

                <Button
                  form={formID}
                  type="submit"
                  variant="default"
                  disabled={isLoading}
                  className="mb-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    submitButtonLabel
                  )}
                </Button>
              </form>
            }
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
