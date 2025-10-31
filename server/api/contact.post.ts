import { H3Event, sendError, createError, readBody } from 'h3'

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

    // For now we just log the submission server-side.
    // Replace this with emailing or persistence as needed.
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


