import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "POPT Calculator | QuantumTech",
  description:
    "An interactive calculator for Insulated Wall (IWI) POPT analysis built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
