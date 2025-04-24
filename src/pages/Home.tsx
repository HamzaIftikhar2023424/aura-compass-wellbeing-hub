
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Users, Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#2F2F2F]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white dark:bg-[#2F2F2F]">
        <div className="absolute inset-0 bg-gradient-to-br from-mentora-pink/20 via-mentora-blue/10 to-mentora-brightPink/10 dark:from-mentora-pink/10 dark:via-mentora-blue/5 dark:to-mentora-brightPink/5 -z-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2F2F2F] dark:text-white">
              Begin Your Journey to Mental Wellbeing
            </h1>
            <p className="text-lg md:text-xl text-[#6E7E91] dark:text-gray-300 mb-8">
              Mentora provides personalized mental health support, tools, and community to help you understand yourself better and navigate life's challenges.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/assessment">
                <Button className="text-lg py-6 px-8 bg-mentora-pink hover:bg-mentora-pink/90 text-white">
                  Take Assessment
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/conditions">
                <Button variant="outline" className="text-lg py-6 px-8 border-mentora-blue text-[#2F2F2F] hover:bg-mentora-blue/10 dark:text-white">
                  Do You Know Yourself?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-[#2F2F2F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[#2F2F2F] dark:text-white">How Mentora Helps You</h2>
            <p className="text-[#6E7E91] dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines expert knowledge, AI-powered tools, and community support to guide you through your mental health journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-[#403E43] border border-mentora-pink/20 dark:border-mentora-pink/10 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-mentora-pink/10 dark:bg-mentora-pink/20 rounded-full flex items-center justify-center">
                <Brain className="text-mentora-brightPink" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#2F2F2F] dark:text-white">Personalized Assessment</h3>
              <p className="text-[#6E7E91] dark:text-gray-300">
                Take our AI-powered questionnaires to understand your mental health needs and get tailored recommendations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#403E43] border border-mentora-blue/20 dark:border-mentora-blue/10 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-mentora-blue/10 dark:bg-mentora-blue/20 rounded-full flex items-center justify-center">
                <Heart className="text-mentora-blue" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#2F2F2F] dark:text-white">Guided Therapy</h3>
              <p className="text-[#6E7E91] dark:text-gray-300">
                Access evidence-based therapeutic techniques, exercises, and resources personalized to your needs.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#403E43] border border-mentora-brightPink/20 dark:border-mentora-brightPink/10 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-mentora-brightPink/10 dark:bg-mentora-brightPink/20 rounded-full flex items-center justify-center">
                <Users className="text-mentora-brightPink" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#2F2F2F] dark:text-white">Supportive Community</h3>
              <p className="text-[#6E7E91] dark:text-gray-300">
                Connect with others on similar journeys, share experiences, and receive peer support in a safe environment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#403E43] border border-mentora-pink/20 dark:border-mentora-pink/10 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-mentora-pink/10 dark:bg-mentora-pink/20 rounded-full flex items-center justify-center">
                <Shield className="text-mentora-blue" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#2F2F2F] dark:text-white">Privacy First</h3>
              <p className="text-[#6E7E91] dark:text-gray-300">
                Your mental health journey is private. We prioritize your data security and offer anonymous options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#403E43]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Stories from Our Community</h2>
            <p className="text-mentora-subtext dark:text-gray-300 max-w-2xl mx-auto">
              Hear from people who have found support and growth through Mentora.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#2F2F2F] p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-mentora-subtext dark:text-gray-300 mb-6 italic">
                "Mentora's assessment tool helped me understand my anxiety triggers in a way I never had before. The personalized coping strategies have made a real difference in my daily life."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-mentora-pink rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Sarah K.</h4>
                  <p className="text-sm text-mentora-subtext dark:text-gray-400">Using Mentora for 6 months</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#2F2F2F] p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-mentora-subtext dark:text-gray-300 mb-6 italic">
                "The community aspect of Mentora was unexpected but has become my favorite part. Being able to connect with others who truly understand what I'm going through has been invaluable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-mentora-blue rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Marcus T.</h4>
                  <p className="text-sm text-mentora-subtext dark:text-gray-400">Using Mentora for 1 year</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#2F2F2F] p-8 rounded-2xl shadow-md">
              <div className="mb-4">
                {"⭐⭐⭐⭐⭐"}
              </div>
              <p className="text-mentora-subtext dark:text-gray-300 mb-6 italic">
                "I was skeptical at first, but the therapy recommendations were spot on. The guided meditations and CBT exercises have helped me manage my depression in ways traditional therapy alone didn't."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-mentora-brightPink rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium dark:text-white">Jamie L.</h4>
                  <p className="text-sm text-mentora-subtext dark:text-gray-400">Using Mentora for 3 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mentora-blue/30 via-mentora-pink/20 to-mentora-brightPink/30 dark:from-mentora-blue/20 dark:via-mentora-pink/10 dark:to-mentora-brightPink/20 -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              Start Your Mental Health Journey Today
            </h2>
            <p className="text-lg text-mentora-subtext dark:text-gray-300 mb-8">
              Take the first step towards understanding and improving your mental wellbeing with Mentora's personalized approach.
            </p>
            <Link to="/register">
              <Button className="text-lg py-6 px-8 bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white shadow-lg">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
