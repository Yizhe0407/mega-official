import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">感謝您的預約！</h2>
        <p className="text-base text-gray-600 text-center leading-relaxed">
          我們已收到您的預約，<br />
          稍後將會與您聯繫確認。
        </p>
      </div>
    </div>
  )
}
