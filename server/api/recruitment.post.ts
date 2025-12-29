import {
  H3Event,
  defineEventHandler,
  sendError,
  createError,
  readMultipartFormData,
  getRequestIP,
  getRequestHeader
} from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // 1️⃣ Read multipart/form-data
    const formData = await readMultipartFormData(event)

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid form data'
      })
    }

    // Helper lấy field text
    const getField = (name: string) =>
      String(formData.find(f => f.name === name)?.data || '').trim()

    // 2️⃣ Parse fields
    const fullName = getField('fullName')
    const email = getField('email')
    const phone = getField('phone')
    const position = getField('position')
    const experience = getField('experience')
    const education = getField('education')
    const skills = getField('skills')
    const coverLetter = getField('coverLetter')

    const fileField = formData.find(f => f.name === 'file' && f.type)

    // 3️⃣ Validate bắt buộc
    if (!fullName || !email || !phone || !position) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Vui lòng điền đầy đủ thông tin bắt buộc'
      })
    }

    // 4️⃣ Validate file (nếu có)
    let attachment: any = null

    if (fileField) {
      const MAX_SIZE = 5 * 1024 * 1024 // 5MB
      const ALLOWED_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      if (fileField.data.length > MAX_SIZE) {
        throw createError({
          statusCode: 422,
          statusMessage: 'File vượt quá 5MB'
        })
      }

      if (!ALLOWED_TYPES.includes(fileField.type!)) {
        throw createError({
          statusCode: 422,
          statusMessage: 'Định dạng file không hợp lệ (PDF, DOC, DOCX)'
        })
      }

      attachment = {
        filename: fileField.filename || 'cv',
        content: fileField.data, // Buffer (KHÔNG lưu server)
        contentType: fileField.type
      }
    }

    // 5️⃣ SMTP config
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'koa.webcontact@gmail.com',
        pass: 'siccsfqoyxvheuby'
      }
    })

    // 6️⃣ Nội dung email
    const emailHtml = `
      <h2>Ứng tuyển mới từ website</h2>
      <p><strong>Họ và tên:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Số điện thoại:</strong> ${phone}</p>
      <p><strong>Vị trí ứng tuyển:</strong> ${position}</p>

      ${experience ? `<p><strong>Kinh nghiệm:</strong><br>${experience.replace(/\n/g, '<br>')}</p>` : ''}
      ${education ? `<p><strong>Học vấn:</strong><br>${education.replace(/\n/g, '<br>')}</p>` : ''}
      ${skills ? `<p><strong>Kỹ năng:</strong><br>${skills.replace(/\n/g, '<br>')}</p>` : ''}
      ${coverLetter ? `<p><strong>Thư giới thiệu:</strong><br>${coverLetter.replace(/\n/g, '<br>')}</p>` : ''}

      <hr>
      <p>
        <small>
          Thời gian: ${new Date().toLocaleString('vi-VN')}<br>
          IP: ${getRequestIP(event)}<br>
          User-Agent: ${getRequestHeader(event, 'user-agent') || ''}
        </small>
      </p>
    `

    // 7️⃣ Send email (đính kèm CV nếu có)
    await transporter.sendMail({
      from: `"KOA Recruitment" <koa.webcontact@gmail.com>`,
      to: 'koastudio.vn@gmail.com',
      // to: 'tuanthanhktltk21@gmail.com',
      subject: `Ứng tuyển mới: ${fullName} – ${position}`,
      html: emailHtml,
      attachments: attachment ? [attachment] : []
    })

    // 8️⃣ Log server
    console.info('[Recruitment] New application', {
      fullName,
      email,
      phone,
      position,
      hasCV: !!attachment,
      ip: getRequestIP(event)
    })

    return {
      ok: true,
      message: 'Gửi hồ sơ thành công'
    }

  } catch (err: any) {
    return sendError(event, err)
  }
})
