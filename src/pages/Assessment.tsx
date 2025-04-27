import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, HelpCircle, Smile, Meh, Frown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  text: string;
  options: string[];
}

// Example general questionnaire
const generalQuestionnaire: Question[] = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you felt little interest or pleasure in doing things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    id: 2,
    text: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    id: 3,
    text: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    id: 4,
    text: "Over the last 2 weeks, how often have you been unable to stop or control worrying?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  },
  {
    id: 5,
    text: "Over the last 2 weeks, how often have you had trouble relaxing?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
  }
];

const Assessment = () => {
  const [step, setStep] = useState<"intro" | "userType" | "questionnaire" | "mood" | "results">("intro");
  const [userType, setUserType] = useState<"new" | "returning" | "">("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [moodLevel, setMoodLevel] = useState<number[]>([5]);
  const [results, setResults] = useState<Record<string, number>>({});
  
  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
    if (currentQuestion < generalQuestionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate mock results
      setResults({
        "Depression": 40,
        "Anxiety": 35,
        "PTSD": 15,
        "OCD": 10
      });
      setStep("mood");
    }
  };
  
  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
      <div className="w-20 h-20 bg-mentora-pink/20 rounded-full flex items-center justify-center mb-6">
        <HelpCircle className="h-10 w-10 text-mentora-brightPink" />
      </div>
      <h1 className="text-3xl font-bold mb-6">Mental Health Assessment</h1>
      <p className="text-mentora-subtext mb-8 text-lg">
        Our AI-powered assessment will help you understand your mental health needs and provide personalized recommendations.
      </p>
      <Button 
        onClick={() => setStep("userType")}
        className="bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white"
      >
        Start Assessment <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
  
  const renderUserTypeSelection = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Are you new or returning?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button
          variant={userType === "new" ? "default" : "outline"}
          className={`p-8 h-auto ${userType === "new" ? "border-mentora-brightPink" : ""}`}
          onClick={() => {
            setUserType("new");
            setStep("questionnaire");
          }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-mentora-pink/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-mentora-brightPink" />
            </div>
            <h3 className="text-lg font-medium mb-2">I'm New Here</h3>
            <p className="text-sm text-mentora-subtext">
              I'm taking this assessment for the first time.
            </p>
          </div>
        </Button>
        
        <Button
          variant={userType === "returning" ? "default" : "outline"}
          className={`p-8 h-auto ${userType === "returning" ? "border-mentora-brightPink" : ""}`}
          onClick={() => {
            setUserType("returning");
            setStep("questionnaire");
          }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-mentora-blue/20 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-mentora-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">I'm Returning</h3>
            <p className="text-sm text-mentora-subtext">
              I've taken this assessment before.
            </p>
          </div>
        </Button>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="ghost" onClick={() => setStep("intro")}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
      </div>
    </div>
  );
  
  const renderQuestionnaire = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-mentora-subtext">Question {currentQuestion + 1} of {generalQuestionnaire.length}</span>
          <span className="text-sm font-medium">{Math.round((currentQuestion + 1) / generalQuestionnaire.length * 100)}%</span>
        </div>
        <div className="w-full bg-cyan-100 dark:bg-cyan-900 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-2.5 rounded-full" 
            style={{ width: `${(currentQuestion + 1) / generalQuestionnaire.length * 100}%` }}
          ></div>
        </div>
      </div>
      
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{generalQuestionnaire[currentQuestion].text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generalQuestionnaire[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left p-4 h-auto ${
                  answers[generalQuestionnaire[currentQuestion].id] === index 
                    ? "border-mentora-brightPink bg-mentora-brightPink/5" 
                    : ""
                }`}
                onClick={() => handleAnswer(generalQuestionnaire[currentQuestion].id, index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="ghost" 
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1);
            } else {
              setStep("userType");
            }
          }}
        >
          <ArrowLeft className="mr-2" /> Previous
        </Button>
      </div>
    </div>
  );
  
  const renderMoodTracker = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">How are you feeling today?</h2>
      
      <Card className="border-none shadow-lg mb-8">
        <CardContent className="pt-6">
          <div className="mb-10 flex justify-between items-center">
            <Frown className="text-mentora-subtext h-8 w-8" />
            <Meh className="text-mentora-subtext h-8 w-8" />
            <Smile className="text-mentora-subtext h-8 w-8" />
          </div>
          
          <Slider
            defaultValue={moodLevel}
            max={10}
            step={1}
            onValueChange={setMoodLevel}
            className="mb-8"
          />
          
          <div className="text-center">
            <p className="text-lg mb-2">
              {moodLevel[0] <= 3 ? "I'm not feeling great today" : 
               moodLevel[0] <= 7 ? "I'm feeling okay today" : 
                "I'm feeling great today"}
            </p>
            <p className="text-mentora-subtext">
              Tracking your mood helps us provide better recommendations
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => setStep("results")}
          className="bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white"
        >
          Continue <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
  
  const renderResults = () => (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Assessment Results</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-medium mb-6">Potential Matches</h3>
        
        <div className="space-y-6">
          {Object.entries(results).map(([condition, percentage]) => (
            <div key={condition}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{condition}</span>
                <span className="text-mentora-subtext">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-mentora-pink to-mentora-brightPink h-2.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-mentora-blue/10 rounded-lg">
          <p className="text-mentora-subtext">
            <strong>Note:</strong> These results are preliminary and not a diagnosis. They're meant to guide you toward appropriate resources.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-medium mb-4">Recommended Next Steps</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-mentora-pink/20 flex items-center justify-center">
                <span className="text-mentora-brightPink text-sm">1</span>
              </div>
            </div>
            <span>Take our specific Depression questionnaire for more detailed insights</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-mentora-pink/20 flex items-center justify-center">
                <span className="text-mentora-brightPink text-sm">2</span>
              </div>
            </div>
            <span>Explore our therapy recommendations tailored to your needs</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-mentora-pink/20 flex items-center justify-center">
                <span className="text-mentora-brightPink text-sm">3</span>
              </div>
            </div>
            <span>Connect with our community for support from others with similar experiences</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          Take Depression Questionnaire
        </Button>
        
        <Button className="bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white">
          View Therapy Recommendations
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {step === "intro" && renderIntro()}
        {step === "userType" && renderUserTypeSelection()}
        {step === "questionnaire" && renderQuestionnaire()}
        {step === "mood" && renderMoodTracker()}
        {step === "results" && renderResults()}
      </div>
    </div>
  );
};

// Fix for missing components
import { User, UserCheck } from "lucide-react";

export default Assessment;
