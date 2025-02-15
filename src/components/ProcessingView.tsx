
import { Loader2 } from "lucide-react";

interface ProcessingViewProps {
  currentFile: number;
  totalFiles: number;
  progress: number;
}

const ProcessingView = ({ currentFile, totalFiles, progress }: ProcessingViewProps) => {
  return (
    <div className="space-y-6 w-full max-w-xl mx-auto animate-fade-in">
      <div className="text-center space-y-2">
        <Loader2 className="w-8 h-8 mx-auto text-primary animate-loader-spin" />
        <h3 className="text-xl font-medium">
          Revisando expediente {currentFile} de {totalFiles}
        </h3>
      </div>
      
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-accent transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-center text-gray-500">
        {progress}% completado
      </p>
    </div>
  );
};

export default ProcessingView;
