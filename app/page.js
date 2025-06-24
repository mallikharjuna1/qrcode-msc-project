import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-primary">FeedbackQR</h1>
        <nav className="space-x-4">
          <Link href="/about" className="text-sm font-medium">About</Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-4">Instant Feedback for Local Businesses</h2>
          <p className="mb-6 text-lg text-gray-600">
            Collect private, structured customer feedback using simple QR code access.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <Button>Login as Business</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Register Your Business</Button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/qr-mockup.avif"
            width={450}
            height={450}
            alt="QR Scanning Demo"
            className="rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="bg-white px-6 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">3 Steps to Get Started</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Register Your Business", "Create a free account and set up your profile."],
            ["Generate Your QR Code", "Display it in-store or on printed materials."],
            ["Collect Feedback Instantly", "Customers scan, submit feedback, and you track results."]
          ].map(([title, desc], idx) => (
            <div key={idx} className="p-6 border rounded-xl shadow-sm text-center">
              <div className="text-4xl font-bold text-primary mb-4">{idx + 1}</div>
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-6 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Mobile-Optimised Feedback Form",
            "Anonymous Feedback Collection",
            "Dashboard with Real-Time Charts",
            "PDF Export for Reports",
            "Filter by Rating, Date, or Category",
            "Automatic Flagging of Negative Responses"
          ].map((feature, idx) => (
            <div key={idx} className="p-5 border rounded-lg shadow-sm bg-white text-center">
              <p className="font-medium text-sm">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t bg-white">
        © 2025 Feedback System
      </footer>
    </main>
  );
}
