
import { Loader2, Shield } from "lucide-react";

const LicenseValidation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <div className="relative backdrop-blur-xl bg-black/20 p-12 rounded-3xl shadow-[0_0_50px_-12px_rgba(155,135,245,0.5)] border border-white/10 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl" />
        <Shield className="w-16 h-16 text-primary mx-auto mb-6 opacity-50" />
        <Loader2 className="w-12 h-12 text-white mb-6 animate-loader-spin mx-auto" />
        <h2 className="text-3xl font-light text-white/90 text-center tracking-wider">
          VALIDANDO <span className="font-semibold text-primary">LICENCIA</span>
        </h2>
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LicenseValidation;
