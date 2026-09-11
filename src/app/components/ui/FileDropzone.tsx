"use client";

import { useRef, useState } from "react";
import { ImagePlus, UploadCloud } from "lucide-react";

type FileDropzoneProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  label?: string;
  hint?: string;
};

export default function FileDropzone({
  value,
  onChange,
  accept = "image/*,video/*",
  label = "Imagen o video",
  hint = "Haz clic para elegir o arrastra un archivo aquí. Formatos de imagen y video.",
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function choose(file?: File) {
    if (file) onChange(file);
  }

  return (
    <div>
      <p className="font-semibold">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          choose(event.dataTransfer.files?.[0]);
        }}
        className={`mt-2 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${dragging ? "border-[#891C20] bg-[#f2dfe0]" : "border-[#d8b9bd] bg-[#faf0eb] hover:bg-[#f4e7d9]"}`}
      >
        {dragging ? <UploadCloud className="text-[#891C20]" size={30} /> : <ImagePlus className="text-[#891C20]" size={30} />}
        <span className="mt-2 text-sm font-bold text-[#891C20]">{value ? value.name : "Seleccionar archivo"}</span>
        <span className="mt-1 text-xs text-[#6d5960]">{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => choose(event.target.files?.[0])}
      />
    </div>
  );
}
