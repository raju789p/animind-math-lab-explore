
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Lightbulb, Star, Coins, ArrowLeft } from "lucide-react";

interface ResultFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  earnedCoins: number;
  currentQuestion: number;
  totalQuestions: number;
  onNextQuestion: () => void;
}

const ResultFeedback = ({ 
  isCorrect, 
  explanation, 
  earnedCoins, 
  currentQuestion, 
  totalQuestions, 
  onNextQuestion 
}: ResultFeedbackProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`border-2 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
        <CardContent className="p-8 text-center">
          {isCorrect ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="text-green-500 mb-4">
                <Check className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-4">Outstanding! 🎉</h3>
              <motion.div
                className="flex items-center justify-center space-x-3 mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                <Coins className="w-8 h-8 text-grok-orange" />
                <span className="text-3xl font-bold text-grok-orange">+{earnedCoins} coins!</span>
                <Star className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <div className="text-red-500 mb-4">
                <X className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-4xl font-bold text-red-500 mb-4">Keep Learning! 💪</h3>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <span className="text-2xl text-yellow-500">Every mistake is a step forward!</span>
              </div>
            </motion.div>
          )}
          
          <div className="bg-[#1E2A3A] p-6 rounded-lg mb-6">
            <h4 className="text-2xl font-bold text-grok-blue mb-3">💡 Explanation:</h4>
            <p className="text-[#B0B6C3] text-lg leading-relaxed">{explanation}</p>
          </div>

          <Button
            onClick={onNextQuestion}
            className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-4 text-lg font-semibold"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Challenge' : 'Complete Topic'} 
            <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultFeedback;
