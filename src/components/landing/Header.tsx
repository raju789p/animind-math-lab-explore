
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      className="relative z-10 p-6 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3">
        <motion.div 
          className="w-10 h-10 bg-grok-orange rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <Brain className="w-6 h-6 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-grok-orange">ANIMIND</h1>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#features" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Features</a>
        <a href="#grades" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Grades</a>
        <a href="/probability-lab" className="text-[#B0B6C3] hover:text-grok-orange transition-colors font-semibold">🧪 Probability Lab</a>
        <a href="/dashboard" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Dashboard</a>
      </nav>
    </motion.header>
  );
};

export default Header;
