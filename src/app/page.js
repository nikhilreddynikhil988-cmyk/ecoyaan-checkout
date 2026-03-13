import Link from "next/link"

export default async function CartPage(){

  const res = await fetch("http://localhost:3000/api/cart",{
    cache:"no-store"
  })

  const cartData = await res.json()

  const subtotal = cartData.cartItems.reduce(
    (acc,item)=>acc + item.product_price * item.quantity,
    0
  )

  const total = subtotal + cartData.shipping_fee

  return(

    <div className="p-10 max-w-2xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Cart
      </h1>

      {cartData.cartItems.map(item => (

        <div key={item.product_id} className="flex gap-4 border p-4 mb-4">

          <img src={item.image} width={80}/>

          <div>

            <h2 className="font-semibold">
              {item.product_name}
            </h2>

            <p>₹{item.product_price}</p>

            <p>Qty: {item.quantity}</p>

          </div>

        </div>

      ))}

      <p>Subtotal: ₹{subtotal}</p>

      <p>Shipping: ₹{cartData.shipping_fee}</p>

      <p className="font-bold">
        Total: ₹{total}
      </p>

      <Link href="/checkout">

        <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
          Proceed to Checkout
        </button>

      </Link>

    </div>

  )
}