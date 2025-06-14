
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-grok-orange/10 to-grok-blue/10 rounded-3xl p-12 border border-grok-orange/20"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Math Learning?
          </h3>
          <p className="text-xl text-[#B0B6C3] mb-8">
            Join thousands of students already mastering math through interactive animations
          </p>
          <Button 
            onClick={handleStartLearning}
            size="lg"
            className="bg-grok-orange hover:bg-grok-orange/90 text-white text-lg px-12 py-6 rounded-full"
          >
            Start Your Math Journey
            <Zap className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
