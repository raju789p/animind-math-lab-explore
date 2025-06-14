
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calculator, Target, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative z-10 pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Master Math Through
            <span className="block text-grok-orange">Interactive Animation</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#B0B6C3] mb-12 max-w-3xl mx-auto">
            AI-powered learning platform for Grades 1-5 with advanced probability experiments and engaging visual math concepts
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            onClick={handleStartLearning}
            size="lg" 
            className="bg-grok-orange hover:bg-grok-orange/90 text-white text-lg px-12 py-6 rounded-full pulse-glow"
          >
            Start Learning
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Animated Icons */}
        <div className="mt-20 flex justify-center space-x-8">
          {[Calculator, Target, Sparkles].map((Icon, index) => (
            <motion.div
              key={index}
              className="w-16 h-16 bg-gradient-to-br from-grok-blue/20 to-grok-orange/20 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <Icon className="w-8 h-8 text-grok-blue" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
