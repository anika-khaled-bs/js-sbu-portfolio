import { mailService } from '@/helper/mail'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, subject, mailBody } = body

    if (!email || !subject || !mailBody) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Use the mailService from your helper
    const result = await mailService.sendMail(email, subject, mailBody)

    if (result === null || result === false) {
      return NextResponse.json(
        { success: false, message: 'Failed to send notification email' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: 'Notification email sent successfully' })
  } catch (error) {
    console.error('Notification sending error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
