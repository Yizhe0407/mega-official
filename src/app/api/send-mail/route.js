import nodemailer from 'nodemailer'

export async function POST(request) {
  const reservation = await request.json()

  // 建立 transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  // 郵件內容
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.NOTIFICATION_EMAILS,
    subject: '新預約通知',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 32px auto; background: #fff; border-radius: 16px; box-shadow: 0 6px 32px rgba(52,152,219,0.08); overflow: hidden; border: 1px solid #e3e8ee;">
      <div style="background: linear-gradient(90deg,#3498db 0%,#6dd5fa 100%); padding: 32px 0 20px 0;">
        <h2 style="color: #fff; text-align: center; font-size: 1.6rem; letter-spacing: 2px; margin: 0;">新預約通知</h2>
      </div>
      <div style="padding: 28px 24px 8px 24px;">
        <div style="background: #f4f8fb; border-radius: 10px; padding: 18px 16px 12px 16px; margin-bottom: 18px;">
          <h3 style="color: #3498db; font-size: 1.1rem; margin: 0 0 12px 0; font-weight: 600;">預約詳情</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 7px 0; color: #222;"><strong>姓名：</strong>${reservation.name}</li>
            <li style="margin: 7px 0; color: #222;"><strong>預約日期：</strong>${reservation.date}</li>
            <li style="margin: 7px 0; color: #222;"><strong>預約時間：</strong>${reservation.time}</li>
            <li style="margin: 7px 0; color: #222;"><strong>車牌號碼：</strong>${reservation.license}</li>
            <li style="margin: 7px 0; color: #222;"><strong>聯絡電話：</strong>${reservation.phone}</li>
            <li style="margin: 7px 0; color: #222;"><strong>是否需要到府牽車：</strong>${reservation.extra ? '是' : '否'}</li>
          </ul>
        </div>
        <div style="background: #eaf6ff; border-radius: 10px; padding: 16px 12px; text-align: center; margin-bottom: 16px;">
          <span style="color: #3498db; font-weight: 500; font-size: 1rem;">請儘快確認並與客戶聯繫</span>
        </div>
        <div style="text-align: center; margin-top: 18px; font-size: 12px; color: #b0b8c1;">
          <p style="margin: 0;">此為系統自動發送的郵件，請勿直接回覆</p>
          <p style="margin: 0;">兆豐汽車保養廠 © 2025</p>
        </div>
      </div>
    </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}