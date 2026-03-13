export default function CartItems({ items }) {
  return (
    <>
      {items.map(item => (
        <div key={item.product_id} className="flex flex-col sm:flex-row gap-4 border p-4 mb-4">
          <img src={item.image} width={80} className="mx-auto sm:mx-0" alt={item.product_name} />
          <div className="text-center sm:text-left">
            <h2 className="font-semibold">{item.product_name}</h2>
            <p>₹{item.product_price}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </>
  )
}