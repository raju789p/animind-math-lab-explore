
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coins, Target, Trophy, Book, ArrowRight, Zap, Star } from "lucide-react";
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
        name: "Math Explorer",
        currentGrade: 1,
        coins: 100,
        streak: 0,
        totalProblems: 0,
        accuracy: 0,
        achievements: ["Welcome to ANIMIND! 🎉"],
        gradeProgress: {}
      };
      localStorage.setItem('animind_user', JSON.stringify(newUser));
      setUserProgress(newUser);
    }
  }, []);

  // Expanded grade topics with 10 topics per grade
  const gradeTopics = {
    1: [
      { id: 'counting', title: 'Counting Adventures', description: 'Master numbers 1-20 with fun animations', icon: '🔢', difficulty: 'Beginner', coins: 10 },
      { id: 'addition', title: 'Addition Magic', description: 'Add numbers up to 10 with visual stories', icon: '➕', difficulty: 'Beginner', coins: 15 },
      { id: 'subtraction', title: 'Subtraction Heroes', description: 'Take away numbers with exciting adventures', icon: '➖', difficulty: 'Beginner', coins: 15 },
      { id: 'shapes', title: 'Shape Explorers', description: 'Discover circles, squares, and triangles', icon: '🔺', difficulty: 'Beginner', coins: 12 },
      { id: 'patterns', title: 'Pattern Detectives', description: 'Find and complete colorful patterns', icon: '🔄', difficulty: 'Easy', coins: 18 },
      { id: 'comparing', title: 'Number Comparisons', description: 'Learn bigger, smaller, and equal', icon: '⚖️', difficulty: 'Beginner', coins: 12 },
      { id: 'ordering', title: 'Number Ordering', description: 'Put numbers in the right sequence', icon: '📊', difficulty: 'Easy', coins: 14 },
      { id: 'length', title: 'Length Adventures', description: 'Compare long and short objects', icon: '📏', difficulty: 'Beginner', coins: 10 },
      { id: 'sorting', title: 'Sorting Champions', description: 'Group objects by size, color, shape', icon: '🗂️', difficulty: 'Easy', coins: 16 },
      { id: 'basic-time', title: 'Time Beginners', description: 'Learn morning, afternoon, night', icon: '🌅', difficulty: 'Easy', coins: 14 }
    ],
    2: [
      { id: 'two-digit', title: 'Two-Digit Masters', description: 'Conquer numbers up to 100', icon: '💯', difficulty: 'Easy', coins: 20 },
      { id: 'place-value', title: 'Place Value Heroes', description: 'Understand tens and ones', icon: '🔢', difficulty: 'Easy', coins: 18 },
      { id: 'time', title: 'Time Travelers', description: 'Learn to read clocks and tell time', icon: '🕐', difficulty: 'Easy', coins: 18 },
      { id: 'money', title: 'Coin Collectors', description: 'Count coins and make change', icon: '💰', difficulty: 'Easy', coins: 22 },
      { id: 'measurement', title: 'Measurement Scientists', description: 'Explore length, weight, and volume', icon: '📏', difficulty: 'Easy', coins: 16 },
      { id: 'word-problems', title: 'Story Problem Solvers', description: 'Solve real-world math stories', icon: '📖', difficulty: 'Medium', coins: 24 },
      { id: 'skip-counting', title: 'Skip Counting Stars', description: 'Count by 2s, 5s, and 10s', icon: '⭐', difficulty: 'Easy', coins: 20 },
      { id: 'data-graphs', title: 'Graph Explorers', description: 'Read and create simple graphs', icon: '📈', difficulty: 'Medium', coins: 22 },
      { id: 'even-odd', title: 'Even and Odd Detectives', description: 'Identify even and odd numbers', icon: '🔍', difficulty: 'Easy', coins: 16 },
      { id: 'estimation', title: 'Estimation Experts', description: 'Make smart number guesses', icon: '🤔', difficulty: 'Medium', coins: 18 }
    ],
    3: [
      { id: 'multiplication', title: 'Multiplication Warriors', description: 'Master times tables with animations', icon: '✖️', difficulty: 'Medium', coins: 25 },
      { id: 'division', title: 'Division Champions', description: 'Share objects equally with style', icon: '➗', difficulty: 'Medium', coins: 25 },
      { id: 'fractions', title: 'Fraction Builders', description: 'Understand parts of a whole', icon: '🍕', difficulty: 'Medium', coins: 28 },
      { id: 'geometry', title: 'Geometry Architects', description: 'Explore angles and advanced shapes', icon: '📐', difficulty: 'Medium', coins: 20 },
      { id: 'area-perimeter', title: 'Area and Perimeter Pros', description: 'Calculate space around and inside shapes', icon: '🔲', difficulty: 'Medium', coins: 26 },
      { id: 'mental-math', title: 'Mental Math Ninjas', description: 'Calculate quickly in your head', icon: '🥷', difficulty: 'Medium', coins: 24 },
      { id: 'multiplication-tables', title: 'Times Table Masters', description: 'Memorize multiplication facts', icon: '📋', difficulty: 'Medium', coins: 30 },
      { id: 'problem-solving', title: 'Problem Solving Wizards', description: 'Use multiple steps to solve problems', icon: '🧙‍♂️', difficulty: 'Hard', coins: 32 },
      { id: 'rounding', title: 'Rounding Rangers', description: 'Round numbers to nearest 10 and 100', icon: '🎯', difficulty: 'Medium', coins: 22 },
      { id: 'equivalent-fractions', title: 'Equivalent Fraction Experts', description: 'Find fractions that are equal', icon: '⚖️', difficulty: 'Hard', coins: 30 }
    ],
    4: [
      { id: 'multi-digit', title: 'Advanced Calculations', description: 'Complex multi-digit operations', icon: '🧮', difficulty: 'Hard', coins: 30 },
      { id: 'advanced-geometry', title: 'Geometry Masters', description: 'Calculate perimeter and area', icon: '📊', difficulty: 'Hard', coins: 28 },
      { id: 'data', title: 'Data Scientists', description: 'Analyze charts and graphs', icon: '📈', difficulty: 'Medium', coins: 22 },
      { id: 'basic-probability', title: 'Probability Explorers', description: 'Introduction to chance and likelihood', icon: '🎲', difficulty: 'Medium', coins: 25 },
      { id: 'long-division', title: 'Long Division Masters', description: 'Divide large numbers step by step', icon: '📝', difficulty: 'Hard', coins: 35 },
      { id: 'factor-multiples', title: 'Factor and Multiple Hunters', description: 'Find factors and multiples of numbers', icon: '🔍', difficulty: 'Hard', coins: 32 },
      { id: 'mixed-operations', title: 'Mixed Operations Champions', description: 'Combine all four operations', icon: '🎪', difficulty: 'Hard', coins: 34 },
      { id: 'angle-measurement', title: 'Angle Measurers', description: 'Use protractors to measure angles', icon: '📐', difficulty: 'Hard', coins: 30 },
      { id: 'coordinate-plane', title: 'Coordinate Explorers', description: 'Plot points on a grid', icon: '🗺️', difficulty: 'Hard', coins: 28 },
      { id: 'symmetry', title: 'Symmetry Specialists', description: 'Find lines of symmetry', icon: '🦋', difficulty: 'Medium', coins: 24 }
    ],
    5: [
      { id: 'decimals', title: 'Decimal Masters', description: 'Work with decimal numbers expertly', icon: '🔢', difficulty: 'Hard', coins: 30 },
      { id: 'advanced-fractions', title: 'Fraction Experts', description: 'Mixed numbers and complex operations', icon: '🎯', difficulty: 'Hard', coins: 32 },
      { id: 'volume-area', title: '3D Geometry Wizards', description: 'Master volume and surface area', icon: '📦', difficulty: 'Hard', coins: 30 },
      { id: 'advanced-probability', title: 'Probability Masters', description: 'Multiple events and combinations', icon: '🃏', difficulty: 'Expert', coins: 35 },
      { id: 'algebraic-thinking', title: 'Algebra Beginners', description: 'Introduction to variables and equations', icon: '🔤', difficulty: 'Expert', coins: 38 },
      { id: 'ratio-proportion', title: 'Ratio and Proportion Pros', description: 'Compare quantities and solve proportions', icon: '⚖️', difficulty: 'Expert', coins: 36 },
      { id: 'percent', title: 'Percentage Professionals', description: 'Work with percentages in real life', icon: '💯', difficulty: 'Expert', coins: 34 },
      { id: 'order-operations', title: 'Order of Operations Experts', description: 'Follow PEMDAS rules perfectly', icon: '🎯', difficulty: 'Expert', coins: 40 },
      { id: 'negative-numbers', title: 'Negative Number Navigators', description: 'Work with numbers below zero', icon: '❄️', difficulty: 'Expert', coins: 35 },
      { id: 'advanced-data', title: 'Advanced Data Analysts', description: 'Mean, median, mode, and range', icon: '📊', difficulty: 'Expert', coins: 38 }
    ]
  };

  const specialFeatures = [
    {
      id: 'probability-lab',
      title: '🧪 Probability Laboratory',
      description: 'Interactive experiments with coins, dice, spinners and more!',
      action: 'Enter Lab',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      id: 'achievement-gallery',
      title: '🏆 Achievement Gallery',
      description: 'View your mathematical accomplishments and badges',
      action: 'View Gallery',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'progress-tracker',
      title: '📊 Progress Analytics',
      description: 'Detailed insights into your learning journey',
      action: 'View Analytics',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  const handleTopicClick = (topicId: string, gradeId: number) => {
    navigate(`/learn/${gradeId}/${topicId}`);
  };

  const handleSpecialFeatureClick = (featureId: string) => {
    switch (featureId) {
      case 'probability-lab':
        navigate('/probability-lab');
        break;
      case 'achievement-gallery':
        navigate('/achievement-gallery');
        break;
      case 'progress-tracker':
        navigate('/progress-analytics');
        break;
      default:
        break;
    }
  };

  const handleGradeChange = (grade: number) => {
    if (userProgress) {
      const updatedProgress = { ...userProgress, currentGrade: grade };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-grok-blue';
    }
  };

  if (!userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading your mathematical adventure...</div>
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
            <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-bold">{userProgress.achievements.length} Achievements</span>
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
          <p className="text-[#B0B6C3] text-lg">Ready for another amazing mathematical adventure?</p>
        </motion.div>

        {/* Special Features */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Zap className="w-6 h-6 text-grok-orange mr-2" />
            Special Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => handleSpecialFeatureClick(feature.id)}
                className="cursor-pointer"
              >
                <Card className={`bg-gradient-to-br ${feature.gradient} border-none text-white hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="mb-4 opacity-90">{feature.description}</p>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 w-full">
                      {feature.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grade Selector */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Select Your Grade Level</h3>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((grade) => (
              <Button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                variant={userProgress.currentGrade === grade ? "default" : "outline"}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  userProgress.currentGrade === grade 
                    ? 'bg-grok-orange hover:bg-grok-orange/90 text-white shadow-lg' 
                    : 'border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50 hover:text-white'
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

        {/* Topics Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6">Grade {userProgress.currentGrade} Learning Topics (10 Topics Available!)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {currentTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => handleTopicClick(topic.id, userProgress.currentGrade)}
                className="cursor-pointer"
              >
                <Card className="bg-[#1E2A3A] border-[#2A3441] hover:border-grok-orange/50 transition-all duration-300 h-full group">
                  <CardHeader className="text-center pb-3">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                    <CardTitle className="text-white text-sm leading-tight">{topic.title}</CardTitle>
                    <div className={`text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-[#B0B6C3] mb-3 text-xs leading-relaxed">
                      {topic.description}
                    </CardDescription>
                    <div className="flex items-center justify-center mb-3 space-x-1">
                      <Coins className="w-3 h-3 text-grok-orange" />
                      <span className="text-grok-orange font-bold text-xs">{topic.coins} coins</span>
                    </div>
                    <Button className="bg-grok-orange hover:bg-grok-orange/90 text-white w-full text-xs py-1 group-hover:shadow-lg transition-all duration-300">
                      Start Learning
                      <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
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
