
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, TrendingUp, Target, Calendar, Award, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";

const ProgressAnalytics = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7days");

  // Sample data - in real app this would come from localStorage/API
  const weeklyProgress = [
    { day: "Mon", problems: 12, accuracy: 85, coins: 120 },
    { day: "Tue", problems: 15, accuracy: 92, coins: 180 },
    { day: "Wed", problems: 8, accuracy: 75, coins: 80 },
    { day: "Thu", problems: 20, accuracy: 88, coins: 240 },
    { day: "Fri", problems: 18, accuracy: 94, coins: 270 },
    { day: "Sat", problems: 25, accuracy: 90, coins: 350 },
    { day: "Sun", problems: 22, accuracy: 87, coins: 310 },
  ];

  const monthlyProgress = [
    { week: "Week 1", problems: 85, accuracy: 82, coins: 1020 },
    { week: "Week 2", problems: 92, accuracy: 86, coins: 1380 },
    { week: "Week 3", problems: 78, accuracy: 88, coins: 1170 },
    { week: "Week 4", problems: 105, accuracy: 91, coins: 1575 },
  ];

  const gradeDistribution = [
    { name: "Grade 1", value: 25, color: "#FF6B6B" },
    { name: "Grade 2", value: 30, color: "#4ECDC4" },
    { name: "Grade 3", value: 20, color: "#45B7D1" },
    { name: "Grade 4", value: 15, color: "#96CEB4" },
    { name: "Grade 5", value: 10, color: "#FFEAA7" },
  ];

  const topicMastery = [
    { topic: "Addition", mastery: 95, problems: 45 },
    { topic: "Multiplication", mastery: 88, problems: 38 },
    { topic: "Fractions", mastery: 82, problems: 29 },
    { topic: "Geometry", mastery: 76, problems: 22 },
    { topic: "Division", mastery: 71, problems: 31 },
  ];

  const streakData = [
    { date: "Jan 1", streak: 1 },
    { date: "Jan 8", streak: 7 },
    { date: "Jan 15", streak: 12 },
    { date: "Jan 22", streak: 8 },
    { date: "Jan 29", streak: 15 },
    { date: "Feb 5", streak: 22 },
    { date: "Feb 12", streak: 18 },
  ];

  const achievements = [
    { name: "First Steps", description: "Completed your first problem", date: "2024-01-15", rarity: "Common" },
    { name: "Speed Demon", description: "Solved 10 problems in under 5 minutes", date: "2024-02-01", rarity: "Rare" },
    { name: "Perfect Week", description: "100% accuracy for 7 days straight", date: "2024-02-10", rarity: "Epic" },
    { name: "Math Explorer", description: "Tried all topics in Grade 3", date: "2024-02-15", rarity: "Legendary" },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "text-gray-400";
      case "Rare": return "text-blue-400";
      case "Epic": return "text-purple-400";
      case "Legendary": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  const chartConfig = {
    problems: { label: "Problems Solved", color: "#FF6B6B" },
    accuracy: { label: "Accuracy %", color: "#4ECDC4" },
    coins: { label: "Coins Earned", color: "#FFEAA7" },
    mastery: { label: "Mastery %", color: "#45B7D1" },
    streak: { label: "Day Streak", color: "#96CEB4" },
  };

  const currentData = selectedTimeframe === "7days" ? weeklyProgress : monthlyProgress;

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[#2A3441]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-grok-orange rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-grok-orange">Progress Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Time Frame Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Your Learning Journey 📊</h2>
            <div className="flex space-x-2">
              <Button
                onClick={() => setSelectedTimeframe("7days")}
                variant={selectedTimeframe === "7days" ? "default" : "outline"}
                className={selectedTimeframe === "7days" 
                  ? 'bg-grok-orange hover:bg-grok-orange/90' 
                  : 'border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50 hover:text-white'
                }
              >
                Last 7 Days
              </Button>
              <Button
                onClick={() => setSelectedTimeframe("month")}
                variant={selectedTimeframe === "month" ? "default" : "outline"}
                className={selectedTimeframe === "month" 
                  ? 'bg-grok-orange hover:bg-grok-orange/90' 
                  : 'border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50 hover:text-white'
                }
              >
                Monthly View
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Progress Chart */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 text-grok-orange mr-2" />
                Performance Overview
              </CardTitle>
              <CardDescription className="text-[#B0B6C3]">
                Your daily progress across key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedTimeframe === "7days" ? "day" : "week"} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="problems" stackId="1" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="accuracy" stackId="2" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.3} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Brain className="w-5 h-5 text-blue-400 mr-2" />
                Total Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">1,247</div>
              <div className="text-sm text-green-400">+23% this week</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Target className="w-5 h-5 text-grok-orange mr-2" />
                Average Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-grok-orange">87.3%</div>
              <div className="text-sm text-green-400">+5.2% improvement</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">15 Days</div>
              <div className="text-sm text-yellow-400">Personal best!</div>
            </CardContent>
          </Card>

          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                Total Coins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">8,450</div>
              <div className="text-sm text-green-400">+340 this week</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grade Distribution */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader>
                <CardTitle className="text-white">Grade Distribution</CardTitle>
                <CardDescription className="text-[#B0B6C3]">
                  Time spent on each grade level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <PieChart data={gradeDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Topic Mastery */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-[#1E2A3A] border-[#2A3441]">
              <CardHeader>
                <CardTitle className="text-white">Topic Mastery</CardTitle>
                <CardDescription className="text-[#B0B6C3]">
                  Your performance by subject area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <BarChart data={topicMastery}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="mastery" fill="#45B7D1" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Streak Progress */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader>
              <CardTitle className="text-white">Streak History</CardTitle>
              <CardDescription className="text-[#B0B6C3]">
                Your daily learning streak over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <LineChart data={streakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="streak" stroke="#96CEB4" strokeWidth={3} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441]">
            <CardHeader>
              <CardTitle className="text-white">Recent Achievements</CardTitle>
              <CardDescription className="text-[#B0B6C3]">
                Your latest accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0F1419] rounded-lg border border-[#2A3441]">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{achievement.name}</h4>
                        <p className="text-[#B0B6C3] text-sm">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </div>
                      <div className="text-xs text-[#B0B6C3]">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
