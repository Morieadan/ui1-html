
import { CheckCircle, Database, DollarSign, CheckSquare } from "lucide-react";

interface ResultsModalProps {
  total: number;
  withCost: number;
  accepted: number;
  onClose: () => void;
}

const ResultsModal = ({ total, withCost, accepted, onClose }: ResultsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="relative backdrop-blur-xl bg-black/20 p-8 rounded-3xl max-w-md w-full mx-4 border border-white/10 animate-scale-up">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
        <div className="relative text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-light text-white/90">
            Proceso <span className="font-medium text-primary">Completado</span>
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="backdrop-blur-xl bg-white/5 p-4 rounded-2xl border border-white/10">
              <Database className="w-6 h-6 text-primary/70 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-white">{total}</div>
              <div className="text-xs text-white/50">Expedientes</div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-4 rounded-2xl border border-white/10">
              <DollarSign className="w-6 h-6 text-accent/70 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-white">{withCost}</div>
              <div className="text-xs text-white/50">Con Costo</div>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-4 rounded-2xl border border-white/10">
              <CheckSquare className="w-6 h-6 text-green-400/70 mx-auto mb-2" />
              <div className="text-2xl font-semibold text-white">{accepted}</div>
              <div className="text-xs text-white/50">Aceptados</div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-accent text-white transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(155,135,245,0.5)] hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
