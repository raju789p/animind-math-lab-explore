import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, BarChart3, Dices, Calculator, Target, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Interactive Animations",
      description: "Watch math concepts come alive with stunning visual animations that make learning intuitive and engaging."
    },
    {
      icon: Dices,
      title: "Probability Lab",
      description: "Master probability through hands-on experiments with coins, dice, spinners, and real-world scenarios."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Advanced analytics track your learning journey with detailed progress reports and achievement badges."
    }
  ];

  const grades = [
    {
      grade: 1,
      title: "Grade 1",
      topics: ["Counting", "Basic Addition", "Shapes", "Patterns"],
      color: "from-pink-500 to-purple-500"
    },
    {
      grade: 2,
      title: "Grade 2", 
      topics: ["Two-digit Math", "Time", "Money", "Measurement"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      grade: 3,
      title: "Grade 3",
      topics: ["Multiplication", "Division", "Fractions", "Geometry"],
      color: "from-green-500 to-emerald-500"
    },
    {
      grade: 4,
      title: "Grade 4",
      topics: ["Multi-digit Ops", "Advanced Geometry", "Data", "Basic Probability"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      grade: 5,
      title: "Grade 5",
      topics: ["Decimals", "Advanced Fractions", "Volume/Area", "Complex Probability"],
      color: "from-red-500 to-pink-500"
    }
  ];

  const mathSymbols = ["+", "×", "÷", "=", "π", "∑", "%", "√"];

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-white overflow-hidden">
      {/* Floating Math Symbols Background */}
      <div className="fixed inset-0 pointer-events-none">
        {mathSymbols.map((symbol, index) => (
          <motion.div
            key={index}
            className="absolute text-grok-orange/20 text-6xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 bg-grok-orange rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-grok-orange">ANIMIND</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Features</a>
          <a href="#grades" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Grades</a>
          <a href="#lab" className="text-[#B0B6C3] hover:text-grok-blue transition-colors">Probability Lab</a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Master Math Through
              <span className="block text-grok-orange">Interactive Animation</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#B0B6C3] mb-12 max-w-3xl mx-auto">
              AI-powered learning platform for Grades 1-5 with advanced probability experiments and engaging visual math concepts
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              onClick={handleStartLearning}
              size="lg" 
              className="bg-grok-orange hover:bg-grok-orange/90 text-white text-lg px-12 py-6 rounded-full pulse-glow"
            >
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Animated Icons */}
          <div className="mt-20 flex justify-center space-x-8">
            {[Calculator, Target, Sparkles].map((Icon, index) => (
              <motion.div
                key={index}
                className="w-16 h-16 bg-gradient-to-br from-grok-blue/20 to-grok-orange/20 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                <Icon className="w-8 h-8 text-grok-blue" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionary Learning Features
            </h3>
            <p className="text-xl text-[#B0B6C3] max-w-3xl mx-auto">
              Experience math like never before with our cutting-edge interactive platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-[#1E2A3A] border-[#2A3441] hover:border-grok-orange/30 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-grok-orange to-grok-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#B0B6C3] text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Selection */}
      <section id="grades" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Learning Adventure
            </h3>
            <p className="text-xl text-[#B0B6C3] max-w-3xl mx-auto">
              Tailored curriculum for every grade level with progressive difficulty
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.grade}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedGrade(grade.grade)}
                className="cursor-pointer"
              >
                <Card className={`bg-[#1E2A3A] border-[#2A3441] hover:border-grok-orange/50 transition-all duration-300 h-full ${
                  selectedGrade === grade.grade ? 'ring-2 ring-grok-orange' : ''
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${grade.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl font-bold text-white">{grade.grade}</span>
                    </div>
                    <CardTitle className="text-xl text-white">{grade.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {grade.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="text-sm text-[#B0B6C3] text-center p-2 bg-[#0F1419] rounded">
                        {topic}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-grok-orange/10 to-grok-blue/10 rounded-3xl p-12 border border-grok-orange/20"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Math Learning?
            </h3>
            <p className="text-xl text-[#B0B6C3] mb-8">
              Join thousands of students already mastering math through interactive animations
            </p>
            <Button 
              onClick={handleStartLearning}
              size="lg"
              className="bg-grok-orange hover:bg-grok-orange/90 text-white text-lg px-12 py-6 rounded-full"
            >
              Start Your Math Journey
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-[#2A3441]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-grok-orange rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-grok-orange">ANIMIND</span>
          </div>
          <p className="text-[#B0B6C3]">
            Advanced Interactive Math Learning Platform • Grades 1-5 • Powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
