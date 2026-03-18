import Link from "next/link"
import { CheckIcon } from "@heroicons/react/24/solid"

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