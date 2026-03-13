export default function SuccessPage() {
    return (
        <div className="max-w-xl mx-auto p-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
            <p className="text-lg mb-6">Your order has been successfully placed. We will notify you once it is shipped.</p>
            <a href="/" className="bg-green-600 text-white px-5 py-2 rounded">Back to Home</a>
        </div>
    )
}