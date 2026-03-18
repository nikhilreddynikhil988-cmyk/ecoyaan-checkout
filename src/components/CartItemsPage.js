"use client"

import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function CartItems({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
        <p className="text-gray-500 font-medium">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.product_id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:border-green-300 hover:shadow-md transition-all duration-200 group">
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <img src={item.image} className="w-full h-full rounded-xl object-cover" alt={item.product_name} />
          </div>
          
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-green-700 transition-colors">{item.product_name}</h3>
            <p className="text-gray-500 text-sm mt-1">Unit Price: ₹{Number(item.product_price).toFixed(2)}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4 sm:mt-0">
            
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 w-full sm:w-auto justify-center">
              <button type="button" className="p-2 text-gray-500 hover:text-green-600 hover:bg-white rounded-full transition-all shadow-sm"><MinusIcon className="h-4 w-4" /></button>
              <span className="px-4 font-semibold text-gray-900 min-w-[3rem] text-center">{item.quantity}</span>
              <button type="button" className="p-2 text-gray-500 hover:text-green-600 hover:bg-white rounded-full transition-all shadow-sm"><PlusIcon className="h-4 w-4" /></button>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
              <p className="font-bold text-gray-900 text-lg w-24 text-left sm:text-right">
                ₹{(Number(item.product_price) * Number(item.quantity)).toFixed(2)}
              </p>
              
              <button title="Remove item" type="button" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            
          </div>
          
        </div>
      ))}
    </div>
  )
}