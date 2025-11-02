import { H3Event, sendError, createError, readBody } from 'h3'
import nodemailer from 'nodemailer'

interface ContactPayload {
  name: string
  phone?: string
  email?: string
  projectType?: string
  budget?: string
  message?: string
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event)) as Partial<ContactPayload> | null

    if (!body || typeof body !== 'object') {
      throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
    }

    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').trim()
    const email = String(body.email || '').trim()
    const projectType = String(body.projectType || '').trim()
    const budget = String(body.budget || '').trim()
    const message = String(body.message || '').trim()

    if (!name) {
      throw createError({ statusCode: 422, statusMessage: 'Name is required' })
    }
    if (!phone && !email) {
      throw createError({ statusCode: 422, statusMessage: 'Phone or Email is required' })
    }

    // Email configuration - UPDATE THESE VALUES
    const smtpHost = 'smtp.gmail.com'
    const smtpPort = 587
    const smtpUser = 'koa.webcontact@gmail.com' // Thay bằng email của bạn
    const smtpPass = 'siccsfqoyxvheuby' // Thay bằng app password
    const toEmail = 'koastudio.vn@gmail.com' // Email nhận thông báo

    // Send email
    try {
      // Simple HTML escape function
      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
      }

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: false, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      // Prepare email content
      const emailHtml = `
          <h2>Liên hệ báo giá mới từ website</h2>
          <p><strong>Họ và tên:</strong> ${escapeHtml(name)}</p>
          ${phone ? `<p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>` : ''}
          ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ''}
          ${projectType ? `<p><strong>Loại dự án:</strong> ${escapeHtml(projectType)}</p>` : ''}
          ${budget ? `<p><strong>Ngân sách:</strong> ${escapeHtml(budget)}</p>` : ''}
          ${message ? `<p><strong>Nội dung:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Thời gian: ${new Date().toLocaleString('vi-VN')}</small></p>
        `

      // Send email
      await transporter.sendMail({
        from: `"Website KOA" <${smtpUser}>`,
        to: toEmail,
        subject: `Liên hệ mới từ ${escapeHtml(name)}`,
        html: emailHtml,
      })

      // eslint-disable-next-line no-console
      console.info('[Contact] Email sent successfully')
    } catch (emailError: any) {
      // Log email error but don't fail the request
      // eslint-disable-next-line no-console
      console.error('[Contact] Email error:', emailError.message)
    }

    // Log the submission
    // eslint-disable-next-line no-console
    console.info('[Contact] New submission:', {
      name,
      phone,
      email,
      projectType,
      budget,
      message,
      receivedAt: new Date().toISOString(),
      ip: getRequestIP(event),
      ua: getRequestHeader(event, 'user-agent') || '',
    })

    return {
      ok: true,
      message: 'Submitted successfully',
    }
  } catch (err: any) {
    return sendError(event, err)
  }
})


