import { Payload } from 'payload'

export const send_email = async (payload: Payload): Promise<void> => {
  payload.sendEmail({
    from: 'community@inner.garden',
    to: 'pokharnajay@gmail.com',
    subject: 'Message subject title',
    html: '<p>HTML based message</p>',
  })
}
