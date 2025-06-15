
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GradeSelectorProps {
  currentGrade: number;
  onGradeChange: (grade: number) => void;
}

const GradeSelector = ({ currentGrade, onGradeChange }: GradeSelectorProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-2xl font-bold mb-4">Select Your Grade Level</h3>
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map((grade) => (
          <Button
            key={grade}
            onClick={() => onGradeChange(grade)}
            variant={currentGrade === grade ? "default" : "outline"}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              currentGrade === grade 
                ? 'bg-grok-orange hover:bg-grok-orange/90 text-white shadow-lg' 
                : 'border-[#2A3441] text-[#B0B6C3] hover:border-grok-orange/50 hover:text-white'
            }`}
          >
            Grade {grade}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default GradeSelector;
