
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Target, Coins, Trophy } from "lucide-react";

interface UserProgress {
  totalProblems: number;
  accuracy: number;
  coins: number;
  achievements: string[];
}

interface ProgressStatsProps {
  userProgress: UserProgress;
}

const ProgressStats = ({ userProgress }: ProgressStatsProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
    >
      <Card className="bg-[#1E2A3A] border-[#2A3441]">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center text-lg">
            <Book className="w-5 h-5 text-grok-orange mr-2" />
            Problems Solved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-grok-orange">{userProgress.totalProblems}</div>
          <div className="text-sm text-[#B0B6C3]">Keep solving!</div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E2A3A] border-[#2A3441]">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center text-lg">
            <Target className="w-5 h-5 text-grok-blue mr-2" />
            Accuracy Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-grok-blue">{userProgress.accuracy}%</div>
          <div className="text-sm text-[#B0B6C3]">Excellent precision!</div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E2A3A] border-[#2A3441]">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center text-lg">
            <Coins className="w-5 h-5 text-yellow-500 mr-2" />
            Total Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-500">{userProgress.coins}</div>
          <div className="text-sm text-[#B0B6C3]">Mathematical wealth!</div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E2A3A] border-[#2A3441]">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center text-lg">
            <Trophy className="w-5 h-5 text-purple-500 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-500">{userProgress.achievements.length}</div>
          <div className="text-sm text-[#B0B6C3]">Unlock more!</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProgressStats;
