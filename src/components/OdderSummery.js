export default function OrderSummary({ subtotal, shipping, total }) {
  return (
    <div className="mt-4">
      <p>Subtotal: ₹{subtotal}</p>
      <p>Shipping: ₹{shipping}</p>
      <p className="font-bold">Total: ₹{total}</p>
    </div>
  )
}