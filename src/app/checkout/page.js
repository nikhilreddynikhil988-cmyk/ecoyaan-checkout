"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {

  const router = useRouter()

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    pincode:"",
    city:"",
    state:""
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(formData.phone.length !== 10){
      alert("Phone number must be 10 digits")
      return
    }

    router.push("/payment")
  }

  return (

    <div className="max-w-xl mx-auto p-10">

      <h1 className="text-2xl font-bold mb-6">
        Shipping Address
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <input
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <input
        name="pincode"
        placeholder="PIN Code"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        className="border p-2"
        required
        />

        <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded"
        >
        Continue to Payment
        </button>

      </form>

    </div>
  )
}