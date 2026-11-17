"use client";
import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const outBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      a.click();
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-sm text-indigo-400 hover:underline">← Back to All PDF Tools</Link>
        <h1 className="text-3xl font-bold">Merge Multiple PDFs Locally</h1>
        <p className="text-slate-400 text-sm">Select 2 or more PDF files. They are combined directly inside your browser—zero server uploads.</p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 cursor-pointer">
            <Upload className="w-8 h-8 text-indigo-400 mb-2" />
            <span className="text-sm font-medium">Tap to select PDF files (multiple allowed)</span>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <ul className="text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-lg">
              {files.map((f, i) => (
                <li key={i}>{i + 1}. {f.name} ({(f.size / 1024).toFixed(0)} KB)</li>
              ))}
            </ul>
          )}

          <button
            onClick={handleMerge}
            disabled={files.length < 2 || merging}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {merging ? "Merging Locally..." : `Merge ${files.length} PDFs & Download`}
          </button>
        </div>
      </div>
    </div>
  );
}
