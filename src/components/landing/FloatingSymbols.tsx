
import { motion } from "framer-motion";

const FloatingSymbols = () => {
  const mathSymbols = ["+", "×", "÷", "=", "π", "∑", "%", "√"];

  return (
    <div className="fixed inset-0 pointer-events-none">
      {mathSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-grok-orange/20 text-6xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSymbols;
