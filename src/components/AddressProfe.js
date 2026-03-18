"use client"

import { useState, useContext, useEffect } from "react"
import Link from "next/link"
import OrderSummary from "./OdderSummery"
import { CartContext } from "@/context/CartContext"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

const InputField = ({ name, placeholder, value, onChange, error, type = "text", required = true }) => (
  <div>
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full border p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-900 ${error ? 'border-red-500' : 'border-gray-300'}`}
      required={required}
    />
    {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
  </div>
)

export default function AddressForm() {
  const { addresses, selectedAddressIndex, setSelectedAddressIndex, addAddress, isMounted, cart } = useContext(CartContext)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (isMounted && addresses.length === 0) {
      const savedAddresses = localStorage.getItem("ecoyaan_saved_addresses")
      if (savedAddresses) {
        try {
          const parsed = JSON.parse(savedAddresses)
          if (Array.isArray(parsed) && parsed.length > 0) {
            parsed.forEach(addr => addAddress(addr))
            const savedIndex = localStorage.getItem("ecoyaan_selected_index")
            if (savedIndex !== null) {
              setSelectedAddressIndex(Number(savedIndex))
            } else {
              // Default to the first saved address
              setSelectedAddressIndex(0)
            }
            return
          }
        } catch (e) { console.error("Failed to load addresses", e) }
      }
      setShowForm(true) 
    }
  
  }, [isMounted])
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("ecoyaan_saved_addresses", JSON.stringify(addresses))
    }
  }, [addresses])

  useEffect(() => {
    if (selectedAddressIndex !== null) {
      localStorage.setItem("ecoyaan_selected_index", String(selectedAddressIndex))
    }
  }, [selectedAddressIndex])

  const subtotal = cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0)
  const shipping = 50 // Assuming fixed shipping
  const total = subtotal + shipping

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const savedForm = localStorage.getItem("ecoyaan_form_draft")
    if (savedForm) {
      try {
        setFormData(JSON.parse(savedForm))
      } catch (e) {}
    }
  }, [])

  if (!isMounted) return null; 

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(updatedData)
    localStorage.setItem("ecoyaan_form_draft", JSON.stringify(updatedData))

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Full Name is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.pincode) {
      newErrors.pincode = "PIN Code is required"
    } else if (formData.pincode.length !== 6 || isNaN(formData.pincode)) {
      newErrors.pincode = "PIN Code must be 6 digits"
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits"
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      setErrors({})
      addAddress(formData)
      setSelectedAddressIndex(addresses.length) // Auto-select the newly added address
      localStorage.removeItem("ecoyaan_form_draft")
      setShowForm(false)
      setFormData({
        name: "", email: "", address: "", city: "", state: "", pincode: "", phone: ""
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-32">
      <div className="lg:col-span-2 space-y-8">
        {addresses.length > 0 && !showForm && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Select a Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedAddressIndex(index)}
                  className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                    selectedAddressIndex === index 
                      ? 'border-green-600 bg-green-100 shadow-md scale-[1.02]' 
                      : 'border-gray-200 hover:border-green-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">{addr.name}</h3>
                      {selectedAddressIndex === index && (
                        <CheckCircleIcon className="w-7 h-7 text-green-600" />
                      )}
                    </div>
                    <div className="text-gray-600 leading-relaxed">
                      <p>{addr.address}</p>
                      <p>{addr.city}, {addr.state} {addr.pincode}</p>
                      <p className="mt-3 text-gray-500 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {addr.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-green-300 rounded-xl text-green-700 font-semibold hover:bg-green-50 hover:border-green-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add a new address
            </button>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 border border-gray-200 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Add New Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <InputField name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
              </div>
              <InputField name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
              <InputField name="phone" placeholder="Phone Number" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
              <div className="sm:col-span-2">
                <InputField name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} error={errors.address} />
              </div>
              <InputField name="city" placeholder="City" value={formData.city} onChange={handleChange} error={errors.city} />
              <InputField name="state" placeholder="State" value={formData.state} onChange={handleChange} error={errors.state} />
              <div className="col-span-1">
                <InputField name="pincode" placeholder="PIN Code" value={formData.pincode} onChange={handleChange} error={errors.pincode} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
              {addresses.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors"
              >
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-28">
          <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
          
          <Link
            href={addresses.length > 0 && selectedAddressIndex !== null ? "/payment" : "#"}
            className={`flex items-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 transition-all transform active:scale-95 ${
              addresses.length === 0 || selectedAddressIndex === null ? 'opacity-50 cursor-not-allowed pointer-events-none grayscale' : ''
            }`}
          >
            Next
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}