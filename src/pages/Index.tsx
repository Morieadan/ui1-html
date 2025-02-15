
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

  return <div className="min-h-screen bg-gradient-soft bg-sky-400 hover:bg-sky-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md p-8 shadow-lg animate-fade-in bg-black rounded-full">
            <h1 className="text-center mb-8 text-purple-600 text-4xl font-bold">Bienvenido, Soy AUTOmike</h1>

            {isProcessing ? <ProcessingView currentFile={Math.floor(processingProgress / 100 * 98)} totalFiles={98} progress={processingProgress} /> : <div className="space-y-6">
                <FileUpload onFileSelect={handleFileSelect} />
                
                <div className="text-center">
                  <button onClick={handleStartProcess} disabled={!selectedFile} className={`px-8 py-3 rounded-lg font-medium transition-all ${selectedFile ? "bg-gradient-accent text-white hover:scale-105" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    Iniciar Proceso
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>

      {showResults && <ResultsModal total={98} withCost={15} accepted={11} onClose={() => {
      setShowResults(false);
      setSelectedFile(null);
    }} />}
    </div>;
};

export default Index;
