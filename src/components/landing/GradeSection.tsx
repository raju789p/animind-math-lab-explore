
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const GradeSection = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

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

  return (
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
  );
};

export default GradeSection;
