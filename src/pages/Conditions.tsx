
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { conditions } from "../data/conditions";
import { ArrowRight, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Conditions = () => {
  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>("description");
  
  const filteredConditions = searchQuery
    ? conditions.filter(condition => 
        condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conditions;
  
  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Do You Know Yourself?</h1>
          <p className="text-xl text-mentora-subtext max-w-3xl mx-auto text-center mb-10">
            Explore common mental health conditions to understand symptoms, causes, and effective coping strategies.
          </p>
          
          <div className="flex items-center justify-center mb-10">
            <div className="relative w-full max-w-md">
              <Input 
                type="text" 
                placeholder="Search conditions..." 
                className="pl-12 py-6 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
              />
              <Search className="absolute left-4 top-3 text-mentora-subtext" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <h3 className="font-bold text-lg mb-4 px-2">Mental Health Conditions</h3>
                <div className="space-y-1">
                  {filteredConditions.map((condition) => (
                    <Button
                      key={condition.id}
                      variant={condition.id === selectedCondition.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${
                        condition.id === selectedCondition.id 
                          ? "bg-mentora-brightPink/10 text-mentora-brightPink hover:bg-mentora-brightPink/20" 
                          : ""
                      }`}
                      onClick={() => setSelectedCondition(condition)}
                    >
                      {condition.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6">{selectedCondition.name}</h2>
                
                {/* Description Section */}
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center text-xl font-medium py-4 border-b"
                    onClick={() => toggleSection("description")}
                  >
                    <span>Description</span>
                    {activeSection === "description" ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                  
                  {activeSection === "description" && (
                    <div className="py-4 animate-fade-in">
                      <p className="text-mentora-subtext">{selectedCondition.description}</p>
                    </div>
                  )}
                </div>
                
                {/* Symptoms Section */}
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center text-xl font-medium py-4 border-b"
                    onClick={() => toggleSection("symptoms")}
                  >
                    <span>Common Symptoms</span>
                    {activeSection === "symptoms" ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                  
                  {activeSection === "symptoms" && (
                    <div className="py-4 animate-fade-in">
                      <ul className="list-disc pl-5 space-y-2 text-mentora-subtext">
                        {selectedCondition.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Causes Section */}
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center text-xl font-medium py-4 border-b"
                    onClick={() => toggleSection("causes")}
                  >
                    <span>Possible Causes</span>
                    {activeSection === "causes" ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                  
                  {activeSection === "causes" && (
                    <div className="py-4 animate-fade-in">
                      <ul className="list-disc pl-5 space-y-2 text-mentora-subtext">
                        {selectedCondition.causes.map((cause, index) => (
                          <li key={index}>{cause}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Behaviors Section */}
                <div className="mb-6">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center text-xl font-medium py-4 border-b"
                    onClick={() => toggleSection("behaviors")}
                  >
                    <span>Effect on Behavior</span>
                    {activeSection === "behaviors" ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                  
                  {activeSection === "behaviors" && (
                    <div className="py-4 animate-fade-in">
                      <ul className="list-disc pl-5 space-y-2 text-mentora-subtext">
                        {selectedCondition.behaviors.map((behavior, index) => (
                          <li key={index}>{behavior}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Coping Section */}
                <div className="mb-8">
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center text-xl font-medium py-4 border-b"
                    onClick={() => toggleSection("coping")}
                  >
                    <span>Coping Mechanisms</span>
                    {activeSection === "coping" ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                  
                  {activeSection === "coping" && (
                    <div className="py-4 animate-fade-in">
                      <ul className="list-disc pl-5 space-y-2 text-mentora-subtext">
                        {selectedCondition.coping.map((coping, index) => (
                          <li key={index}>{coping}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="text-center pt-4">
                  <Link to="/assessment">
                    <Button className="bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white">
                      Take Assessment <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conditions;
