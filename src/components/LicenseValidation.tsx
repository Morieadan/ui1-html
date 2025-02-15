
import { Loader2 } from "lucide-react";

const LicenseValidation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-soft">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg animate-fade-in">
        <Loader2 className="w-12 h-12 text-primary mb-4 animate-loader-spin mx-auto" />
        <h2 className="text-2xl font-medium text-gray-800 text-center">
          Validando licencia...
        </h2>
      </div>
    </div>
  );
};

export default LicenseValidation;
