import Link from "next/link"
import CartItems from "@/components/CartItemsPage"
import OrderSummary from "@/components/OdderSummery"
import { cartData } from "@/data/cartData"

export default async function CartPage(){
  const subtotal = cartData.cartItems.reduce(
    (acc,item)=>acc + item.product_price * item.quantity,
    0
  )


  const total = subtotal + cartData.shipping_fee

  return(

    <div className="p-4 sm:p-10 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Cart
      </h1>

      <CartItems items={cartData.cartItems} />

      <OrderSummary subtotal={subtotal} shipping={cartData.shipping_fee} total={total} />

      <Link href="/checkout">

        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
          Proceed to Checkout
        </button>

      </Link>

    </div>

  )
}