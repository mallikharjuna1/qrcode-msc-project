// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'QR Feedback App',
  description: 'Collect feedback via QR codes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
