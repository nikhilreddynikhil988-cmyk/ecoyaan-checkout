"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CheckIcon } from "@heroicons/react/24/solid"

export default function NavBar() {
  const pathname = usePathname()

  const steps = [
    { href: "/", label: "Cart", step: 1 },
    { href: "/checkout", label: "Address", step: 2 },
    { href: "/payment", label: "Payment", step: 3 },
    { href: "/success", label: "Success", step: 4 },
  ]

  const currentStep =
    steps.find((step) => step.href === pathname)?.step || 1

  return (
    <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">

        {/* Logo + Subtitle */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <Link
            href="/"
            className="block text-2xl font-bold tracking-tight text-green-700 hover:text-green-800 transition-colors"
          >
            Ecoyaan
          </Link>

          <p className="text-sm text-gray-500 mt-1 tracking-wide">
            Sustainability made easy
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative flex justify-between items-start max-w-3xl mx-auto">

          {/* Background Line */}
          <div className="absolute top-4 sm:top-5 left-0 w-full h-0.5 bg-gray-200 -z-10 rounded-full" />

          {/* Active Line */}
          <div
            className="absolute top-4 sm:top-5 left-0 h-0.5 bg-green-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100
                }%`,
            }}
          />

          {steps.map((step) => {
            const isCompleted = step.step < currentStep
            const isActive = step.step === currentStep
            const isNavigable = step.step <= currentStep

            return (
              <div key={step.step} className="flex flex-col items-center">
                <Link
                  href={isNavigable ? step.href : "#"}
                  className={`group flex flex-col items-center focus:outline-none ${!isNavigable && "cursor-default"
                    }`}
                  onClick={(e) => !isNavigable && e.preventDefault()}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 z-10 ${isCompleted
                        ? "bg-green-600 border-green-600 text-white"
                        : isActive
                          ? "bg-white border-green-600 text-green-600 scale-110 shadow-md ring-4 ring-green-50"
                          : "bg-white border-gray-200 text-gray-400"
                      }`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      step.step
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${isActive
                        ? "text-green-700"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                  >
                    {step.label}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}