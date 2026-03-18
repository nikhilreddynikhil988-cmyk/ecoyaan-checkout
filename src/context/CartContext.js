"use client"

import { createContext, useState, useEffect } from "react"
import { cartData } from "@/data/cartData"
export const CartContext = createContext()
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartData.cartItems)
  const [addresses, setAddresses] = useState([])
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
  
  const address = selectedAddressIndex !== null ? addresses[selectedAddressIndex] : null
  const setAddress = (addr) => {} // Backward compatibility stub
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        address,
        setAddress,
        addresses,
        setAddresses,
        selectedAddressIndex,
        setSelectedAddressIndex,
        addAddress,
        isMounted
      }}
    >
      {children}
    </CartContext.Provider>
  )
}