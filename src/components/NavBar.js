"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  const steps = [
    { href: "/", label: "Cart", step: 1 },
    { href: "/checkout", label: "Address", step: 2 },
    { href: "/payment", label: "Payment", step: 3 },
    { href: "/success", label: "Success", step: 4 },
  ]

  const currentStep = steps.find(step => step.href === pathname)?.step || 1

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-xl font-bold">
            Ecoyaan Checkout
          </Link>
        </div>
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.href} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.step <= currentStep ? "bg-white text-green-600" : "bg-green-700 text-white"
                }`}
              >
                {step.step}
              </div>
              <Link
                href={step.href}
                className={`mt-2 text-sm hover:underline ${
                  pathname === step.href ? "font-bold underline" : ""
                }`}
              >
                {step.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}