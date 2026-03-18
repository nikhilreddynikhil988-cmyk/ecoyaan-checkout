export default function OrderSummary({ subtotal, shipping, total, items, cta }) {
  return (
    <div className="bg-gray-50/80 rounded-3xl p-6 lg:p-8 border border-gray-100/50 shadow-sm relative overflow-hidden">
      {/* Subtle decorative background blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mx-10 -my-10 pointer-events-none"></div>
      
      <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200/60 pb-4 mb-6 relative z-10 flex items-center justify-between">
        Order Summary
      </h2>
      
      {items && (
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 relative z-10 scrollbar-thin scrollbar-thumb-gray-200">
          {items.map(item => (
            <div key={item.product_id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img src={item.image} className="w-full h-full rounded-xl object-cover border border-gray-200/50 shadow-sm" alt={item.product_name} />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ring-2 ring-white">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">{item.product_name}</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                ₹{(item.product_price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className={`relative z-10 space-y-3 ${items ? 'mt-6 pt-6 border-t border-gray-200/60' : ''}`}>
        <div className="flex justify-between text-gray-600 text-sm font-medium">
          <span>Subtotal</span>
          <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm font-medium">
          <span>Shipping</span>
          <span className="text-gray-900">₹{shipping.toFixed(2)}</span>
        </div>
        
        <div className="flex flex-col mt-4 pt-4 border-t border-gray-200/60">
          <div className="flex justify-between items-end">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-extrabold text-green-700 text-2xl">₹{total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">Including taxes and fees</p>
        </div>
      </div>
      
      {cta && <div className="mt-8 relative z-10">{cta}</div>}
    </div>
  )
}