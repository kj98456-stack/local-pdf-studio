import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const tools = [
    {
      href: "/tools/merge-pdf",
      tag: "PDF UTILITY",
      color: "text-indigo-400",
      title: "Merge Multiple PDFs Locally",
      desc: "Combine 2 or more PDF files into one document instantly inside your browser without uploading.",
    },
    {
      href: "/tools/images-to-pdf",
      tag: "CONVERTER",
      color: "text-emerald-400",
      title: "JPG & PNG Images to PDF",
      desc: "Turn scanned notes, receipts, or photos into a clean single PDF file in seconds.",
    },
    {
      href: "/tools/split-pdf",
      tag: "PAGE EXTRACTOR",
      color: "text-amber-400",
      title: "Split & Extract PDF Pages",
      desc: "Extract specific page numbers (e.g., 1, 3, 5) into a brand-new standalone PDF.",
    },
    {
      href: "/tools/rotate-pdf",
      tag: "FIX ORIENTATION",
      color: "text-purple-400",
      title: "Rotate & Fix Upside-Down PDFs",
      desc: "Rotate all pages 90° or 180° permanently and download your fixed document locally.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <main className="max-w-5xl mx-auto px-6 py-14 space-y-12 w-full">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" /> 100% Client-Side Privacy — Files Never Leave Your Device
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Private Local PDF & Document Studio
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Merge, split, rotate, and convert PDFs directly in your browser using zero-upload JavaScript technology. Free forever, zero sign-up.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-200">Free Browser PDF Utilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition space-y-2"
              >
                <span className={`text-xs font-semibold uppercase ${t.color}`}>{t.tag}</span>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-sm text-slate-400">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-900 py-8 px-6 text-sm text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Local PDF Studio. All processing happens locally in your browser.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-slate-300">About Us</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
