
import { Button } from "@/components/ui/button";
import { Brain, Coins, Trophy, ArrowLeft } from "lucide-react";

interface UserProgress {
  name: string;
  currentGrade: number;
  coins: number;
  streak: number;
  totalProblems: number;
  accuracy: number;
  achievements: string[];
  gradeProgress: Record<string, { completion: number; accuracy: number }>;
}

interface LearnHeaderProps {
  userProgress: UserProgress;
  currentQuestion: number;
  totalQuestions: number;
  onBackToDashboard: () => void;
}

const LearnHeader = ({ userProgress, currentQuestion, totalQuestions, onBackToDashboard }: LearnHeaderProps) => {
  return (
    <header className="p-6 border-b border-[#2A3441]">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBackToDashboard}
            variant="outline"
            className="border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-grok-orange rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-grok-orange">ANIMIND</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
            <Coins className="w-5 h-5 text-grok-orange" />
            <span className="text-grok-orange font-bold">{userProgress.coins}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold">{userProgress.streak} streak</span>
          </div>
          <div className="text-[#B0B6C3] text-sm">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LearnHeader;
