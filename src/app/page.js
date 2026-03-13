import { cartData } from "@/data/cartData";
import Link from "next/link";

export default function cartPage() {
const subtotal=cartData.cartItems.reduce((acc,item)=>acc+item.product_price*item.quantity,0);
const total=subtotal+cartData.shipping_cost;
    return(
        <div className="p-10 flex flex-col gap-5">
            <h1 className="text-2xl ">Cart Page</h1>
            {cartData.cartItems.map((item)=>(
                <div key={item.id} className="flex gap-5 items-center">
                    <img src={item.image} className="w-20 h-20 object-cover"/>
                    <div>
                        <h2 className="text-lg">{item.product_name}</h2>
                        <p>Price: ${item.product_price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                </div>
            ))}
            <div className="mt-5">
                <p>Subtotal: ${subtotal}</p>
                <p>Shipping Cost: ${cartData.shipping_cost}</p>
                <p>Total: ${total}</p>
            </div>
            <Link href="/checkout">
            <button  className="bg-green-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>
            </Link>
        </div>
    );
    }