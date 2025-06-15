
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, TrendingUp, Target, Clock, Award, BarChart3, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from "recharts";

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

const ProgressAnalytics = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('animind_user');
    if (savedData) {
      setUserProgress(JSON.parse(savedData));
    }
  }, []);

  if (!userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading analytics...</div>
    </div>;
  }

  // Generate mock data for demonstration
  const weeklyProgress = [
    { day: 'Mon', problems: 5, accuracy: 80 },
    { day: 'Tue', problems: 8, accuracy: 85 },
    { day: 'Wed', problems: 6, accuracy: 90 },
    { day: 'Thu', problems: 12, accuracy: 88 },
    { day: 'Fri', problems: 9, accuracy: 92 },
    { day: 'Sat', problems: 7, accuracy: 87 },
    { day: 'Sun', problems: 11, accuracy: 91 }
  ];

  const gradeData = [
    { grade: 'Grade 1', completion: 85, problems: 42 },
    { grade: 'Grade 2', completion: 60, problems: 28 },
    { grade: 'Grade 3', completion: 40, problems: 18 },
    { grade: 'Grade 4', completion: 25, problems: 12 },
    { grade: 'Grade 5', completion: 15, problems: 8 }
  ];

  const topicData = [
    { name: 'Addition', value: 25, color: '#FF6B35' },
    { name: 'Multiplication', value: 20, color: '#00D4FF' },
    { name: 'Shapes', value: 15, color: '#FFD700' },
    { name: 'Fractions', value: 12, color: '#32CD32' },
    { name: 'Patterns', value: 10, color: '#FF69B4' },
    { name: 'Others', value: 18, color: '#9370DB' }
  ];

  const getPerformanceInsight = () => {
    if (userProgress.accuracy >= 90) return { text: "Exceptional Performance!", color: "text-green-400", icon: "🌟" };
    if (userProgress.accuracy >= 80) return { text: "Great Progress!", color: "text-blue-400", icon: "🎯" };
    if (userProgress.accuracy >= 70) return { text: "Good Work!", color: "text-yellow-400", icon: "👍" };
    return { text: "Keep Practicing!", color: "text-orange-400", icon: "💪" };
  };

  const insight = getPerformanceInsight();

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
          <h1 className="text-4xl font-bold text-grok-orange mb-4">📊 Progress Analytics</h1>
          <p className="text-[#B0B6C3] text-lg">
            Detailed insights into your mathematical journey
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Target className="w-5 h-5 text-grok-orange mr-2" />
                  Total Problems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-grok-orange">{userProgress.totalProblems}</div>
                <div className="text-sm text-[#B0B6C3]">Problems solved</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 text-grok-blue mr-2" />
                  Accuracy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-grok-blue">{userProgress.accuracy}%</div>
                <div className={`text-sm ${insight.color}`}>{insight.text} {insight.icon}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">{userProgress.streak}</div>
                <div className="text-sm text-[#B0B6C3]">Days in a row</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Award className="w-5 h-5 text-purple-500 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500">{userProgress.achievements.length}</div>
                <div className="text-sm text-[#B0B6C3]">Unlocked</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Progress Chart */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-6 h-6 text-grok-orange mr-2" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A3441" />
                    <XAxis dataKey="day" stroke="#B0B6C3" />
                    <YAxis stroke="#B0B6C3" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E2A3A', 
                        border: '1px solid #2A3441',
                        borderRadius: '8px',
                        color: '#white'
                      }} 
                    />
                    <Line type="monotone" dataKey="problems" stroke="#FF6B35" strokeWidth={3} />
                    <Line type="monotone" dataKey="accuracy" stroke="#00D4FF" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Topic Distribution */}
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="w-6 h-6 text-grok-blue mr-2" />
                  Topic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E2A3A', 
                        border: '1px solid #2A3441',
                        borderRadius: '8px',
                        color: '#white'
                      }} 
                    />
                    <RechartsPieChart data={topicData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                      {topicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {topicData.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: topic.color }}></div>
                      <span className="text-sm text-[#B0B6C3]">{topic.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Grade Progress */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-6 h-6 text-grok-orange mr-2" />
                Grade Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A3441" />
                  <XAxis dataKey="grade" stroke="#B0B6C3" />
                  <YAxis stroke="#B0B6C3" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E2A3A', 
                      border: '1px solid #2A3441',
                      borderRadius: '8px',
                      color: '#white'
                    }} 
                  />
                  <Bar dataKey="completion" fill="#FF6B35" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
