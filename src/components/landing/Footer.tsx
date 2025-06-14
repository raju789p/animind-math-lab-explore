
import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-[#2A3441]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-grok-orange rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-grok-orange">ANIMIND</span>
        </div>
        <p className="text-[#B0B6C3]">
          Advanced Interactive Math Learning Platform • Grades 1-5 • Powered by AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
