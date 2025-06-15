
import { Brain, Coins, Target, Star } from "lucide-react";

interface UserProgress {
  coins: number;
  streak: number;
  achievements: string[];
}

interface DashboardHeaderProps {
  userProgress: UserProgress;
}

const DashboardHeader = ({ userProgress }: DashboardHeaderProps) => {
  return (
    <header className="p-6 border-b border-[#2A3441]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-grok-orange rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-grok-orange">ANIMIND</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
            <Coins className="w-5 h-5 text-grok-orange" />
            <span className="text-grok-orange font-bold">{userProgress.coins}</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
            <Target className="w-5 h-5 text-grok-blue" />
            <span className="text-grok-blue font-bold">{userProgress.streak} Day Streak</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold">{userProgress.achievements.length} Achievements</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
