"use client";
import { useState } from "react";
import Link from "next/link";
import { PDFDocument, degrees } from "pdf-lib";
import { RotateCw } from "lucide-react";

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);

  const rotate = async () => {
    if (!file) return;
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    pdfDoc.getPages().forEach((page) => {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    });
    const url = URL.createObjectURL(new Blob([new Uint8Array(await pdfDoc.save())], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "rotated-document.pdf";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/" className="text-sm text-indigo-400 hover:underline">← Back to All PDF Tools</Link>
        <h1 className="text-3xl font-bold">Rotate PDF Pages Locally</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
          <select
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm"
          >
            <option value={90}>Rotate 90° Clockwise</option>
            <option value={180}>Rotate 180° (Upside Down)</option>
            <option value={270}>Rotate 270° (90° Counter-Clockwise)</option>
          </select>
          <button
            onClick={rotate}
            disabled={!file}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <RotateCw className="w-4 h-4" /> Rotate & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
