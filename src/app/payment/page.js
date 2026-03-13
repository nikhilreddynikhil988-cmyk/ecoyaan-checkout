"use client"

import { useRouter } from "next/navigation"
export default function PaymentPage(){
  const router = useRouter()
  const handlePayment = () =>{
    router.push("/success")
  }
  return(
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Order Confirmation</h1>
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