const {
  NODEMAILER_HOST,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  NODEMAILER_PORT,
  NODEMAILER_SERVICE,
  NODEMAILER_SECURE,
  SUPPORT_EMAIL,
} = process.env

export const mailConfig = {
  user: EMAIL_ADDRESS,
  options: {
    host: NODEMAILER_HOST || 'smtp.example.com',
    port: Number(NODEMAILER_PORT) || 465,
    secure: String(NODEMAILER_SECURE) === 'true' ? true : false,
    service: NODEMAILER_SERVICE || 'gmail',
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  },
  supportEmail: SUPPORT_EMAIL || '',
}
