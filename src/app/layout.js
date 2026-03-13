import {cartprovider} from "@/context/CartContext";
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <cartprovider>
          {children}
        </cartprovider>
      </body>
    </html>
  );
}
