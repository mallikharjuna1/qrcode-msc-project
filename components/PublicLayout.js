import Link from "next/link";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b bg-white shadow-sm">
        <Link href="/" className="text-xl font-bold text-primary">FeedbackQR</Link>
        <nav className="space-x-4">
          <Link href="/about" className="text-sm font-medium">About</Link>
          <Link href="/login" className="text-sm font-medium">Login</Link>
          <Link href="/register" className="text-sm font-medium">Register</Link>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t bg-white">
        © 2025 Feedback System
      </footer>
    </div>
  );
}
