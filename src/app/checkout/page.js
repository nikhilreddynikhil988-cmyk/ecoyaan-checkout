"use client"

import { useRouter } from "next/navigation"
import AddressForm from "@/components/AddressProfe"
export default function CheckoutPage() {
  const router = useRouter()
  const handleSubmit = () => {
    router.push("/payment")
  }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h1>
        <p className="mt-2 text-sm text-gray-500">Please provide your shipping details.</p>
      </div>
      <AddressForm onSubmit={handleSubmit} />
    </div>
  )
}