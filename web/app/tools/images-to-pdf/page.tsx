"use client";
import { useState } from "react";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import { Upload, Download } from "lucide-react";

export default function ImagesToPdfPage() {
  const [images, setImages] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const convert = async () => {
    if (!images.length) return;
    setBusy(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const imgFile of images) {
        const bytes = await imgFile.arrayBuffer();
        const embedded = imgFile.type === "image/png"
          ? await pdfDoc.embedPng(bytes)
          : await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
      }
      const out = await pdfDoc.save();
      const url = URL.createObjectURL(new Blob([new Uint8Array(out)], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "images-converted.pdf";
      a.click();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-sm text-indigo-400 hover:underline">← Back to All PDF Tools</Link>
        <h1 className="text-3xl font-bold">JPG & PNG Images to PDF Converter</h1>
        <p className="text-slate-400 text-sm">Convert photos, notes, or ID scans into a single PDF locally on your device.</p>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-8 cursor-pointer">
            <Upload className="w-8 h-8 text-emerald-400 mb-2" />
            <span className="text-sm font-medium">Select JPG or PNG images</span>
            <input
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="hidden"
            />
          </label>
          <button
            onClick={convert}
            disabled={!images.length || busy}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {busy ? "Converting..." : `Create PDF from ${images.length} Image(s)`}
          </button>
        </div>
      </div>
    </div>
  );
}
