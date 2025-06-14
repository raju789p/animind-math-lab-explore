
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coins, Target, Trophy, Book, ArrowRight } from "lucide-react";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('animind_user');
    if (savedData) {
      setUserProgress(JSON.parse(savedData));
    } else {
      // Initialize new user
      const newUser: UserProgress = {
        name: "Student",
        currentGrade: 1,
        coins: 100,
        streak: 0,
        totalProblems: 0,
        accuracy: 0,
        achievements: [],
        gradeProgress: {}
      };
      localStorage.setItem('animind_user', JSON.stringify(newUser));
      setUserProgress(newUser);
    }
  }, []);

  const gradeTopics = {
    1: [
      { id: 'counting', title: 'Counting', description: 'Learn to count from 1 to 20', icon: '🔢' },
      { id: 'addition', title: 'Basic Addition', description: 'Add numbers up to 10', icon: '➕' },
      { id: 'shapes', title: 'Shapes', description: 'Identify basic shapes', icon: '🔺' },
      { id: 'patterns', title: 'Patterns', description: 'Complete simple patterns', icon: '🔄' }
    ],
    2: [
      { id: 'two-digit', title: 'Two-digit Math', description: 'Work with numbers up to 100', icon: '💯' },
      { id: 'time', title: 'Time', description: 'Read clocks and tell time', icon: '🕐' },
      { id: 'money', title: 'Money', description: 'Count coins and bills', icon: '💰' },
      { id: 'measurement', title: 'Measurement', description: 'Measure length and weight', icon: '📏' }
    ],
    3: [
      { id: 'multiplication', title: 'Multiplication', description: 'Learn times tables', icon: '✖️' },
      { id: 'division', title: 'Division', description: 'Share objects equally', icon: '➗' },
      { id: 'fractions', title: 'Fractions', description: 'Parts of a whole', icon: '🍕' },
      { id: 'geometry', title: 'Geometry', description: 'Angles and shapes', icon: '📐' }
    ],
    4: [
      { id: 'multi-digit', title: 'Multi-digit Operations', description: 'Complex calculations', icon: '🧮' },
      { id: 'advanced-geometry', title: 'Advanced Geometry', description: 'Perimeter and area', icon: '📊' },
      { id: 'data', title: 'Data', description: 'Charts and graphs', icon: '📈' },
      { id: 'basic-probability', title: 'Basic Probability', description: 'Chance and likelihood', icon: '🎲' }
    ],
    5: [
      { id: 'decimals', title: 'Decimals', description: 'Working with decimal numbers', icon: '🔢' },
      { id: 'advanced-fractions', title: 'Advanced Fractions', description: 'Mixed numbers and operations', icon: '🎯' },
      { id: 'volume-area', title: 'Volume/Area', description: '3D shapes and measurements', icon: '📦' },
      { id: 'advanced-probability', title: 'Advanced Probability', description: 'Multiple events', icon: '🃏' }
    ]
  };

  const handleTopicClick = (topicId: string, gradeId: number) => {
    navigate(`/learn/${gradeId}/${topicId}`);
  };

  const handleGradeChange = (grade: number) => {
    if (userProgress) {
      const updatedProgress = { ...userProgress, currentGrade: grade };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  if (!userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  const currentTopics = gradeTopics[userProgress.currentGrade as keyof typeof gradeTopics] || [];

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
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
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">Welcome back, {userProgress.name}! 🎉</h2>
          <p className="text-[#B0B6C3] text-lg">Ready to learn some amazing math today?</p>
        </motion.div>

        {/* Grade Selector */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Select Your Grade</h3>
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((grade) => (
              <Button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                variant={userProgress.currentGrade === grade ? "default" : "outline"}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  userProgress.currentGrade === grade 
                    ? 'bg-grok-orange hover:bg-grok-orange/90 text-white' 
                    : 'border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50'
                }`}
              >
                Grade {grade}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Book className="w-5 h-5 text-grok-orange mr-2" />
                Problems Solved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-grok-orange">{userProgress.totalProblems}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 text-grok-blue mr-2" />
                Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-grok-blue">{userProgress.accuracy}%</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{userProgress.achievements.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-6">Grade {userProgress.currentGrade} Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleTopicClick(topic.id, userProgress.currentGrade)}
                className="cursor-pointer"
              >
                <Card className="bg-[#1E2A3A] border-[#2A3441] hover:border-grok-orange/50 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2">{topic.icon}</div>
                    <CardTitle className="text-white text-lg">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-[#B0B6C3] mb-4">
                      {topic.description}
                    </CardDescription>
                    <Button className="bg-grok-orange hover:bg-grok-orange/90 text-white w-full">
                      Start Learning
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
