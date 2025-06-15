
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

interface SpecialFeaturesProps {
  onFeatureClick: (featureId: string) => void;
}

const SpecialFeatures = ({ onFeatureClick }: SpecialFeaturesProps) => {
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

  return (
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
            onClick={() => onFeatureClick(feature.id)}
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
  );
};

export default SpecialFeatures;
