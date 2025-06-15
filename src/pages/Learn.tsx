import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuestionDisplay from "@/components/learn/QuestionDisplay";
import AnswerOptions from "@/components/learn/AnswerOptions";
import ResultFeedback from "@/components/learn/ResultFeedback";
import LearnHeader from "@/components/learn/LearnHeader";

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

  // Complete questions database with 20 questions per topic
  const questionsDatabase: Record<string, Question[]> = {
    // GRADE 1 - COUNTING (20 questions)
    "1-counting": [
      {
        id: "count1",
        question: "Count the beautiful butterflies flying in the garden!",
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
        question: "How many stars are twinkling in the night sky?",
        animation: "⭐ → ⭐⭐ → ⭐⭐⭐ → ⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐⭐ → ⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Excellent! There are 7 bright stars shining! Count carefully: 1, 2, 3, 4, 5, 6, 7! ✨",
        coins: 10,
        difficulty: 'easy'
      },
      {
        id: "count3",
        question: "Count the colorful balloons at the birthday party!",
        animation: "🎈 floats up... 🎈🎈 float up... 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Amazing! You counted 10 balloons perfectly! That's a great party! 🎉",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count4",
        question: "How many apples are on the tree?",
        animation: "🍎🍎🍎🍎🍎🍎🍎",
        animationType: 'emoji',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Great! There are 7 apples on the tree. Count them carefully! 🍎",
        coins: 10,
        difficulty: 'easy'
      },
      {
        id: "count5",
        question: "Count the number of cars in the parking lot!",
        animation: "🚗🚗🚗🚗🚗🚗",
        animationType: 'emoji',
        options: ["5", "6", "7", "4"],
        correctAnswer: 1,
        explanation: "Perfect! There are 6 cars parked. Well done! 🚗",
        coins: 10,
        difficulty: 'easy'
      },
      {
        id: "count6",
        question: "How many fish are swimming in the pond?",
        animation: "🐟🐟🐟🐟🐟🐟🐟🐟",
        animationType: 'emoji',
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        explanation: "Excellent! There are 8 fish swimming happily! 🐟",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count7",
        question: "Count the number of pencils in the box!",
        animation: "✏️✏️✏️✏️✏️✏️✏️✏️✏️",
        animationType: 'emoji',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Great! There are 9 pencils in the box. Ready to write! ✏️",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count8",
        question: "How many balloons are floating in the sky?",
        animation: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        animationType: 'emoji',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Awesome! 10 balloons are floating up high! 🎈",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count9",
        question: "Count the number of stars in the sky!",
        animation: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["10", "11", "12", "9"],
        correctAnswer: 0,
        explanation: "Perfect! There are 10 stars shining bright! ⭐",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count10",
        question: "How many dogs are playing in the park?",
        animation: "🐶🐶🐶🐶🐶🐶🐶🐶",
        animationType: 'emoji',
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        explanation: "Great! 8 dogs are happily playing! 🐶",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count11",
        question: "Count the number of books on the shelf!",
        animation: "📚📚📚📚📚📚📚📚📚",
        animationType: 'emoji',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Excellent! There are 9 books on the shelf. 📚",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count12",
        question: "How many stars are in the constellation?",
        animation: "⭐⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["7", "8", "9", "6"],
        correctAnswer: 0,
        explanation: "Correct! There are 7 stars in the constellation. ⭐",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count13",
        question: "Count the number of flowers in the garden!",
        animation: "🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸",
        animationType: 'emoji',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Beautiful! There are 10 flowers blooming! 🌸",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count14",
        question: "How many cars are on the road?",
        animation: "🚗🚗🚗🚗🚗🚗🚗🚗",
        animationType: 'emoji',
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        explanation: "Great! 8 cars are driving on the road! 🚗",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count15",
        question: "Count the number of stars in the sky!",
        animation: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["9", "10", "11", "8"],
        correctAnswer: 0,
        explanation: "Correct! There are 9 stars shining bright! ⭐",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count16",
        question: "How many apples are in the basket?",
        animation: "🍎🍎🍎🍎🍎🍎🍎🍎🍎",
        animationType: 'emoji',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Perfect! There are 9 apples in the basket. 🍎",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count17",
        question: "Count the number of balloons at the party!",
        animation: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        animationType: 'emoji',
        options: ["10", "11", "12", "9"],
        correctAnswer: 1,
        explanation: "Awesome! 11 balloons are floating at the party! 🎈",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count18",
        question: "How many stars are in the sky tonight?",
        animation: "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        animationType: 'emoji',
        options: ["11", "12", "13", "10"],
        correctAnswer: 0,
        explanation: "Great! There are 11 stars shining tonight! ⭐",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count19",
        question: "Count the number of fish swimming in the pond!",
        animation: "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
        animationType: 'emoji',
        options: ["10", "11", "12", "9"],
        correctAnswer: 0,
        explanation: "Correct! There are 11 fish swimming happily! 🐟",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "count20",
        question: "Count all the fish swimming in the ocean!",
        animation: "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
        animationType: 'emoji',
        options: ["14", "15", "16", "13"],
        correctAnswer: 1,
        explanation: "Fantastic! There are 15 fish swimming happily! You're a counting champion! 🐟",
        coins: 20,
        difficulty: 'medium'
      }
    ],

    // GRADE 1 - ADDITION (20 questions)
    "1-addition": [
      {
        id: "add1",
        question: "You have some red apples and get more. How many apples total?",
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
        question: "Birds are sitting on a tree and more birds join them. How many birds now?",
        animation: "🐦🐦🐦🐦 sitting... 🐦🐦🐦 flying in... 🐦🐦🐦🐦🐦🐦🐦",
        animationType: 'visual',
        options: ["6", "7", "8", "9"],
        correctAnswer: 1,
        explanation: "Perfect! 4 birds + 3 birds = 7 birds singing together! 🎵",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add3",
        question: "You collect toys. First you have some, then you get more!",
        animation: "🧸🧸 + 🧸🧸🧸🧸 = ?",
        animationType: 'visual',
        options: ["5", "6", "7", "4"],
        correctAnswer: 1,
        explanation: "Amazing! 2 toys + 4 toys = 6 toys! What a great collection! 🎉",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add4",
        question: "Flowers bloom in your garden. Count all the beautiful flowers!",
        animation: "🌸🌸🌸 + 🌸🌸🌸🌸🌸 = ?",
        animationType: 'visual',
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        explanation: "Wonderful! 3 flowers + 5 flowers = 8 flowers! Your garden is beautiful! 🌸",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add5",
        question: "Cars are parked and more cars arrive. How many cars in total?",
        animation: "🚗🚗🚗🚗🚗 + 🚗🚗 = ?",
        animationType: 'visual',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Excellent! 5 cars + 2 cars = 7 cars! That's a busy parking lot! 🚗",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add6",
        question: "Count the balloons at the party after more arrive!",
        animation: "🎈🎈🎈🎈 + 🎈🎈🎈🎈🎈🎈 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Fantastic! 4 balloons + 6 balloons = 10 balloons! What a festive party! 🎈",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add7",
        question: "Puppies play in the park and more puppies join them!",
        animation: "🐶🐶 + 🐶🐶🐶 = ?",
        animationType: 'visual',
        options: ["4", "5", "6", "3"],
        correctAnswer: 1,
        explanation: "Super! 2 puppies + 3 puppies = 5 puppies playing together! So cute! 🐶",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add8",
        question: "Books on the shelf plus new books. How many books total?",
        animation: "📚📚📚📚📚📚 + 📚📚📚 = ?",
        animationType: 'visual',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Great! 6 books + 3 books = 9 books! You have a wonderful library! 📚",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add9",
        question: "Cookies in the jar plus fresh baked cookies!",
        animation: "🍪🍪🍪 + 🍪🍪🍪🍪 = ?",
        animationType: 'visual',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Yummy! 3 cookies + 4 cookies = 7 cookies! Perfect for snack time! 🍪",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add10",
        question: "Soccer balls on the field plus more soccer balls!",
        animation: "⚽⚽⚽⚽ + ⚽⚽⚽⚽⚽ = ?",
        animationType: 'visual',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Awesome! 4 soccer balls + 5 soccer balls = 9 soccer balls! Ready to play! ⚽",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add11",
        question: "Ice cream cones at the shop plus new ones made!",
        animation: "🍦🍦🍦🍦🍦 + 🍦🍦🍦🍦 = ?",
        animationType: 'visual',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Delicious! 5 ice creams + 4 ice creams = 9 ice creams! So many flavors! 🍦",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add12",
        question: "Pencils in your case plus new pencils from the store!",
        animation: "✏️✏️✏️ + ✏️✏️✏️✏️✏️✏️ = ?",
        animationType: 'visual',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Perfect! 3 pencils + 6 pencils = 9 pencils! Ready for school! ✏️",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add13",
        question: "Ducks swimming in the pond plus more ducks arriving!",
        animation: "🦆🦆🦆🦆🦆🦆 + 🦆🦆🦆🦆 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Wonderful! 6 ducks + 4 ducks = 10 ducks! What a happy pond! 🦆",
        coins: 20,
        difficulty: 'medium'
      },
      {
        id: "add14",
        question: "Cupcakes on the table plus freshly baked cupcakes!",
        animation: "🧁🧁 + 🧁🧁🧁🧁🧁🧁🧁 = ?",
        animationType: 'visual',
        options: ["8", "9", "10", "7"],
        correctAnswer: 1,
        explanation: "Sweet! 2 cupcakes + 7 cupcakes = 9 cupcakes! Perfect for a party! 🧁",
        coins: 15,
        difficulty: 'medium'
      },
      {
        id: "add15",
        question: "Robots in the toy box plus new robot friends!",
        animation: "🤖🤖🤖🤖 + 🤖🤖🤖🤖🤖🤖 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Fantastic! 4 robots + 6 robots = 10 robots! An amazing robot army! 🤖",
        coins: 20,
        difficulty: 'medium'
      },
      {
        id: "add16",
        question: "Elephants at the zoo plus elephants from another area!",
        animation: "🐘🐘🐘 + 🐘🐘🐘🐘🐘 = ?",
        animationType: 'visual',
        options: ["7", "8", "9", "6"],
        correctAnswer: 1,
        explanation: "Excellent! 3 elephants + 5 elephants = 8 elephants! So majestic! 🐘",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add17",
        question: "Rockets ready for launch plus more rockets arriving!",
        animation: "🚀🚀🚀🚀🚀 + 🚀🚀🚀🚀🚀 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Amazing! 5 rockets + 5 rockets = 10 rockets! Ready for space adventure! 🚀",
        coins: 20,
        difficulty: 'medium'
      },
      {
        id: "add18",
        question: "Musical notes playing plus new notes joining the song!",
        animation: "🎵🎵🎵🎵 + 🎵🎵🎵 = ?",
        animationType: 'visual',
        options: ["6", "7", "8", "5"],
        correctAnswer: 1,
        explanation: "Beautiful! 4 notes + 3 notes = 7 notes! What a lovely melody! 🎵",
        coins: 15,
        difficulty: 'easy'
      },
      {
        id: "add19",
        question: "Gems in the treasure chest plus newly discovered gems!",
        animation: "💎💎💎💎💎💎 + 💎💎💎💎 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Treasure! 6 gems + 4 gems = 10 gems! You're rich in math skills! 💎",
        coins: 20,
        difficulty: 'medium'
      },
      {
        id: "add20",
        question: "Pizza slices on the plate plus more delicious slices!",
        animation: "🍕🍕🍕 + 🍕🍕🍕🍕🍕🍕🍕 = ?",
        animationType: 'visual',
        options: ["9", "10", "11", "8"],
        correctAnswer: 1,
        explanation: "Delicious! 3 pizza slices + 7 pizza slices = 10 pizza slices! Pizza party time! 🍕",
        coins: 20,
        difficulty: 'medium'
      }
    ],

    // GRADE 3 - MULTIPLICATION (20 complete questions)
    "3-multiplication": [
      {
        id: "mult1",
        question: "You have groups of apples. How many apples in total?",
        animation: "3 groups × 4 apples each = 🍎🍎🍎🍎 | 🍎🍎🍎🍎 | 🍎🍎🍎🍎",
        animationType: 'visual',
        options: ["10", "12", "14", "16"],
        correctAnswer: 1,
        explanation: "Perfect! 3 × 4 = 12 apples. Multiplication means groups of the same amount! 🍎",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult2",
        question: "How many wheels on these cars?",
        animation: "5 cars × 4 wheels each = 🚗 🚗 🚗 🚗 🚗 (each car has 4 wheels)",
        animationType: 'visual',
        options: ["18", "20", "22", "16"],
        correctAnswer: 1,
        explanation: "Excellent! 5 × 4 = 20 wheels. Each car has 4 wheels! 🚗",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult3",
        question: "How many legs do these spiders have in total?",
        animation: "3 spiders × 8 legs each = 🕷️ 🕷️ 🕷️",
        animationType: 'visual',
        options: ["21", "24", "27", "18"],
        correctAnswer: 1,
        explanation: "Amazing! 3 × 8 = 24 legs. Spiders have 8 legs each! 🕷️",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult4",
        question: "How many eyes do these monsters have?",
        animation: "4 monsters × 3 eyes each = 👹 👹 👹 👹",
        animationType: 'visual',
        options: ["10", "12", "14", "9"],
        correctAnswer: 1,
        explanation: "Fantastic! 4 × 3 = 12 eyes. These monsters are watching everything! 👹",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult5",
        question: "How many fingers on these hands?",
        animation: "6 hands × 5 fingers each = ✋ ✋ ✋ ✋ ✋ ✋",
        animationType: 'visual',
        options: ["25", "30", "35", "20"],
        correctAnswer: 1,
        explanation: "Perfect! 6 × 5 = 30 fingers. Each hand has 5 fingers! ✋",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult6",
        question: "How many slices of pizza in total?",
        animation: "4 pizzas × 8 slices each = 🍕 🍕 🍕 🍕",
        animationType: 'visual',
        options: ["28", "32", "36", "24"],
        correctAnswer: 1,
        explanation: "Delicious! 4 × 8 = 32 slices. That's a lot of pizza! 🍕",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult7",
        question: "How many petals on these flowers?",
        animation: "5 flowers × 6 petals each = 🌸 🌸 🌸 🌸 🌸",
        animationType: 'visual',
        options: ["25", "30", "35", "28"],
        correctAnswer: 1,
        explanation: "Beautiful! 5 × 6 = 30 petals. Such lovely flowers! 🌸",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult8",
        question: "How many windows on these buildings?",
        animation: "3 buildings × 9 windows each = 🏢 🏢 🏢",
        animationType: 'visual',
        options: ["24", "27", "30", "21"],
        correctAnswer: 1,
        explanation: "Great! 3 × 9 = 27 windows. Tall buildings with lots of light! 🏢",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult9",
        question: "How many seats in these rows?",
        animation: "7 rows × 4 seats each = Row arrangements shown",
        animationType: 'visual',
        options: ["24", "28", "32", "26"],
        correctAnswer: 1,
        explanation: "Perfect! 7 × 4 = 28 seats. Everyone can sit down! 💺",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult10",
        question: "How many stars in these constellations?",
        animation: "6 constellations × 5 stars each = ⭐ groups in the sky",
        animationType: 'visual',
        options: ["25", "30", "35", "28"],
        correctAnswer: 1,
        explanation: "Stellar! 6 × 5 = 30 stars. Beautiful night sky! ⭐",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult11",
        question: "How many eggs in these cartons?",
        animation: "4 cartons × 12 eggs each = 🥚 carton display",
        animationType: 'visual',
        options: ["44", "48", "52", "40"],
        correctAnswer: 1,
        explanation: "Excellent! 4 × 12 = 48 eggs. That's a lot of breakfast! 🥚",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult12",
        question: "How many crayons in these boxes?",
        animation: "5 boxes × 8 crayons each = 🖍️ colorful display",
        animationType: 'visual',
        options: ["35", "40", "45", "38"],
        correctAnswer: 1,
        explanation: "Colorful! 5 × 8 = 40 crayons. So many colors to choose from! 🖍️",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult13",
        question: "How many books on these shelves?",
        animation: "6 shelves × 7 books each = 📚 library display",
        animationType: 'visual',
        options: ["40", "42", "44", "38"],
        correctAnswer: 1,
        explanation: "Wonderful! 6 × 7 = 42 books. What a great library! 📚",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult14",
        question: "How many cookies on these trays?",
        animation: "8 trays × 6 cookies each = 🍪 bakery display",
        animationType: 'visual',
        options: ["44", "48", "52", "46"],
        correctAnswer: 1,
        explanation: "Sweet! 8 × 6 = 48 cookies. The bakery is full! 🍪",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult15",
        question: "How many buttons on these shirts?",
        animation: "9 shirts × 5 buttons each = 👔 clothing display",
        animationType: 'visual',
        options: ["40", "45", "50", "42"],
        correctAnswer: 1,
        explanation: "Fashionable! 9 × 5 = 45 buttons. Very stylish shirts! 👔",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult16",
        question: "How many pencils in these cases?",
        animation: "7 cases × 8 pencils each = ✏️ school supply display",
        animationType: 'visual',
        options: ["52", "56", "60", "48"],
        correctAnswer: 1,
        explanation: "Academic! 7 × 8 = 56 pencils. Ready for lots of writing! ✏️",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult17",
        question: "How many balloons in these bunches?",
        animation: "6 bunches × 9 balloons each = 🎈 party display",
        animationType: 'visual',
        options: ["50", "54", "58", "52"],
        correctAnswer: 1,
        explanation: "Festive! 6 × 9 = 54 balloons. What a celebration! 🎈",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult18",
        question: "How many candles on these cakes?",
        animation: "4 cakes × 10 candles each = 🎂 birthday display",
        animationType: 'visual',
        options: ["35", "40", "45", "38"],
        correctAnswer: 1,
        explanation: "Happy Birthday! 4 × 10 = 40 candles. So many wishes! 🎂",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "mult19",
        question: "How many marbles in these bags?",
        animation: "8 bags × 7 marbles each = Colorful marble display",
        animationType: 'visual',
        options: ["52", "56", "60", "48"],
        correctAnswer: 1,
        explanation: "Marvelous! 8 × 7 = 56 marbles. Great for games! 🔮",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "mult20",
        question: "How many stickers in these packs?",
        animation: "9 packs × 6 stickers each = ⭐ sticker collection",
        animationType: 'visual',
        options: ["50", "54", "58", "52"],
        correctAnswer: 1,
        explanation: "Sticky success! 9 × 6 = 54 stickers. Perfect for decorating! ⭐",
        coins: 30,
        difficulty: 'hard'
      }
    ],

    // GRADE 4 - ADVANCED GEOMETRY (20 complete questions)
    "4-advanced-geometry": [
      {
        id: "geo1",
        question: "What is the perimeter of this rectangle?",
        animation: "Rectangle: Length = 8 units, Width = 5 units",
        animationType: 'visual',
        options: ["24 units", "26 units", "28 units", "22 units"],
        correctAnswer: 1,
        explanation: "Perfect! Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 units! 📏",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo2",
        question: "What is the area of this square?",
        animation: "Square: Each side = 7 units",
        animationType: 'visual',
        options: ["42 square units", "49 square units", "56 square units", "35 square units"],
        correctAnswer: 1,
        explanation: "Excellent! Area of square = side × side = 7 × 7 = 49 square units! 🟦",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo3",
        question: "How many sides does a hexagon have?",
        animation: "⬡ Hexagon shape rotating with sides highlighted",
        animationType: 'visual',
        options: ["5 sides", "6 sides", "7 sides", "8 sides"],
        correctAnswer: 1,
        explanation: "Great! A hexagon has 6 sides. Think of a beehive cell! 🐝",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo4",
        question: "What type of angle is shown here?",
        animation: "90° angle displayed with two perpendicular lines",
        animationType: 'visual',
        options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
        correctAnswer: 1,
        explanation: "Perfect! A 90° angle is called a right angle. It looks like the corner of a square! 📐",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo5",
        question: "What is the area of this triangle?",
        animation: "Triangle: Base = 10 units, Height = 6 units",
        animationType: 'visual',
        options: ["25 square units", "30 square units", "35 square units", "20 square units"],
        correctAnswer: 1,
        explanation: "Amazing! Area of triangle = (base × height) ÷ 2 = (10 × 6) ÷ 2 = 30 square units! 🔺",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "geo6",
        question: "How many vertices does a cube have?",
        animation: "🧊 3D cube rotating showing all corners",
        animationType: 'visual',
        options: ["6 vertices", "8 vertices", "10 vertices", "12 vertices"],
        correctAnswer: 1,
        explanation: "Fantastic! A cube has 8 vertices (corners). Count them carefully! 🧊",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo7",
        question: "What is the perimeter of this triangle?",
        animation: "Triangle with sides: 5 units, 7 units, 9 units",
        animationType: 'visual',
        options: ["19 units", "21 units", "23 units", "17 units"],
        correctAnswer: 1,
        explanation: "Great! Perimeter = sum of all sides = 5 + 7 + 9 = 21 units! 🔺",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo8",
        question: "How many faces does a rectangular prism have?",
        animation: "📦 3D rectangular prism showing all faces",
        animationType: 'visual',
        options: ["4 faces", "6 faces", "8 faces", "10 faces"],
        correctAnswer: 1,
        explanation: "Excellent! A rectangular prism has 6 faces. Like a box! 📦",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo9",
        question: "What type of triangle has all equal sides?",
        animation: "🔺 Equilateral triangle with all sides marked equal",
        animationType: 'visual',
        options: ["Scalene", "Equilateral", "Isosceles", "Right"],
        correctAnswer: 1,
        explanation: "Perfect! An equilateral triangle has all three sides equal! 🔺",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo10",
        question: "What is the area of this rectangle?",
        animation: "Rectangle: Length = 12 units, Width = 4 units",
        animationType: 'visual',
        options: ["44 square units", "48 square units", "52 square units", "40 square units"],
        correctAnswer: 1,
        explanation: "Wonderful! Area = length × width = 12 × 4 = 48 square units! 📏",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo11",
        question: "How many edges does a triangular pyramid have?",
        animation: "Triangular pyramid (tetrahedron) showing edges",
        animationType: 'visual',
        options: ["5 edges", "6 edges", "7 edges", "8 edges"],
        correctAnswer: 1,
        explanation: "Amazing! A triangular pyramid has 6 edges. Count them all! 🔺",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "geo12",
        question: "What type of angle is greater than 90° but less than 180°?",
        animation: "120° obtuse angle displayed",
        animationType: 'visual',
        options: ["Acute angle", "Obtuse angle", "Right angle", "Straight angle"],
        correctAnswer: 1,
        explanation: "Great! An obtuse angle is between 90° and 180°! 📐",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo13",
        question: "What is the circumference formula for a circle?",
        animation: "⭕ Circle with radius and circumference highlighted",
        animationType: 'visual',
        options: ["π × radius", "2 × π × radius", "π × diameter", "Both B and C"],
        correctAnswer: 3,
        explanation: "Excellent! Circumference = 2πr or πd (both are correct)! ⭕",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "geo14",
        question: "How many parallel sides does a trapezoid have?",
        animation: "Trapezoid shape with parallel sides highlighted",
        animationType: 'visual',
        options: ["1 pair", "2 pairs", "3 pairs", "No parallel sides"],
        correctAnswer: 0,
        explanation: "Perfect! A trapezoid has exactly 1 pair of parallel sides! 🔷",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo15",
        question: "What is the volume formula for a rectangular prism?",
        animation: "📦 3D box showing length, width, and height",
        animationType: 'visual',
        options: ["l + w + h", "l × w × h", "2(l + w + h)", "l × w"],
        correctAnswer: 1,
        explanation: "Fantastic! Volume = length × width × height! 📦",
        coins: 30,
        difficulty: 'hard'
      },
      {
        id: "geo16",
        question: "How many diagonals does a rectangle have?",
        animation: "Rectangle with diagonals drawn",
        animationType: 'visual',
        options: ["1 diagonal", "2 diagonals", "3 diagonals", "4 diagonals"],
        correctAnswer: 1,
        explanation: "Great! A rectangle has 2 diagonals that intersect! 📏",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo17",
        question: "What is the sum of angles in any triangle?",
        animation: "🔺 Triangle with three angles marked",
        animationType: 'visual',
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation: "Perfect! The sum of angles in any triangle is always 180°! 🔺",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo18",
        question: "How many lines of symmetry does a square have?",
        animation: "🟦 Square showing all lines of symmetry",
        animationType: 'visual',
        options: ["2 lines", "4 lines", "6 lines", "8 lines"],
        correctAnswer: 1,
        explanation: "Excellent! A square has 4 lines of symmetry! 🟦",
        coins: 28,
        difficulty: 'hard'
      },
      {
        id: "geo19",
        question: "What shape has 5 sides?",
        animation: "Pentagon shape with sides counted",
        animationType: 'visual',
        options: ["Hexagon", "Pentagon", "Octagon", "Heptagon"],
        correctAnswer: 1,
        explanation: "Great! A pentagon has exactly 5 sides! 🏠",
        coins: 25,
        difficulty: 'medium'
      },
      {
        id: "geo20",
        question: "What is the area of a circle with radius 3 units?",
        animation: "⭕ Circle with radius = 3 units marked",
        animationType: 'visual',
        options: ["6π square units", "9π square units", "12π square units", "18π square units"],
        correctAnswer: 1,
        explanation: "Amazing! Area = π × r² = π × 3² = 9π square units! ⭕",
        coins: 32,
        difficulty: 'hard'
      }
    ],

    // GRADE 5 - ADVANCED PROBABILITY (20 complete questions)
    "5-advanced-probability": [
      {
        id: "prob1",
        question: "What's the probability of rolling a 6 on a fair die?",
        animation: "🎲 Die showing all 6 faces, highlighting the 6",
        animationType: 'visual',
        options: ["1/5", "1/6", "1/4", "2/6"],
        correctAnswer: 1,
        explanation: "Perfect! There's 1 six out of 6 possible outcomes, so P(6) = 1/6! 🎲",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob2",
        question: "A bag has 4 red and 6 blue marbles. What's P(red)?",
        animation: "Bag with 🔴🔴🔴🔴🔵🔵🔵🔵🔵🔵 → 4 red out of 10 total",
        animationType: 'visual',
        options: ["4/10", "6/10", "4/6", "10/4"],
        correctAnswer: 0,
        explanation: "Excellent! 4 red marbles out of 10 total = 4/10 = 2/5 probability! 🔴",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob3",
        question: "What's the probability of flipping heads on a fair coin?",
        animation: "🪙 Coin flipping showing both sides",
        animationType: 'visual',
        options: ["1/3", "1/2", "2/3", "1/4"],
        correctAnswer: 1,
        explanation: "Great! A coin has 2 sides, heads is 1 of them, so P(heads) = 1/2! 🪙",
        coins: 30,
        difficulty: 'medium'
      },
      {
        id: "prob4",
        question: "A spinner has 8 equal sections: 3 green, 3 yellow, 2 red. What's P(green)?",
        animation: "🎯 Spinner showing 8 sections with colors marked",
        animationType: 'visual',
        options: ["3/8", "3/5", "5/8", "2/8"],
        correctAnswer: 0,
        explanation: "Fantastic! 3 green sections out of 8 total = 3/8 probability! 🎯",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob5",
        question: "What's the probability of NOT rolling a 1 on a die?",
        animation: "🎲 Die showing faces 2,3,4,5,6 highlighted",
        animationType: 'visual',
        options: ["1/6", "5/6", "2/6", "4/6"],
        correctAnswer: 1,
        explanation: "Perfect! 5 faces are not 1 (faces 2,3,4,5,6) out of 6 total = 5/6! 🎲",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob6",
        question: "A deck has 10 cards: 4 aces, 6 others. What's P(ace)?",
        animation: "🃏 Cards showing 4 aces out of 10 total cards",
        animationType: 'visual',
        options: ["4/10", "6/10", "4/6", "10/4"],
        correctAnswer: 0,
        explanation: "Excellent! 4 aces out of 10 cards = 4/10 = 2/5 probability! 🃏",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob7",
        question: "What's the probability of getting an even number on a die?",
        animation: "🎲 Die showing even numbers 2, 4, 6 highlighted",
        animationType: 'visual',
        options: ["1/2", "1/3", "2/3", "1/6"],
        correctAnswer: 0,
        explanation: "Great! Even numbers are 2,4,6 - that's 3 out of 6 = 3/6 = 1/2! 🎲",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob8",
        question: "A jar has 5 red, 3 blue, 2 green candies. What's P(blue)?",
        animation: "🍬 Jar showing 5🔴 + 3🔵 + 2🟢 = 10 total candies",
        animationType: 'visual',
        options: ["3/10", "3/8", "7/10", "3/5"],
        correctAnswer: 0,
        explanation: "Sweet! 3 blue candies out of 10 total = 3/10 probability! 🍬",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob9",
        question: "What's the probability of drawing a vowel from letters A,B,C,D,E?",
        animation: "📝 Letters A,B,C,D,E with vowels A,E highlighted",
        animationType: 'visual',
        options: ["2/5", "3/5", "1/5", "4/5"],
        correctAnswer: 0,
        explanation: "Perfect! Vowels A,E are 2 out of 5 letters = 2/5 probability! 📝",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob10",
        question: "A box has 12 balls: 4 red, 4 blue, 4 yellow. What's P(not red)?",
        animation: "📦 Box showing 4🔴 + 4🔵 + 4🟡, highlighting non-red balls",
        animationType: 'visual',
        options: ["8/12", "4/12", "4/8", "12/8"],
        correctAnswer: 0,
        explanation: "Excellent! 8 non-red balls (4 blue + 4 yellow) out of 12 = 8/12 = 2/3! 📦",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob11",
        question: "What's the probability of rolling a number less than 4 on a die?",
        animation: "🎲 Die showing numbers 1, 2, 3 highlighted",
        animationType: 'visual',
        options: ["1/2", "1/3", "2/3", "3/6"],
        correctAnswer: 0,
        explanation: "Great! Numbers 1,2,3 are less than 4 - that's 3 out of 6 = 3/6 = 1/2! 🎲",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob12",
        question: "A wheel has 10 sections: 6 win, 4 lose. What's P(win)?",
        animation: "🎡 Wheel showing 6 WIN sections and 4 LOSE sections",
        animationType: 'visual',
        options: ["6/10", "4/10", "6/4", "10/6"],
        correctAnswer: 0,
        explanation: "Fantastic! 6 winning sections out of 10 total = 6/10 = 3/5 probability! 🎡",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob13",
        question: "What's the probability of picking a prime number from {1,2,3,4,5,6}?",
        animation: "🔢 Numbers 1,2,3,4,5,6 with primes 2,3,5 highlighted",
        animationType: 'visual',
        options: ["1/2", "3/6", "2/6", "4/6"],
        correctAnswer: 1,
        explanation: "Perfect! Prime numbers 2,3,5 are 3 out of 6 numbers = 3/6 = 1/2! 🔢",
        coins: 38,
        difficulty: 'hard'
      },
      {
        id: "prob14",
        question: "A bag has equal amounts of 4 colors. What's P(green)?",
        animation: "👜 Bag with equal amounts of 🔴🔵🟢🟡",
        animationType: 'visual',
        options: ["1/4", "1/3", "2/4", "3/4"],
        correctAnswer: 0,
        explanation: "Excellent! With 4 equal colors, each has probability 1/4! 👜",
        coins: 30,
        difficulty: 'medium'
      },
      {
        id: "prob15",
        question: "What's the probability of getting tails twice in two coin flips?",
        animation: "🪙🪙 Two coins showing all possible outcomes",
        animationType: 'visual',
        options: ["1/4", "1/2", "2/4", "3/4"],
        correctAnswer: 0,
        explanation: "Amazing! TT is 1 outcome out of 4 possible (HH,HT,TH,TT) = 1/4! 🪙",
        coins: 38,
        difficulty: 'hard'
      },
      {
        id: "prob16",
        question: "A spinner has numbers 1-8. What's P(multiple of 3)?",
        animation: "🎯 Spinner 1-8 with multiples of 3 (3,6) highlighted",
        animationType: 'visual',
        options: ["2/8", "3/8", "1/8", "4/8"],
        correctAnswer: 0,
        explanation: "Great! Multiples of 3 are 3,6 - that's 2 out of 8 = 2/8 = 1/4! 🎯",
        coins: 35,
        difficulty: 'hard'
      },
      {
        id: "prob17",
        question: "What's the probability of drawing 2 red cards from 2 red and 3 blue?",
        animation: "🃏 5 cards: 2🔴 + 3🔵, showing drawing 2 cards",
        animationType: 'visual',
        options: ["2/10", "1/10", "2/5", "4/25"],
        correctAnswer: 1,
        explanation: "Excellent! This is 2/5 × 1/4 = 2/20 = 1/10 probability! 🃏",
        coins: 40,
        difficulty: 'hard'
      },
      {
        id: "prob18",
        question: "A dice is rolled twice. What's P(sum equals 7)?",
        animation: "🎲🎲 Two dice showing combinations that sum to 7",
        animationType: 'visual',
        options: ["6/36", "5/36", "7/36", "8/36"],
        correctAnswer: 0,
        explanation: "Perfect! Ways to get 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6/36 = 1/6! 🎲",
        coins: 40,
        difficulty: 'hard'
      },
      {
        id: "prob19",
        question: "What's the probability of getting at least one head in 2 coin flips?",
        animation: "🪙🪙 Two coins showing HH,HT,TH,TT with heads highlighted",
        animationType: 'visual',
        options: ["3/4", "1/2", "1/4", "2/4"],
        correctAnswer: 0,
        explanation: "Fantastic! At least one head: HH,HT,TH = 3 out of 4 outcomes = 3/4! 🪙",
        coins: 38,
        difficulty: 'hard'
      },
      {
        id: "prob20",
        question: "A lottery has 100 tickets, you buy 5. What's P(you win) if 1 wins?",
        animation: "🎟️ 100 tickets with 5 highlighted as yours, 1 winning ticket",
        animationType: 'visual',
        options: ["5/100", "1/100", "5/95", "1/20"],
        correctAnswer: 0,
        explanation: "Excellent! You have 5 chances out of 100 total = 5/100 = 1/20! 🎟️",
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

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const currentQ = questions[currentQuestion];
  if (!currentQ || !userProgress) {
    return <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading your mathematical adventure...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      <LearnHeader 
        userProgress={userProgress}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        onBackToDashboard={handleBackToDashboard}
      />

      <div className="max-w-4xl mx-auto p-6">
        <QuestionDisplay 
          question={currentQ}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          grade={grade || ''}
          topic={topic || ''}
        />

        <AnswerOptions 
          question={currentQ}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
          onSubmitAnswer={handleSubmitAnswer}
        />

        <AnimatePresence>
          {showResult && (
            <ResultFeedback 
              isCorrect={isCorrect}
              explanation={currentQ.explanation}
              earnedCoins={earnedCoins}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              onNextQuestion={handleNextQuestion}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Learn;
