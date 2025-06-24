import PublicLayout from "@/components/PublicLayout";

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">About FeedbackQR</h1>
        <p className="text-gray-700 mb-4">
          FeedbackQR is a simple yet powerful platform designed to help small and local businesses collect
          structured, private feedback from customers using QR codes.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you are running a café, gym, clinic, or retail shop, FeedbackQR enables your customers to
          share experiences anonymously and helps you make better business decisions.
        </p>
        <p className="text-gray-700">
          This project is built as part of an academic MSc project using Next.js, Tailwind CSS, and modern UI
          libraries to showcase frontend best practices.
        </p>
      </div>
    </PublicLayout>
  );
}
