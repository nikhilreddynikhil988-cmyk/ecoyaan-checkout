"use client"

import { createContext, useState } from "react"
import { cartData } from "@/data/cartData"
export const CartContext = createContext()
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(cartData.cartItems)
  const [address, setAddress] = useState(null)
  return (
    <CartContext.Provider
      value={{
        cart,
        address,
        setAddress
      }}
    >
      {children}
    </CartContext.Provider>
  )
}