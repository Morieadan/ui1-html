
import { Loader2, Database } from "lucide-react";

interface ProcessingViewProps {
  currentFile: number;
  totalFiles: number;
  progress: number;
}

const ProcessingView = ({ currentFile, totalFiles, progress }: ProcessingViewProps) => {
  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto animate-fade-in">
      <div className="backdrop-blur-xl bg-black/20 rounded-2xl border border-white/10 p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Database className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-light text-white/90">
              Procesando expediente <span className="font-medium text-primary">{currentFile}</span>
            </h3>
            <p className="text-white/50 text-sm">
              Total de expedientes: {totalFiles}
            </p>
          </div>
        </div>
      </div>
      
      <div className="backdrop-blur-xl bg-black/20 rounded-2xl border border-white/10 p-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Progreso</span>
            <span className="text-primary font-medium">{progress}%</span>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;
