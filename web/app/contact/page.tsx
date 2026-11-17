import Link from "next/link";
export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 max-w-3xl mx-auto space-y-4">
      <Link href="/" className="text-sm text-indigo-400">← Home</Link>
      <h1 className="text-3xl font-bold text-white">Contact Us</h1>
      <p>For feedback, bug reports, or partnership inquiries, reach our team at: <strong>myglobalhub.tools@gmail.com</strong></p>
    </div>
  );
}
