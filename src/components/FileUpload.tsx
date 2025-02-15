
import { FileText, Upload, Database } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.includes("excel") || file.type.includes("spreadsheet") || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative overflow-hidden backdrop-blur-xl bg-black/20 rounded-2xl border transition-all duration-300 ${
          dragActive
            ? "border-primary/50 shadow-[0_0_30px_-12px_rgba(155,135,245,0.5)]"
            : "border-white/10 hover:border-primary/30"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="relative p-8">
          <div className="text-center">
            {selectedFile ? (
              <div className="space-y-4 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-white/90 font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-white/50">Archivo seleccionado</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Upload className="w-8 h-8 text-white/50" />
                </div>
                <p className="text-white/70">
                  Arrastra un archivo Excel o haz clic para seleccionar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
