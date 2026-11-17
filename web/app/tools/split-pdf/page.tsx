"use client";
import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { Download } from "lucide-react";

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("1");

  const extract = async () => {
    if (!file) return;
    const srcPdf = await PDFDocument.load(await file.arrayBuffer());
    const total = srcPdf.getPageCount();
    const outPdf = await PDFDocument.create();
    const indices = pageRange
      .split(",")
      .map((s) => parseInt(s.trim(), 10) - 1)
      .filter((n) => !isNaN(n) && n >= 0 && n < total);
    if (!indices.length) return;
    const copied = await outPdf.copyPages(srcPdf, indices);
    copied.forEach((p) => outPdf.addPage(p));
    const url = URL.createObjectURL(new Blob([new Uint8Array(await outPdf.save())], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-pages.pdf";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-sm text-indigo-400 hover:underline">← Back to All PDF Tools</Link>
        <h1 className="text-3xl font-bold">Split & Extract PDF Pages</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
          <div>
            <label className="block text-xs text-slate-400 mb-1">Page numbers to extract (comma-separated, e.g. 1, 2, 5)</label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm"
            />
          </div>
          <button
            onClick={extract}
            disabled={!file}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Extract Pages & Download
          </button>
        </div>
      </div>
    </div>
  );
}
