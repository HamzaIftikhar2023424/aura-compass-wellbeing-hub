
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// Array of coping tips
const copingTips = [
  "Deep breathing for 2 minutes can reduce your anxiety levels by up to 40%",
  "A regular sleep schedule can significantly improve your mood stability",
  "Spending 20 minutes in nature can lower stress hormone levels",
  "Writing down 3 things you're grateful for can boost your happiness",
  "Progressive muscle relaxation can help reduce physical tension",
  "Limiting social media use can improve your mental wellbeing",
  "Regular exercise releases endorphins that naturally elevate mood",
  "Mindfulness meditation can reduce symptoms of depression and anxiety",
  "Connecting with loved ones regularly improves overall mental health",
  "Helping others creates a sense of purpose and boosts your mood",
  "Creating small daily routines can provide stability during difficult times",
  "Listening to music can reduce stress and improve emotional wellbeing",
  "Saying positive affirmations can gradually change negative thought patterns",
  "Taking short breaks during work increases productivity and reduces burnout",
  "Laughter genuinely is good medicine - it reduces stress hormones",
  "Drinking water helps your brain function optimally",
  "Limiting caffeine can reduce anxiety symptoms",
  "Exposure to morning sunlight helps regulate your sleep cycle",
  "Setting boundaries is essential for mental wellbeing",
  "Journaling can help process difficult emotions"
];

// Emojis that pair well with coping tips
const emojis = ["😌", "🧘", "🌿", "🙏", "💆", "🌞", "🏃", "🧠", "❤️", "🤲", "📝", "🎵", "✨", "⏰", "😄", "💧", "🫖", "☀️", "🛡️", "📓"];

const DidYouKnowPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tip, setTip] = useState("");
  const [emoji, setEmoji] = useState("");
  
  // Function to get a random tip and emoji
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * copingTips.length);
    setTip(copingTips[randomIndex]);
    setEmoji(emojis[randomIndex % emojis.length]);
  };
  
  // Show popup on initial render and on page changes
  useEffect(() => {
    // Get initial random tip
    getRandomTip();
    
    // Show popup immediately
    setIsVisible(true);
    
    // Auto-hide after 6 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    
    // Set interval for showing the popup every 25 seconds
    const interval = setInterval(() => {
      getRandomTip();
      setIsVisible(true);
      
      // Auto-hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }, 25000);
    
    // Cleanup
    return () => {
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, []);
  
  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-6 right-6 max-w-xs z-50 animate-pop-in">
      <div className="glass-card p-4 pr-10 shadow-lg dark:bg-gray-800 dark:border-mentora-brightPink/30">
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-mentora-subtext hover:text-mentora-brightPink dark:text-white"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="flex items-start space-x-3">
          <span className="text-2xl animate-pulse-gentle">{emoji}</span>
          <div>
            <h4 className="font-bold text-sm text-mentora-brightPink mb-1 dark:text-mentora-brightPink">DID YOU KNOW</h4>
            <p className="text-sm text-mentora-text dark:text-white">{tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnowPopup;
