"use client"

import { useRouter } from "next/navigation"
import AddressForm from "@/components/AddressProfe"

export default function CheckoutPage() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push("/payment")
  }

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      <AddressForm onSubmit={handleSubmit} />
    </div>
  )
}