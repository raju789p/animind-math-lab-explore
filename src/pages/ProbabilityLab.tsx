
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, RotateCcw, TrendingUp, Dices, Coins } from "lucide-react";
import { toast } from "sonner";

interface ExperimentResult {
  trial: number;
  outcome: string;
  probability: number;
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

const ProbabilityLab = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const [results, setResults] = useState<ExperimentResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTrial, setCurrentTrial] = useState(0);

  // Coin Flip State
  const [coinSide, setCoinSide] = useState<'heads' | 'tails' | null>(null);
  const [coinFlipping, setCoinFlipping] = useState(false);

  // Dice Roll State
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [diceRolling, setDiceRolling] = useState(false);

  // Spinner State
  const [spinnerValue, setSpinnerValue] = useState<string | null>(null);
  const [spinnerSpinning, setSpinnerSpinning] = useState(false);
  const [spinnerAngle, setSpinnerAngle] = useState(0);

  // Card Draw State
  const [drawnCard, setDrawnCard] = useState<{suit: string, value: string} | null>(null);
  const [deckShuffling, setDeckShuffling] = useState(false);

  // Weather Prediction State
  const [weatherOutcome, setWeatherOutcome] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('animind_user');
    if (savedData) {
      setUserProgress(JSON.parse(savedData));
    }
  }, []);

  const experiments = [
    {
      id: 'coin-flip',
      title: 'Coin Flip Laboratory',
      description: 'Explore the classic 50/50 probability with our interactive coin',
      icon: '🪙',
      difficulty: 'Beginner',
      expectedProbability: 0.5
    },
    {
      id: 'dice-roll',
      title: 'Dice Rolling Chamber',
      description: 'Investigate probability with a six-sided dice',
      icon: '🎲',
      difficulty: 'Beginner',
      expectedProbability: 1/6
    },
    {
      id: 'spinner-wheel',
      title: 'Color Spinner Wheel',
      description: 'Spin a wheel with different colored sections',
      icon: '🎡',
      difficulty: 'Intermediate',
      expectedProbability: 0.25
    },
    {
      id: 'card-draw',
      title: 'Magic Card Laboratory',
      description: 'Draw cards and explore deck probability',
      icon: '🃏',
      difficulty: 'Intermediate',
      expectedProbability: 1/52
    },
    {
      id: 'weather-prediction',
      title: 'Weather Probability Station',
      description: 'Predict weather outcomes based on conditions',
      icon: '🌦️',
      difficulty: 'Advanced',
      expectedProbability: 0.3
    },
    {
      id: 'multiple-events',
      title: 'Multiple Events Lab',
      description: 'Explore probability of combined events',
      icon: '🔗',
      difficulty: 'Advanced',
      expectedProbability: 0.25
    }
  ];

  const runCoinFlip = async () => {
    setCoinFlipping(true);
    setIsRunning(true);
    
    // Simulate coin flip animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
    setCoinSide(outcome);
    
    const newResult: ExperimentResult = {
      trial: currentTrial + 1,
      outcome,
      probability: outcome === 'heads' ? 0.5 : 0.5
    };
    
    setResults(prev => [...prev, newResult]);
    setCurrentTrial(prev => prev + 1);
    setCoinFlipping(false);
    setIsRunning(false);

    // Award coins for participation
    if (userProgress) {
      const updatedProgress = { ...userProgress, coins: userProgress.coins + 5 };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const runDiceRoll = async () => {
    setDiceRolling(true);
    setIsRunning(true);
    
    // Simulate dice rolling animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const outcome = Math.floor(Math.random() * 6) + 1;
    setDiceValue(outcome);
    
    const newResult: ExperimentResult = {
      trial: currentTrial + 1,
      outcome: outcome.toString(),
      probability: 1/6
    };
    
    setResults(prev => [...prev, newResult]);
    setCurrentTrial(prev => prev + 1);
    setDiceRolling(false);
    setIsRunning(false);

    if (userProgress) {
      const updatedProgress = { ...userProgress, coins: userProgress.coins + 8 };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const runSpinner = async () => {
    setSpinnerSpinning(true);
    setIsRunning(true);
    
    // Animate spinner
    const spins = 3 + Math.random() * 2; // 3-5 full spins
    const finalAngle = spins * 360 + Math.random() * 360;
    setSpinnerAngle(finalAngle);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const colors = ['Red', 'Blue', 'Green', 'Yellow'];
    const outcome = colors[Math.floor(Math.random() * colors.length)];
    setSpinnerValue(outcome);
    
    const newResult: ExperimentResult = {
      trial: currentTrial + 1,
      outcome,
      probability: 0.25
    };
    
    setResults(prev => [...prev, newResult]);
    setCurrentTrial(prev => prev + 1);
    setSpinnerSpinning(false);
    setIsRunning(false);

    if (userProgress) {
      const updatedProgress = { ...userProgress, coins: userProgress.coins + 10 };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const runCardDraw = async () => {
    setDeckShuffling(true);
    setIsRunning(true);
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    
    setDrawnCard({ suit, value });
    
    const newResult: ExperimentResult = {
      trial: currentTrial + 1,
      outcome: `${value}${suit}`,
      probability: 1/52
    };
    
    setResults(prev => [...prev, newResult]);
    setCurrentTrial(prev => prev + 1);
    setDeckShuffling(false);
    setIsRunning(false);

    if (userProgress) {
      const updatedProgress = { ...userProgress, coins: userProgress.coins + 12 };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const runWeatherPrediction = async () => {
    setIsRunning(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const outcomes = ['Sunny ☀️', 'Rainy 🌧️', 'Cloudy ☁️', 'Stormy ⛈️'];
    const probabilities = [0.4, 0.3, 0.2, 0.1];
    
    const random = Math.random();
    let cumulative = 0;
    let selectedOutcome = outcomes[0];
    let selectedProbability = probabilities[0];
    
    for (let i = 0; i < outcomes.length; i++) {
      cumulative += probabilities[i];
      if (random < cumulative) {
        selectedOutcome = outcomes[i];
        selectedProbability = probabilities[i];
        break;
      }
    }
    
    setWeatherOutcome(selectedOutcome);
    
    const newResult: ExperimentResult = {
      trial: currentTrial + 1,
      outcome: selectedOutcome,
      probability: selectedProbability
    };
    
    setResults(prev => [...prev, newResult]);
    setCurrentTrial(prev => prev + 1);
    setIsRunning(false);

    if (userProgress) {
      const updatedProgress = { ...userProgress, coins: userProgress.coins + 15 };
      setUserProgress(updatedProgress);
      localStorage.setItem('animind_user', JSON.stringify(updatedProgress));
    }
  };

  const runExperiment = () => {
    switch (selectedExperiment) {
      case 'coin-flip':
        runCoinFlip();
        break;
      case 'dice-roll':
        runDiceRoll();
        break;
      case 'spinner-wheel':
        runSpinner();
        break;
      case 'card-draw':
        runCardDraw();
        break;
      case 'weather-prediction':
        runWeatherPrediction();
        break;
      default:
        toast.error("Experiment not implemented yet!");
    }
  };

  const resetExperiment = () => {
    setResults([]);
    setCurrentTrial(0);
    setCoinSide(null);
    setDiceValue(null);
    setSpinnerValue(null);
    setDrawnCard(null);
    setWeatherOutcome(null);
    setSpinnerAngle(0);
  };

  const calculateStatistics = () => {
    if (results.length === 0) return null;
    
    const outcomeFrequency: Record<string, number> = {};
    results.forEach(result => {
      outcomeFrequency[result.outcome] = (outcomeFrequency[result.outcome] || 0) + 1;
    });
    
    return Object.entries(outcomeFrequency).map(([outcome, frequency]) => ({
      outcome,
      frequency,
      percentage: ((frequency / results.length) * 100).toFixed(1)
    }));
  };

  const renderExperimentInterface = () => {
    switch (selectedExperiment) {
      case 'coin-flip':
        return (
          <div className="text-center">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl"
              animate={coinFlipping ? { rotateY: [0, 180, 360, 540, 720] } : {}}
              transition={{ duration: 1.5 }}
            >
              {coinSide === 'heads' ? '👑' : coinSide === 'tails' ? 'T' : '🪙'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">
              {coinSide ? `Result: ${coinSide.toUpperCase()}!` : 'Click to flip the coin!'}
            </h3>
          </div>
        );
      
      case 'dice-roll':
        return (
          <div className="text-center">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center text-6xl shadow-2xl border-4 border-gray-300"
              animate={diceRolling ? { 
                rotateX: [0, 360, 720], 
                rotateY: [0, 360, 720],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 2 }}
            >
              {diceValue ? `⚀⚁⚂⚃⚄⚅`[diceValue - 1] : '🎲'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">
              {diceValue ? `Rolled: ${diceValue}!` : 'Click to roll the dice!'}
            </h3>
          </div>
        );
      
      case 'spinner-wheel':
        return (
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <motion.div
                className="w-full h-full rounded-full border-8 border-gray-600 relative overflow-hidden"
                style={{
                  background: 'conic-gradient(red 0deg 90deg, blue 90deg 180deg, green 180deg 270deg, yellow 270deg 360deg)'
                }}
                animate={{ rotate: spinnerAngle }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                <div className="absolute top-0 left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-black transform -translate-x-1/2"></div>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {spinnerValue ? `Landed on: ${spinnerValue}!` : 'Click to spin the wheel!'}
            </h3>
          </div>
        );
      
      case 'card-draw':
        return (
          <div className="text-center">
            <motion.div
              className="w-32 h-48 mx-auto mb-6 bg-white rounded-lg flex flex-col items-center justify-center text-4xl shadow-2xl border-2 border-gray-300"
              animate={deckShuffling ? { 
                x: [-10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 1.8 }}
            >
              {drawnCard ? (
                <>
                  <div className={`text-6xl ${drawnCard.suit === '♥️' || drawnCard.suit === '♦️' ? 'text-red-500' : 'text-black'}`}>
                    {drawnCard.suit}
                  </div>
                  <div className="text-2xl font-bold">{drawnCard.value}</div>
                </>
              ) : '🃏'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">
              {drawnCard ? `Drew: ${drawnCard.value}${drawnCard.suit}!` : 'Click to draw a card!'}
            </h3>
          </div>
        );
      
      case 'weather-prediction':
        return (
          <div className="text-center">
            <motion.div
              className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-6xl shadow-2xl"
              animate={isRunning ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 2.5 }}
            >
              {weatherOutcome ? weatherOutcome.split(' ')[1] : '🌦️'}
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">
              {weatherOutcome ? `Weather: ${weatherOutcome}!` : 'Click to predict weather!'}
            </h3>
          </div>
        );
      
      default:
        return (
          <div className="text-center text-gray-400">
            Select an experiment to begin!
          </div>
        );
    }
  };

  const statistics = calculateStatistics();

  if (!userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl">Loading Probability Lab...</div>
    </div>;
  }

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
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#1E2A3A] px-4 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-grok-orange" />
              <span className="text-grok-orange font-bold">{userProgress.coins}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Lab Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-grok-orange mb-4">🧪 Probability Laboratory</h1>
          <p className="text-xl text-[#B0B6C3]">
            Discover the fascinating world of probability through interactive experiments!
          </p>
        </motion.div>

        {!selectedExperiment ? (
          /* Experiment Selection */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedExperiment(experiment.id)}
                className="cursor-pointer"
              >
                <Card className="bg-[#1E2A3A] border-[#2A3441] hover:border-grok-orange/50 transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-4">{experiment.icon}</div>
                    <CardTitle className="text-white text-xl">{experiment.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-[#B0B6C3] mb-4">{experiment.description}</p>
                    <div className={`text-sm font-medium mb-4 ${
                      experiment.difficulty === 'Beginner' ? 'text-green-400' :
                      experiment.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {experiment.difficulty}
                    </div>
                    <Button className="bg-grok-orange hover:bg-grok-orange/90 text-white w-full">
                      Start Experiment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Experiment Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Experiment Area */}
            <div className="lg:col-span-2">
              <Card className="bg-[#1E2A3A] border-[#2A3441] mb-6">
                <CardHeader>
                  <CardTitle className="text-center text-2xl text-grok-orange">
                    {experiments.find(e => e.id === selectedExperiment)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {renderExperimentInterface()}
                  
                  <div className="flex justify-center space-x-4 mt-8">
                    <Button
                      onClick={runExperiment}
                      disabled={isRunning}
                      className="bg-grok-orange hover:bg-grok-orange/90 text-white px-8 py-3"
                    >
                      {isRunning ? 'Running...' : 'Run Experiment'}
                    </Button>
                    <Button
                      onClick={resetExperiment}
                      variant="outline"
                      className="border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button
                      onClick={() => setSelectedExperiment(null)}
                      variant="outline"
                      className="border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50"
                    >
                      Change Experiment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Panel */}
            <div>
              <Card className="bg-[#1E2A3A] border-[#2A3441] mb-6">
                <CardHeader>
                  <CardTitle className="text-grok-blue flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-[#B0B6C3]">Total Trials</div>
                      <div className="text-2xl font-bold text-white">{results.length}</div>
                    </div>
                    
                    {statistics && (
                      <div>
                        <div className="text-sm text-[#B0B6C3] mb-2">Outcomes</div>
                        {statistics.map((stat, index) => (
                          <div key={index} className="flex justify-between items-center mb-2">
                            <span className="text-white">{stat.outcome}</span>
                            <span className="text-grok-orange font-bold">{stat.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Results */}
              {results.length > 0 && (
                <Card className="bg-[#1E2A3A] border-[#2A3441]">
                  <CardHeader>
                    <CardTitle className="text-grok-blue">Recent Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {results.slice(-10).reverse().map((result, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-[#0F1419] rounded">
                          <span className="text-sm text-[#B0B6C3]">Trial {result.trial}</span>
                          <span className="text-white font-medium">{result.outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProbabilityLab;
