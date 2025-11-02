import { H3Event, sendError, createError, readBody } from 'h3'
import nodemailer from 'nodemailer'

interface RecruitmentPayload {
  fullName: string
  email: string
  phone: string
  position: string
  experience?: string
  education?: string
  skills?: string
  coverLetter?: string
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event)) as Partial<RecruitmentPayload> | null

    if (!body || typeof body !== 'object') {
      throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
    }

    const fullName = String(body.fullName || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const position = String(body.position || '').trim()
    const experience = String(body.experience || '').trim()
    const education = String(body.education || '').trim()
    const skills = String(body.skills || '').trim()
    const coverLetter = String(body.coverLetter || '').trim()

    if (!fullName) {
      throw createError({ statusCode: 422, statusMessage: 'Full name is required' })
    }
    if (!email) {
      throw createError({ statusCode: 422, statusMessage: 'Email is required' })
    }
    if (!phone) {
      throw createError({ statusCode: 422, statusMessage: 'Phone is required' })
    }
    if (!position) {
      throw createError({ statusCode: 422, statusMessage: 'Position is required' })
    }

    // Email configuration - UPDATE THESE VALUES
    const smtpHost = 'smtp.gmail.com'
    const smtpPort = 587
    const smtpUser = 'koa.webcontact@gmail.com'
    const smtpPass = 'siccsfqoyxvheuby'
    const toEmail = 'koastudio.vn@gmail.com'

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
          <h2>Ứng tuyển mới từ website</h2>
          <p><strong>Họ và tên:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Vị trí ứng tuyển:</strong> ${escapeHtml(position)}</p>
          ${experience ? `<p><strong>Kinh nghiệm:</strong><br>${escapeHtml(experience).replace(/\n/g, '<br>')}</p>` : ''}
          ${education ? `<p><strong>Học vấn:</strong><br>${escapeHtml(education).replace(/\n/g, '<br>')}</p>` : ''}
          ${skills ? `<p><strong>Kỹ năng:</strong><br>${escapeHtml(skills).replace(/\n/g, '<br>')}</p>` : ''}
          ${coverLetter ? `<p><strong>Thư giới thiệu:</strong><br>${escapeHtml(coverLetter).replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Thời gian: ${new Date().toLocaleString('vi-VN')}</small></p>
        `

      // Send email
      await transporter.sendMail({
        from: `"Website KOA - Recruitment" <${smtpUser}>`,
        to: toEmail,
        subject: `Ứng tuyển mới: ${escapeHtml(fullName)} - ${escapeHtml(position)}`,
        html: emailHtml,
      })

      // eslint-disable-next-line no-console
      console.info('[Recruitment] Email sent successfully')
    } catch (emailError: any) {
      // Log email error but don't fail the request
      // eslint-disable-next-line no-console
      console.error('[Recruitment] Email error:', emailError.message)
    }

    // Log the submission
    // eslint-disable-next-line no-console
    console.info('[Recruitment] New application:', {
      fullName,
      email,
      phone,
      position,
      experience,
      education,
      skills,
      coverLetter,
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

