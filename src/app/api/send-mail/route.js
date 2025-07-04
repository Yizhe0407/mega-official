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
    to: 'liaoyizhe75@gmail.com',
    subject: '新預約通知',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">新預約通知</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
          <h3 style="color: #2c3e50; margin-bottom: 15px;">預約詳情</h3>
          <p style="margin: 8px 0;"><strong>姓名：</strong>${reservation.name}</p>
          <p style="margin: 8px 0;"><strong>預約日期：</strong>${reservation.date}</p>
          <p style="margin: 8px 0;"><strong>預約時間：</strong>${reservation.time}</p>
          <p style="margin: 8px 0;"><strong>車牌號碼：</strong>${reservation.license}</p>
          <p style="margin: 8px 0;"><strong>聯絡電話：</strong>${reservation.phone}</p>
          <p style="margin: 8px 0;"><strong>是否需要到府牽車：</strong>${reservation.extra ? '是' : '否'}</p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
          <p style="color: #666; margin: 5px 0;">請儘快確認此預約並與客戶聯繫</p>
          <p style="color: #666; margin: 5px 0;">如有任何問題，請立即處理</p>
        </div>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
          <p>此為系統自動發送的郵件，請勿直接回覆</p>
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