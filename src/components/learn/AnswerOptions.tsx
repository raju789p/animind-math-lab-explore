
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  question: string;
  animation: string;
  animationType: 'emoji' | 'visual' | 'interactive';
  options: string[];
  correctAnswer: number;
  explanation: string;
  coins: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface AnswerOptionsProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onSubmitAnswer: () => void;
}

const AnswerOptions = ({ 
  question, 
  selectedAnswer, 
  showResult, 
  onAnswerSelect, 
  onSubmitAnswer 
}: AnswerOptionsProps) => {
  return (
    <div className="space-y-8">
      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              selectedAnswer === index
                ? 'border-grok-orange bg-grok-orange/20 shadow-lg'
                : 'border-[#2A3441] hover:border-grok-orange/50 hover:bg-[#2A3441]/50'
            } ${showResult && index === question.correctAnswer ? 'border-green-500 bg-green-500/20' : ''}
            ${showResult && selectedAnswer === index && index !== question.correctAnswer ? 'border-red-500 bg-red-500/20' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={showResult}
          >
            <div className="text-white text-xl font-semibold">{option}</div>
          </motion.button>
        ))}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div className="text-center">
          <Button
            onClick={onSubmitAnswer}
            disabled={selectedAnswer === null}
            className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-3 text-lg font-semibold"
          >
            Submit Answer
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnswerOptions;
