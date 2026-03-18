"use client"

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CartContext } from "@/context/CartContext"
import CartItems from "@/components/CartItemsPage"
import OrderSummary from "@/components/OdderSummery"

export default function PaymentPage() {
  const router = useRouter()
  const { cart, address } = useContext(CartContext)
  
  const subtotal = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0)
  const shipping = 50
  const total = subtotal + shipping
  
  const handlePayment = () => {
    router.push("/success")
  }
  
  useEffect(() => {
    if (!address) {
      router.push("/checkout")
    }
  }, [address, router])
  
  if (!address) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Redirecting to checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order Confirmation</h1>
        <p className="mt-2 text-sm text-gray-500">Please review your order details before final payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              Order Items
            </h2>
            <CartItems items={cart} />
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Shipping Address
            </h2>
            <div className="bg-green-50/50 rounded-2xl p-5 border border-green-100">
              <p className="font-semibold text-gray-900 text-lg">{address.name}</p>
              <p className="text-gray-600 mt-2 leading-relaxed tracking-wide">{address.address}</p>
              <p className="text-gray-600">{address.city}, {address.state} <span className="font-medium text-gray-900">{address.pincode}</span></p>
              <div className="mt-4 pt-4 border-t border-green-200/50 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-600">
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{address.email}</p>
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{address.phone}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
            
            <div className="bg-gray-900 rounded-3xl p-6 shadow-xl text-white">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Secure Payment
              </h2>
              <p className="text-gray-400 text-sm mb-6">Your transaction is encrypted and secure.</p>
              <button
                onClick={handlePayment}
                className="w-full bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:bg-green-400 hover:shadow-green-500/40 transition-all transform active:scale-95 flex justify-center items-center gap-2"
              >
                Pay ${total.toFixed(2)}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}