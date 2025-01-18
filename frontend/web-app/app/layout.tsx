import "./globals.css";
import Navbar from "./nav/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider></ToasterProvider>
        <Navbar></Navbar>
        <main className="container mx-auto px-5 pt-10">{children}</main>
      </body>
    </html>
  );
}
