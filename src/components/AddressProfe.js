"use client"

import { useState, useContext } from "react"
import { CartContext } from "@/context/CartContext"

export default function AddressForm({ onSubmit }) {
  const { setAddress } = useContext(CartContext)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    city: "",
    state: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.pincode || !formData.city || !formData.state) {
      alert("All fields are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email")
      return
    }

    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert("Phone number must be 10 digits")
      return
    }

    if (formData.pincode.length !== 6 || isNaN(formData.pincode)) {
      alert("PIN Code must be 6 digits")
      return
    }

    setAddress(formData)
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        name="pincode"
        placeholder="PIN Code"
        value={formData.pincode}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border p-2"
        required
      />

      <input
        name="state"
        placeholder="State"
        value={formData.state}
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
  )
}