import Link from "next/link"

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  )
}

export const metadata = {
  title: 'Purchase Successful - Ecoyaan',
  description: 'Thank you for your purchase from Ecoyaan.',
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pb-24">

            <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">

                <div className="flex justify-center mb-6">
                    <CheckIcon className="w-16 h-16 text-green-600" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
                    Thank You for Your Purchase!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your order has been successfully placed. We will notify you once it is shipped.
                </p>

                <Link
                    href="/"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                    Back to Home
                </Link>

            </div>
        </div>
    )
}