
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, Trophy, Star, Target, Zap, Crown, Medal, Award, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const AchievementGallery = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('animind_user');
    if (savedData) {
      const progress = JSON.parse(savedData);
      setUserProgress(progress);
      generateAchievements(progress);
    }
  }, []);

  const generateAchievements = (progress: UserProgress) => {
    const achievementList: Achievement[] = [
      {
        id: 'first_steps',
        title: 'First Steps',
        description: 'Solve your first math problem',
        icon: <Trophy className="w-8 h-8" />,
        requirement: 'Solve 1 problem',
        unlocked: progress.totalProblems >= 1,
        tier: 'bronze'
      },
      {
        id: 'problem_solver',
        title: 'Problem Solver',
        description: 'Solve 10 math problems',
        icon: <Target className="w-8 h-8" />,
        requirement: 'Solve 10 problems',
        unlocked: progress.totalProblems >= 10,
        progress: Math.min(progress.totalProblems, 10),
        maxProgress: 10,
        tier: 'bronze'
      },
      {
        id: 'math_warrior',
        title: 'Math Warrior',
        description: 'Solve 50 math problems',
        icon: <Zap className="w-8 h-8" />,
        requirement: 'Solve 50 problems',
        unlocked: progress.totalProblems >= 50,
        progress: Math.min(progress.totalProblems, 50),
        maxProgress: 50,
        tier: 'silver'
      },
      {
        id: 'math_master',
        title: 'Math Master',
        description: 'Solve 100 math problems',
        icon: <Crown className="w-8 h-8" />,
        requirement: 'Solve 100 problems',
        unlocked: progress.totalProblems >= 100,
        progress: Math.min(progress.totalProblems, 100),
        maxProgress: 100,
        tier: 'gold'
      },
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Achieve 90% accuracy',
        icon: <Star className="w-8 h-8" />,
        requirement: '90% accuracy rate',
        unlocked: progress.accuracy >= 90,
        progress: progress.accuracy,
        maxProgress: 90,
        tier: 'silver'
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 7-day learning streak',
        icon: <Medal className="w-8 h-8" />,
        requirement: '7-day streak',
        unlocked: progress.streak >= 7,
        progress: Math.min(progress.streak, 7),
        maxProgress: 7,
        tier: 'gold'
      },
      {
        id: 'coin_collector',
        title: 'Coin Collector',
        description: 'Collect 1000 coins',
        icon: <Gem className="w-8 h-8" />,
        requirement: 'Collect 1000 coins',
        unlocked: progress.coins >= 1000,
        progress: Math.min(progress.coins, 1000),
        maxProgress: 1000,
        tier: 'gold'
      },
      {
        id: 'grade_explorer',
        title: 'Grade Explorer',
        description: 'Complete topics in 3 different grades',
        icon: <Award className="w-8 h-8" />,
        requirement: 'Explore 3 grades',
        unlocked: Object.keys(progress.gradeProgress || {}).length >= 3,
        progress: Object.keys(progress.gradeProgress || {}).length,
        maxProgress: 3,
        tier: 'silver'
      }
    ];

    setAchievements(achievementList);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'from-amber-600 to-yellow-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-orange-500';
      case 'platinum': return 'from-blue-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierTextColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-yellow-600';
      case 'silver': return 'text-gray-500';
      case 'gold': return 'text-yellow-500';
      case 'platinum': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  if (!userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading achievements...</div>
    </div>;
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[#2A3441]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
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
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Title Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-grok-orange mb-4">🏆 Achievement Gallery</h1>
          <p className="text-[#B0B6C3] text-lg">
            You've unlocked {unlockedCount} out of {achievements.length} achievements!
          </p>
          <div className="w-full bg-[#2A3441] rounded-full h-3 mt-4">
            <motion.div
              className="bg-gradient-to-r from-grok-orange to-grok-blue h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className={`h-full border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br ' + getTierColor(achievement.tier) + ' border-yellow-400 shadow-lg shadow-yellow-400/20' 
                  : 'bg-[#1E2A3A] border-[#2A3441] opacity-60'
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-3 p-4 rounded-full ${
                    achievement.unlocked 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#2A3441] text-[#B0B6C3]'
                  }`}>
                    {achievement.icon}
                  </div>
                  <CardTitle className={`text-xl ${
                    achievement.unlocked ? 'text-white' : 'text-[#B0B6C3]'
                  }`}>
                    {achievement.title}
                  </CardTitle>
                  <div className={`text-sm font-medium uppercase ${getTierTextColor(achievement.tier)}`}>
                    {achievement.tier}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className={`mb-4 text-sm ${
                    achievement.unlocked ? 'text-white/90' : 'text-[#B0B6C3]'
                  }`}>
                    {achievement.description}
                  </p>
                  <p className={`text-xs mb-4 ${
                    achievement.unlocked ? 'text-white/70' : 'text-[#B0B6C3]/70'
                  }`}>
                    {achievement.requirement}
                  </p>
                  
                  {achievement.maxProgress && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{achievement.progress || 0}</span>
                        <span>{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-black/20 rounded-full h-2">
                        <div 
                          className="bg-white/60 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="mt-4 text-white font-bold text-lg"
                    >
                      ✨ UNLOCKED! ✨
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;
