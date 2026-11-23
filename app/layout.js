
import "./globals.css";

export const metadata = {
  title: "Quiz Creator",
  description: "Quiz Creator using Next.js and Firebase"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
