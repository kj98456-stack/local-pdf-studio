import Link from "next/link";
export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 max-w-3xl mx-auto space-y-4">
      <Link href="/" className="text-sm text-indigo-400">← Home</Link>
      <h1 className="text-3xl font-bold text-white">About Local PDF Studio</h1>
      <p>Local PDF Studio provides fast, privacy-first browser utilities that merge, split, rotate, and convert documents directly on your device without uploading sensitive files to external servers.</p>
    </div>
  );
}
