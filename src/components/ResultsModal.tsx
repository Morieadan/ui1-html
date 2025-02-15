
import { CheckCircle } from "lucide-react";

interface ResultsModalProps {
  total: number;
  withCost: number;
  accepted: number;
  onClose: () => void;
}

const ResultsModal = ({ total, withCost, accepted, onClose }: ResultsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl animate-scale-up">
        <div className="text-center space-y-4">
          <CheckCircle className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-medium">Resumen del Proceso</h2>
          
          <div className="space-y-4 mt-6">
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-2xl font-semibold text-primary">{total}</div>
              <div className="text-sm text-gray-600">Expedientes Revisados</div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 bg-secondary/5 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-secondary">{withCost}</div>
                <div className="text-sm text-gray-600">Con Costo</div>
              </div>
              
              <div className="flex-1 bg-accent/5 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-accent">{accepted}</div>
                <div className="text-sm text-gray-600">Aceptados</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="mt-6 px-8 py-2 bg-gradient-accent text-white rounded-lg font-medium transition-transform hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
