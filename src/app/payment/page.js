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
  const total = subtotal + shippings
  const handlePayment = () => {
    router.push("/success")
  }
  useEffect(() => {
    if (!address) {
      router.push("/checkout")
    }
  }, [address, router])
  if (!address) {
    return <div className="max-w-2xl mx-auto p-10 text-center">Redirecting to checkout...</div>
  }
  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <CartItems items={cart} />
        <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="border p-4">
          <p><strong>Name:</strong> {address.name}</p>
          <p><strong>Email:</strong> {address.email}</p>
          <p><strong>Phone:</strong> {address.phone}</p>
          <p><strong>Address:</strong> {address.pincode}, {address.city}, {address.state}</p>
        </div>
      </div>
      <div className="border p-5 rounded mb-5">
        <h2 className="font-semibold mb-2">Payment Method</h2>
        <p>Secure Payment (Simulation)</p>
      </div>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-5 py-2 rounded">Pay Securely</button>
    </div>
  )
}