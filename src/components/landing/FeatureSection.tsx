
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Dices, BarChart3 } from "lucide-react";

const FeatureSection = () => {
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

  return (
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
  );
};

export default FeatureSection;
