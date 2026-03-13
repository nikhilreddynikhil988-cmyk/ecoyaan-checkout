# Ecoyaan Checkout Flow

A simplified checkout flow for Ecoyaan, built with Next.js, React, and Tailwind CSS.

## Features

- **Cart Page**: Displays products with SSR data fetching from a mock API.
- **Shipping Address Form**: Collects user address with validation.
- **Payment Confirmation**: Shows order summary and address before payment.
- **Success Page**: Confirms the order placement.
- **Navigation Bar**: Step-by-step progress indicator with clickable navigation.
- **URL Redirects**: Handles common typos (e.g., /pament → /payment).
- **State Management**: Uses React Context API to manage cart and address state.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS.

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS** for styling
- **Context API** for state management
- **Server-Side Rendering** for cart data fetching

## Architecture

- **SSR**: Cart data is fetched server-side using Next.js API routes.
- **Client Components**: Forms and interactive elements use client-side rendering.
- **Modular Components**: Reusable components for cart items, order summary, and address form.
- **Validation**: Basic form validation for email, phone, and PIN code.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/`: Next.js app router pages
  - `page.js`: Cart page with SSR
  - `checkout/page.js`: Address form
  - `payment/page.js`: Order confirmation
  - `success/page.js`: Success page
  - `api/cart/route.js`: Mock API for cart data
- `src/components/`: Reusable components
  - `CartItemsPage.js`: Cart items display
  - `OdderSummery.js`: Order summary
  - `AddressProfe.js`: Address form
- `src/context/CartContext.js`: Context for state management
- `src/data/cartData.js`: Mock cart data

## Deployment

## Deployment

Deploy to Vercel or Netlify for easy hosting.

## Notes

- Mock data is used for demonstration.
- Payment is simulated.
- Form validation includes required fields, email format, 10-digit phone, and 6-digit PIN.
"# ecoyaan-checkout" 
