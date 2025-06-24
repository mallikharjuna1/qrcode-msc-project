import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-600">FeedbackQR</h2>
      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center px-8 py-12">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full mt-2">Login</Button>
          </form>

          <div className="text-sm text-center mt-4 space-y-1">
            <Link href="/register" className="text-blue-600 hover:underline">
              Don’t have an account? Register
            </Link>
            <br />
            <Link href="#" className="text-gray-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
