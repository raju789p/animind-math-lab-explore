
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  coins: number;
}

interface TopicsGridProps {
  currentGrade: number;
  topics: Topic[];
  onTopicClick: (topicId: string, gradeId: number) => void;
}

const TopicsGrid = ({ currentGrade, topics, onTopicClick }: TopicsGridProps) => {
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

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-2xl font-bold mb-6">Grade {currentGrade} Learning Topics (10 Topics Available!)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => onTopicClick(topic.id, currentGrade)}
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
  );
};

export default TopicsGrid;
