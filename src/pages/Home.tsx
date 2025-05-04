
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Users, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 -z-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Begin Your Journey to Mental Wellbeing
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Mentora provides personalized mental health support, tools, and community to help you understand yourself better and navigate life's challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button className="text-lg py-6 px-8 bg-cyan-500 hover:bg-cyan-600 text-white">
                    Go to Dashboard
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button className="text-lg py-6 px-8 bg-cyan-500 hover:bg-cyan-600 text-white">
                      Get Started
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="text-lg py-6 px-8 border-cyan-500 text-gray-800 hover:bg-cyan-50 dark:text-white dark:border-white dark:bg-white/10 dark:hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">How Mentora Helps You</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines expert knowledge, AI-powered tools, and community support to guide you through your mental health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 border border-cyan-200 dark:border-cyan-900/30 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                <Brain className="text-cyan-600 dark:text-cyan-400" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Track Your Moods</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use our mood tracking tools to identify patterns and understand your emotional responses.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-cyan-200 dark:border-cyan-900/30 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                <Heart className="text-cyan-600 dark:text-cyan-400" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Journal Your Thoughts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Express and process your thoughts through guided journaling exercises.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-cyan-200 dark:border-cyan-900/30 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                <Users className="text-cyan-600 dark:text-cyan-400" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Therapy Sessions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Document and track your therapy sessions to maximize benefits and monitor progress.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-cyan-200 dark:border-cyan-900/30 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                <Shield className="text-cyan-600 dark:text-cyan-400" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your mental health journey is private. We prioritize your data security with robust protections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Stories from Our Community</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from people who have found support and growth through Mentora.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "The mood tracking feature has been eye-opening. I never realized how my emotions followed patterns until I started logging them regularly."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cyan-400 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Sarah K.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Using Mentora for 6 months</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "I've been journaling for years, but the structured approach in Mentora has helped me gain new insights about myself and my thought patterns."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cyan-500 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Marcus T.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Using Mentora for 1 year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "Being able to document my therapy sessions has made a huge difference. I can review notes from past sessions before new appointments."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cyan-600 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Jamie L.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Using Mentora for 3 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-blue-100 to-cyan-100 dark:from-cyan-900/40 dark:via-blue-900/40 dark:to-cyan-900/40 -z-10 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              Start Your Mental Health Journey Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Take the first step towards understanding and improving your mental wellbeing with Mentora's personalized approach.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button className="text-lg py-6 px-8 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 text-white shadow-lg">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="text-lg py-6 px-8 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 text-white shadow-lg">
                  Create Your Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
