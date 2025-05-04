
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(4);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive) {
      if (phase === 'inhale') {
        // 4 second inhale
        timer = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev + (100 / 16); // 4 seconds * 4 intervals per second = 16 intervals for 100%
            if (newProgress >= 100) {
              setPhase('hold');
              setCountdown(4);
              return 100;
            }
            return newProgress;
          });
          setCountdown((prev) => Math.max(prev - 0.25, 0));
        }, 250); // Update 4 times per second
      } else if (phase === 'hold') {
        // 4 second hold
        timer = setInterval(() => {
          setCountdown((prev) => {
            const newCount = Math.max(prev - 0.25, 0);
            if (newCount === 0) {
              setPhase('exhale');
              setCountdown(6);
            }
            return newCount;
          });
        }, 250);
      } else if (phase === 'exhale') {
        // 6 second exhale
        timer = setInterval(() => {
          setProgress((prev) => {
            const newProgress = prev - (100 / 24); // 6 seconds * 4 intervals per second = 24 intervals for 0%
            if (newProgress <= 0) {
              setPhase('inhale');
              setCountdown(4);
              return 0;
            }
            return newProgress;
          });
          setCountdown((prev) => Math.max(prev - 0.25, 0));
        }, 250);
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase]);
  
  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setProgress(0);
      setCountdown(4);
    }
  };
  
  return (
    <Card className="overflow-hidden border-mentora-teal/20">
      <CardHeader className="bg-mentora-teal/5">
        <CardTitle>Breathing Exercise</CardTitle>
        <CardDescription>
          Take a moment to practice deep breathing with the 4-4-6 technique
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <p className="text-2xl font-semibold mb-2">
                {phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
              </p>
              <p className="text-lg">{Math.ceil(countdown)} seconds</p>
            </div>
            
            <Progress value={progress} className="h-3 mb-4" />
            
            <div className="flex items-center justify-center mt-8">
              <Button 
                onClick={handleToggle} 
                className={`min-w-[120px] ${
                  isActive 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-mentora-teal hover:bg-mentora-teal/90 text-white"
                }`}
              >
                {isActive ? "Stop" : "Start"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="font-medium mb-2">How to practice:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-mentora-subtext">
            <li>Sit comfortably with your back straight</li>
            <li>Inhale deeply through your nose for 4 seconds</li>
            <li>Hold your breath for 4 seconds</li>
            <li>Exhale slowly through your mouth for 6 seconds</li>
            <li>Repeat the cycle several times</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
