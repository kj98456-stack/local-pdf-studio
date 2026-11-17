import Link from "next/link";
export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 max-w-3xl mx-auto space-y-4">
      <Link href="/" className="text-sm text-indigo-400">← Home</Link>
      <h1 className="text-3xl font-bold text-white">Privacy Policy & Advertising Disclosure</h1>
      <p>All PDF and image processing occurs locally inside your web browser. We never upload, store, or view your documents on any server.</p>
      <p>Third-party vendors, including Google, use cookies to serve ads based on prior visits to this or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
    </div>
  );
}
