
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coins, ArrowLeft, Check, X, Lightbulb, Star, Trophy } from "lucide-react";
import { toast } from "sonner";

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

const Learn = () => {
  const { grade, topic } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // Comprehensive questions database for all grades and topics
  const questionsDatabase: Record<string, Question[]> = {
    // GRADE 1 TOPICS
    "1-counting": [
      {
        id: "count1",
        question: "Count the beautiful butterflies! 🦋🦋🦋🦋",
        animation: "🦋 → 🦋🦋 → 🦋🦋🦋 → 🦋🦋🦋🦋",
        animationType: 'emoji',
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "Perfect! There are 4 butterflies. Count them: 1, 2, 3, 4! 🎉",
        coins: 10,
        difficulty: 'easy'
      },
      {
        id: "count2",
        question: "How many stars are twinkling in the sky? ⭐⭐⭐⭐⭐⭐⭐",
        animation: "⭐ → ⭐⭐ → ⭐⭐⭐ → ⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Excellent! There are 7 bright stars shining! ✨",
        coins: 10,
        difficulty: 'easy'
      },
      {
        id: "count3",
        question: "Count the colorful balloons at the party! 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        animation: "🎈 floats up... 🎈🎈 float up... 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Amazing! You counted 10 balloons perfectly! Ready for the party! 🎉",
        coins: 15,
        difficulty: 'medium'
      }
    ],
    "1-addition": [
      {
        id: "add1",
        question: "You have 3 red apples 🍎🍎🍎 and get 2 more 🍎🍎. How many apples total?",
        animation: "🍎🍎🍎 + 🍎🍎 = ?",
        animationType: 'visual',
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        explanation: "Great job! 3 apples + 2 apples = 5 apples! You can make a delicious snack! 😋",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add2",
        question: "There are 4 birds 🐦🐦🐦🐦 on a tree. 3 more birds 🐦🐦🐦 join them. How many birds now?",
        animation: "🐦🐦🐦🐦 sitting... 🐦🐦🐦 flying in... 🐦🐦🐦🐦🐦🐦🐦",
        animationType: 'visual',
        options: ["6", "7", "8", "9"],
        correctAnswer: 1,
        explanation: "Perfect! 4 birds + 3 birds = 7 birds singing together! 🎵",
        coins: 15,
        difficulty: 'easy'
      }
    ],
    "1-shapes": [
      {
        id: "shape1",
        question: "Which shape has 3 sides and 3 corners?",
        animation: "🔺 ← Triangle | ⬜ ← Square | ⭕ ← Circle",
        animationType: 'visual',
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        correctAnswer: 1,
        explanation: "Excellent! A triangle has exactly 3 sides and 3 corners! 🔺",
        coins: 12,
        difficulty: 'easy'
      },
      {
        id: "shape2",
        question: "How many sides does a square have?",
        animation: "⬜ ← Count the sides: 1, 2, 3, 4",
        animationType: 'visual',
        options: ["3", "4", "5", "6"],
        correctAnswer: 1,
        explanation: "Perfect! A square has 4 equal sides! All squares are special! ⬜",
        coins: 12,
        difficulty: 'easy'
      }
    ],
    "1-patterns": [
      {
        id: "pattern1",
        question: "What comes next in this pattern? 🔴🔵🔴🔵🔴__",
        animation: "🔴🔵 → 🔴🔵🔴 → 🔴🔵🔴🔵 → 🔴🔵🔴🔵🔴__",
        animationType: 'visual',
        options: ["🔴", "🔵", "🟢", "🟡"],
        correctAnswer: 1,
        explanation: "Great pattern recognition! Red, Blue, Red, Blue... so Blue comes next! 🔵",
        coins: 18,
        difficulty: 'medium'
      }
    ],

    // GRADE 2 TOPICS
    "2-two-digit": [
      {
        id: "twodigit1",
        question: "What is 25 + 13?",
        animation: "👫👫👫👫👫👫👫👫👫👫 (20) + 👫👫👫👫👫 (5) + 👫👫👫👫👫👫👫👫👫👫 (10) + 👫👫👫 (3)",
        animationType: 'visual',
        options: ["35", "38", "33", "40"],
        correctAnswer: 1,
        explanation: "Excellent! 25 + 13 = 38. Break it down: 20 + 10 = 30, then 5 + 3 = 8, so 30 + 8 = 38! 🎯",
        coins: 20,
        difficulty: 'medium'
      },
      {
        id: "twodigit2",
        question: "What is 47 - 15?",
        animation: "Start with 47 blocks... take away 15 blocks... count what's left",
        animationType: 'visual',
        options: ["30", "32", "35", "28"],
        correctAnswer: 1,
        explanation: "Perfect! 47 - 15 = 32. You can think: 47 - 10 = 37, then 37 - 5 = 32! 📊",
        coins: 20,
        difficulty: 'medium'
      }
    ],
    "2-time": [
      {
        id: "time1",
        question: "What time is shown? Hour hand on 3, minute hand on 12",
        animation: "🕒 ← The clock shows 3:00",
        animationType: 'visual',
        options: ["2:00", "3:00", "12:00", "3:30"],
        correctAnswer: 1,
        explanation: "Great! When the minute hand points to 12 and hour hand points to 3, it's 3:00! 🕒",
        coins: 18,
        difficulty: 'medium'
      }
    ],
    "2-money": [
      {
        id: "money1",
        question: "How much money? 2 quarters + 1 dime + 3 pennies",
        animation: "🪙🪙 (25¢ each) + 🪙 (10¢) + 🪙🪙🪙 (1¢ each) = ?",
        animationType: 'visual',
        options: ["63¢", "68¢", "58¢", "73¢"],
        correctAnswer: 0,
        explanation: "Excellent! 2 quarters (50¢) + 1 dime (10¢) + 3 pennies (3¢) = 63¢! 💰",
        coins: 22,
        difficulty: 'medium'
      }
    ],
    "2-measurement": [
      {
        id: "measure1",
        question: "Which is longer: a pencil (6 inches) or a ruler (12 inches)?",
        animation: "✏️ (6 inches) vs 📏 (12 inches)",
        animationType: 'visual',
        options: ["Pencil", "Ruler", "Same length", "Can't tell"],
        correctAnswer: 1,
        explanation: "Correct! The ruler at 12 inches is longer than the pencil at 6 inches! 📏",
        coins: 16,
        difficulty: 'easy'
      }
    ],

    // GRADE 3 TOPICS
    "3-multiplication": [
      {
        id: "mult1",
        question: "Sarah has 4 groups of 3 stickers each. How many stickers total?",
        animation: "👤👤👤 × 4 groups = 👤👤👤|👤👤👤|👤👤👤|👤👤👤",
        animationType: 'visual',
        options: ["7", "12", "10", "15"],
        correctAnswer: 1,
        explanation: "Perfect! 4 × 3 = 12 stickers! You can add: 3 + 3 + 3 + 3 = 12 or multiply: 4 × 3 = 12! 🌟",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult2",
        question: "What is 6 × 7?",
        animation: "6 rows of 7 dots: ••••••• (×6 rows)",
        animationType: 'visual',
        options: ["42", "36", "48", "40"],
        correctAnswer: 0,
        explanation: "Excellent! 6 × 7 = 42. This is a key multiplication fact to remember! 🎯",
        coins: 25,
        difficulty: 'medium'
      }
    ],
    "3-division": [
      {
        id: "div1",
        question: "Share 15 cookies equally among 3 friends. How many cookies per friend?",
        animation: "🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪 ÷ 3 friends = 🍪🍪🍪🍪🍪 each",
        animationType: 'visual',
        options: ["4", "5", "6", "3"],
        correctAnswer: 1,
        explanation: "Great sharing! 15 ÷ 3 = 5 cookies per friend. Everyone gets the same amount! 🍪",
        coins: 25,
        difficulty: 'medium'
      }
    ],
    "3-fractions": [
      {
        id: "frac1",
        question: "What fraction of the pizza is eaten? (3 out of 8 slices)",
        animation: "🍕 divided into 8 slices, 3 slices taken = 3/8",
        animationType: 'visual',
        options: ["3/8", "5/8", "3/5", "8/3"],
        correctAnswer: 0,
        explanation: "Perfect! 3 slices out of 8 total slices = 3/8 of the pizza! 🍕",
        coins: 28,
        difficulty: 'medium'
      }
    ],
    "3-geometry": [
      {
        id: "geo1",
        question: "How many sides does a hexagon have?",
        animation: "⬢ ← Count the sides: 1, 2, 3, 4, 5, 6",
        animationType: 'visual',
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "Excellent! A hexagon has 6 sides. Remember: HEX means 6! ⬢",
        coins: 20,
        difficulty: 'easy'
      }
    ],

    // GRADE 4 TOPICS
    "4-multi-digit": [
      {
        id: "multidigit1",
        question: "What is 234 × 5?",
        animation: "234 × 5 = (200 × 5) + (30 × 5) + (4 × 5) = 1000 + 150 + 20",
        animationType: 'visual',
        options: ["1170", "1150", "1200", "1100"],
        correctAnswer: 0,
        explanation: "Excellent! 234 × 5 = 1170. Break it down: 200×5=1000, 30×5=150, 4×5=20, then 1000+150+20=1170! 🧮",
        coins: 30,
        difficulty: 'hard'
      }
    ],
    "4-advanced-geometry": [
      {
        id: "advgeo1",
        question: "What's the perimeter of a rectangle: length 8cm, width 5cm?",
        animation: "Rectangle: 8cm + 5cm + 8cm + 5cm = perimeter",
        animationType: 'visual',
        options: ["26cm", "24cm", "28cm", "22cm"],
        correctAnswer: 0,
        explanation: "Perfect! Perimeter = 8 + 5 + 8 + 5 = 26cm. Or use the formula: 2×(length + width) = 2×13 = 26cm! 📐",
        coins: 28,
        difficulty: 'medium'
      }
    ],
    "4-data": [
      {
        id: "data1",
        question: "Look at this data: 5 students like pizza, 3 like burgers, 7 like tacos. Which food is most popular?",
        animation: "📊 Pizza: 5 | Burgers: 3 | Tacos: 7",
        animationType: 'visual',
        options: ["Pizza", "Burgers", "Tacos", "All equal"],
        correctAnswer: 2,
        explanation: "Correct! Tacos are most popular with 7 students choosing them! 🌮",
        coins: 22,
        difficulty: 'easy'
      }
    ],
    "4-basic-probability": [
      {
        id: "prob1",
        question: "If you flip a fair coin, what's the probability of getting heads?",
        animation: "🪙 → 50% heads ⬆️ | 50% tails ⬇️",
        animationType: 'visual',
        options: ["25%", "50%", "75%", "100%"],
        correctAnswer: 1,
        explanation: "Perfect! A coin has 2 equal sides, so each side has a 50% (1/2) chance! 🪙",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "prob2",
        question: "What's the probability of rolling a 6 on a dice?",
        animation: "🎲 has 6 sides: 1, 2, 3, 4, 5, 6. One 6 out of 6 sides",
        animationType: 'visual',
        options: ["1/6", "1/3", "1/2", "1/4"],
        correctAnswer: 0,
        explanation: "Excellent! There's 1 side with 6 out of 6 total sides, so 1/6 probability! 🎲",
        coins: 28,
        difficulty: 'medium'
      }
    ],

    // GRADE 5 TOPICS
    "5-decimals": [
      {
        id: "dec1",
        question: "What is 2.5 + 1.3?",
        animation: "2.5 (2 and 5 tenths) + 1.3 (1 and 3 tenths) = 3.8",
        animationType: 'visual',
        options: ["3.8", "3.2", "4.8", "2.8"],
        correctAnswer: 0,
        explanation: "Perfect! 2.5 + 1.3 = 3.8. Add whole numbers: 2+1=3, add decimals: 0.5+0.3=0.8! 🔢",
        coins: 30,
        difficulty: 'medium'
      }
    ],
    "5-advanced-fractions": [
      {
        id: "advfrac1",
        question: "What is 2/3 + 1/3?",
        animation: "🍕 2/3 + 🍕 1/3 = 🍕 3/3 = 1 whole pizza",
        animationType: 'visual',
        options: ["3/6", "1", "3/3", "2/3"],
        correctAnswer: 1,
        explanation: "Excellent! 2/3 + 1/3 = 3/3 = 1 whole! When fractions have the same denominator, just add the numerators! 🎯",
        coins: 32,
        difficulty: 'medium'
      }
    ],
    "5-volume-area": [
      {
        id: "vol1",
        question: "What's the area of a rectangle: 6 units long, 4 units wide?",
        animation: "Rectangle 6×4: ████████████████████████ (24 square units)",
        animationType: 'visual',
        options: ["20", "24", "10", "18"],
        correctAnswer: 1,
        explanation: "Perfect! Area = length × width = 6 × 4 = 24 square units! 📦",
        coins: 30,
        difficulty: 'medium'
      }
    ],
    "5-advanced-probability": [
      {
        id: "advprob1",
        question: "You have 10 marbles: 6 red, 4 blue. What's the probability of picking a red marble?",
        animation: "Bag with 🔴🔴🔴🔴🔴🔴🔵🔵🔵🔵 → 6 red out of 10 total",
        animationType: 'visual',
        options: ["6/10", "4/10", "6/4", "10/6"],
        correctAnswer: 0,
        explanation: "Excellent! 6 red marbles out of 10 total = 6/10 = 3/5 probability! 🎯",
        coins: 35,
        difficulty: 'hard'
      }
    ]
  };

  useEffect(() => {
    // Load user progress
    const savedData = localStorage.getItem('animind_user');
    if (savedData) {
      setUserProgress(JSON.parse(savedData));
    }

    // Load questions for this topic
    const topicKey = `${grade}-${topic}`;
    const topicQuestions = questionsDatabase[topicKey] || [
      {
        id: "demo",
        question: "This topic is being prepared with amazing content!",
        animation: "🚧 Under Construction... Coming Soon! 🚧",
        animationType: 'emoji' as const,
        options: ["I'm excited!", "Can't wait!", "Bring it on!", "Let's learn!"],
        correctAnswer: 0,
        explanation: "Thank you for your patience! This topic will have incredible interactive content soon! 🌟",
        coins: 10,
        difficulty: 'easy' as const
      }
    ];
    setQuestions(topicQuestions);
  }, [grade, topic]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const coinsEarned = questions[currentQuestion].coins;
      setEarnedCoins(coinsEarned);
      
      // Update user progress
      if (userProgress) {
        const updatedProgress = {
          ...userProgress,
          coins: userProgress.coins + coinsEarned,
          totalProblems: userProgress.totalProblems + 1,
          streak: userProgress.streak + 1,
          accuracy: Math.round(((userProgress.totalProblems * userProgress.accuracy / 100) + 1) / (userProgress.totalProblems + 1) * 100)
        };
        
        setUserProgress(updatedProgress);
        localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
        
        toast.success(`Brilliant! +${coinsEarned} coins! 🎉`, {
          description: "You're becoming a math master!"
        });
      }
    } else {
      // Reset streak on wrong answer
      if (userProgress) {
        const updatedProgress = {
          ...userProgress,
          totalProblems: userProgress.totalProblems + 1,
          streak: 0,
          accuracy: Math.round(((userProgress.totalProblems * userProgress.accuracy / 100)) / (userProgress.totalProblems + 1) * 100)
        };
        
        setUserProgress(updatedProgress);
        localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
      }
      
      toast.error("Not quite right, but you're learning! 💪", {
        description: "Check the explanation below to understand better"
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setEarnedCoins(0);
    } else {
      // Complete topic
      toast.success("🎊 Topic Mastered! Outstanding work! 🏆", {
        description: "Ready for your next mathematical adventure?"
      });
      navigate('/dashboard');
    }
  };

  const currentQ = questions[currentQuestion];
  if (!currentQ || !userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading your mathematical adventure...</div>
    </div>;
  }

  const getAnimationDisplay = () => {
    switch (currentQ.animationType) {
      case 'emoji':
        return (
          <motion.div
            className="text-center py-8 text-5xl leading-relaxed"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentQ.animation}
          </motion.div>
        );
      case 'visual':
        return (
          <motion.div
            className="text-center py-8 text-3xl leading-relaxed bg-[#1A1F2E] rounded-lg p-6 border border-[#2A3441]"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {currentQ.animation}
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
            {currentQ.animation}
          </motion.div>
        );
      default:
        return (
          <div className="text-center py-8 text-4xl">
            {currentQ.animation}
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
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <header className="p-6 border-b border-[#2A3441]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
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
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Topic Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-grok-orange mb-2">
            Grade {grade} - {topic?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <div className={`text-sm font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
            Difficulty: {currentQ.difficulty.toUpperCase()}
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
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Animation Display */}
              {getAnimationDisplay()}
              
              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'border-grok-orange bg-grok-orange/20 shadow-lg'
                        : 'border-[#2A3441] hover:border-grok-orange/50 hover:bg-[#2A3441]/50'
                    } ${showResult && index === currentQ.correctAnswer ? 'border-green-500 bg-green-500/20' : ''}
                    ${showResult && selectedAnswer === index && index !== currentQ.correctAnswer ? 'border-red-500 bg-red-500/20' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={showResult}
                  >
                    <div className="text-white text-xl font-semibold">{option}</div>
                  </motion.button>
                ))}
              </div>

              {/* Submit Button */}
              {!showResult && (
                <div className="text-center mt-8">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Section */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`border-2 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                <CardContent className="p-8 text-center">
                  {isCorrect ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <div className="text-green-500 mb-4">
                        <Check className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-4xl font-bold text-green-500 mb-4">Outstanding! 🎉</h3>
                      <motion.div
                        className="flex items-center justify-center space-x-3 mb-6"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8 }}
                      >
                        <Coins className="w-8 h-8 text-grok-orange" />
                        <span className="text-3xl font-bold text-grok-orange">+{earnedCoins} coins!</span>
                        <Star className="w-8 h-8 text-yellow-500" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <div className="text-red-500 mb-4">
                        <X className="w-20 h-20 mx-auto" />
                      </div>
                      <h3 className="text-4xl font-bold text-red-500 mb-4">Keep Learning! 💪</h3>
                      <div className="flex items-center justify-center space-x-2 mb-6">
                        <Lightbulb className="w-8 h-8 text-yellow-500" />
                        <span className="text-2xl text-yellow-500">Every mistake is a step forward!</span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="bg-[#1E2A3A] p-6 rounded-lg mb-6">
                    <h4 className="text-2xl font-bold text-grok-blue mb-3">💡 Explanation:</h4>
                    <p className="text-[#B0B6C3] text-lg leading-relaxed">{currentQ.explanation}</p>
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-4 text-lg font-semibold"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Challenge' : 'Complete Topic'} 
                    <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Learn;
