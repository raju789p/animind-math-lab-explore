
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Coins, Home, ArrowLeft, Check, X, Lightbulb, Star } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  animation: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  coins: number;
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

  // Sample questions database
  const questionsDatabase: Record<string, Question[]> = {
    "1-counting": [
      {
        id: "count1",
        question: "Count the apples in the basket! 🍎🍎🍎",
        animation: "🍎 → 🍎🍎 → 🍎🍎🍎",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "There are 3 apples! Count them one by one: 1, 2, 3!",
        coins: 10
      },
      {
        id: "count2", 
        question: "How many stars are shining? ⭐⭐⭐⭐⭐",
        animation: "⭐ → ⭐⭐ → ⭐⭐⭐ → ⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐",
        options: ["4", "5", "6", "3"],
        correctAnswer: 1,
        explanation: "Great job! There are 5 bright stars in the sky!",
        coins: 10
      }
    ],
    "1-addition": [
      {
        id: "add1",
        question: "You have 2 cookies 🍪🍪 and get 1 more 🍪. How many do you have?",
        animation: "🍪🍪 + 🍪 = ?",
        options: ["2", "3", "4", "1"],
        correctAnswer: 1,
        explanation: "2 cookies + 1 cookie = 3 cookies! You can eat them all! 😋",
        coins: 15
      }
    ],
    "3-multiplication": [
      {
        id: "mult1",
        question: "Sarah has 3 groups of 4 stickers each. How many stickers total?",
        animation: "👤👤👤👤 × 3 groups = ?",
        options: ["7", "12", "10", "15"],
        correctAnswer: 1,
        explanation: "3 × 4 = 12 stickers! Each group has 4, and there are 3 groups: 4 + 4 + 4 = 12",
        coins: 20
      }
    ],
    "4-basic-probability": [
      {
        id: "prob1",
        question: "If you flip a coin, what's the chance of getting heads?",
        animation: "🪙 → 50% heads, 50% tails",
        options: ["25%", "50%", "75%", "100%"],
        correctAnswer: 1,
        explanation: "A coin has 2 sides, so each side has a 50% chance (1 out of 2)!",
        coins: 25
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
        question: "This is a demo question for this topic!",
        animation: "🎯 Working on this topic...",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
        explanation: "This is a sample question! More questions coming soon for this topic.",
        coins: 10
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
        
        toast.success(`Correct! +${coinsEarned} coins! 🎉`, {
          description: "Amazing work! Keep it up!"
        });
      }
    } else {
      toast.error("Not quite right, but you're learning! 💪", {
        description: "Check the explanation below"
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
      toast.success("Topic completed! Great job! 🌟", {
        description: "Head back to dashboard to try more topics"
      });
      navigate('/dashboard');
    }
  };

  const currentQ = questions[currentQuestion];
  if (!currentQ || !userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl">Loading question...</div>
    </div>;
  }

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
              Back
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
            <div className="text-[#B0B6C3]">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[#1E2A3A] border-[#2A3441] mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Animation Display */}
              <motion.div
                className="text-center py-8 text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentQ.animation}
              </motion.div>
              
              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? 'border-grok-orange bg-grok-orange/20'
                        : 'border-[#2A3441] hover:border-grok-orange/50'
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
                    className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-3 text-lg"
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
                        <Check className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-3xl font-bold text-green-500 mb-4">Excellent! 🎉</h3>
                      <motion.div
                        className="flex items-center justify-center space-x-2 mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8 }}
                      >
                        <Coins className="w-6 h-6 text-grok-orange" />
                        <span className="text-2xl font-bold text-grok-orange">+{earnedCoins} coins!</span>
                        <Star className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <div className="text-red-500 mb-4">
                        <X className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-3xl font-bold text-red-500 mb-4">Not quite! 💪</h3>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                        <span className="text-xl text-yellow-500">Let's learn together!</span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="bg-[#1E2A3A] p-6 rounded-lg mb-6">
                    <h4 className="text-xl font-bold text-grok-blue mb-2">Explanation:</h4>
                    <p className="text-[#B0B6C3] text-lg leading-relaxed">{currentQ.explanation}</p>
                  </div>

                  <Button
                    onClick={handleNextQuestion}
                    className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-3 text-lg"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Topic'}
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
