import Link from "next/link"
import CartItems from "@/components/CartItemsPage"
import OrderSummary from "@/components/OdderSummery"
import { cartData } from "@/data/cartData"

export default async function CartPage() {
  const subtotal = cartData.cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  )
  const total = subtotal + cartData.shipping_fee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart</h1>
        <p className="mt-2 text-sm text-gray-500">Review your items before proceeding to checkout.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
               <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               Cart Items
             </h2>
             <CartItems items={cartData.cartItems} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <OrderSummary subtotal={subtotal} shipping={cartData.shipping_fee} total={total} />
            <Link href="/checkout" className="block">
              <button className="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/30 hover:bg-green-500 hover:shadow-green-600/40 transition-all transform active:scale-95 flex justify-center items-center gap-2">
                Proceed to Checkout
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}