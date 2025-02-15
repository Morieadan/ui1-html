
import { useState } from "react";
import LicenseValidation from "@/components/LicenseValidation";
import FileUpload from "@/components/FileUpload";
import ProcessingView from "@/components/ProcessingView";
import ResultsModal from "@/components/ResultsModal";

const Index = () => {
  const [isValidatingLicense, setIsValidatingLicense] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Simulando validación de licencia
  setTimeout(() => {
    setIsValidatingLicense(false);
  }, 2000);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleStartProcess = () => {
    setIsProcessing(true);
    // Simulando proceso
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setProcessingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        setShowResults(true);
      }
    }, 50);
  };

  if (isValidatingLicense) {
    return <LicenseValidation />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-light text-white/90 tracking-wider">
              AUTO<span className="font-bold text-primary">MIKE</span>
            </h1>
            <p className="text-white/50 mt-2">Sistema de Validación Automatizada</p>
          </div>

          <div className="relative backdrop-blur-xl bg-black/20 rounded-3xl border border-white/10 p-8 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
            <div className="relative">
              {isProcessing ? (
                <ProcessingView
                  currentFile={Math.floor((processingProgress / 100) * 98)}
                  totalFiles={98}
                  progress={processingProgress}
                />
              ) : (
                <div className="space-y-8">
                  <FileUpload onFileSelect={handleFileSelect} />
                  
                  <div className="text-center">
                    <button
                      onClick={handleStartProcess}
                      disabled={!selectedFile}
                      className={`px-12 py-4 rounded-xl font-medium transition-all duration-300 ${
                        selectedFile
                          ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_30px_-12px_rgba(155,135,245,0.5)] hover:scale-105"
                          : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                      }`}
                    >
                      Iniciar Proceso
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <ResultsModal
          total={98}
          withCost={15}
          accepted={11}
          onClose={() => {
            setShowResults(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
