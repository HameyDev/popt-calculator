import "./globals.css";

export const metadata = {
  title: "IWI POPT Calculator | QuantumTech",
  description:
    "An interactive calculator for Insulated Wall (IWI) POPT analysis built with Next.js and Tailwind CSS.",
  openGraph: {
    title: "IWI POPT Calculator | QuantumTech",
    description:
      "An interactive tool to calculate wall insulation performance with real-time updates and report generation.",
    url: "https://quantumtech.pk",
    siteName: "QuantumTech",
    images: [
      {
        url: "/preview.jpg", // optional preview image
        width: 1200,
        height: 630,
        alt: "IWI POPT Calculator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
