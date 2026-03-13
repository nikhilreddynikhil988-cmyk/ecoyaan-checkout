import { cartData } from "@/data/cartData";
import Link from "next/link";

export default function CartPage(){

  const subtotal = cartData.cartItems.reduce(
    (acc,item)=>acc + item.product_price * item.quantity,0);
  const total = subtotal + cartData.shipping_fee;
  return (
    <div className="p-10 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cartData.cartItems.map(item => (
        <div key={item.product_id} className="border p-4 flex gap-4">
          <img src={item.image} width={80} />
          <div>
            <h2>{item.product_name}</h2>
            <p>₹{item.product_price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{cartData.shipping_fee}</p>
        <p>Total: ₹{total}</p>
      </div>
      <Link href="/checkout">
        <button className="bg-green-600 text-white p-2 rounded">Proceed to Checkout</button>
      </Link>
    </div>
  );
}