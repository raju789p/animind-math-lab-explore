
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface QuestionDisplayProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  grade: string;
  topic: string;
}

const QuestionDisplay = ({ question, currentQuestion, totalQuestions, grade, topic }: QuestionDisplayProps) => {
  const getAnimationDisplay = () => {
    switch (question.animationType) {
      case 'emoji':
        return (
          <motion.div
            className="text-center py-8 text-5xl leading-relaxed"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {question.animation}
          </motion.div>
        );
      case 'visual':
        return (
          <motion.div
            className="text-center py-8 text-3xl leading-relaxed bg-[#1A1F2E] rounded-lg p-6 border border-[#2A3441]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {question.animation}
          </motion.div>
        );
      case 'interactive':
        return (
          <motion.div
            className="text-center py-8 text-4xl bg-gradient-to-r from-grok-orange/20 to-grok-blue/20 rounded-lg p-6"
            animate={{ 
              background: ["linear-gradient(45deg, rgba(255,107,53,0.2), rgba(0,212,255,0.2))",
                         "linear-gradient(45deg, rgba(0,212,255,0.2), rgba(255,107,53,0.2))"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {question.animation}
          </motion.div>
        );
      default:
        return (
          <div className="text-center py-8 text-4xl">
            {question.animation}
          </div>
        );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-grok-blue';
    }
  };

  return (
    <>
      {/* Topic Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-grok-orange mb-2">
          Grade {grade} - {topic?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h1>
        <div className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
          Difficulty: {question.difficulty.toUpperCase()}
        </div>
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#1E2A3A] border-[#2A3441] mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl text-center leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getAnimationDisplay()}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default QuestionDisplay;
