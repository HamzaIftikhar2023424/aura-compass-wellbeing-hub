
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms of service and privacy policy.",
        variant: "destructive",
      });
      return;
    }
    
    // This would connect to backend in a real implementation
    console.log("Register with:", { name, email, password, anonymousMode });
    
    // For demo, show successful registration toast
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully!",
    });
    
    // Redirect would occur here in a real implementation
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-mentora-subtext">
            Join Mentora and start your wellbeing journey
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required={!anonymousMode}
                    disabled={anonymousMode}
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-mentora-subtext" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-mentora-subtext" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-mentora-subtext hover:text-mentora-brightPink"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="anonymous-mode" 
                  checked={anonymousMode} 
                  onCheckedChange={setAnonymousMode}
                />
                <Label htmlFor="anonymous-mode">Anonymous Mode</Label>
              </div>
              
              {anonymousMode && (
                <div className="rounded-md bg-mentora-blue/10 p-3">
                  <p className="text-sm text-mentora-subtext">
                    In anonymous mode, we'll minimize personal identifiers while still providing personalized support.
                  </p>
                </div>
              )}
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="agree-terms" 
                  checked={agreeTerms} 
                  onCheckedChange={setAgreeTerms}
                />
                <Label htmlFor="agree-terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-mentora-brightPink hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-mentora-brightPink hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white py-6"
            >
              Create Account
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-mentora-subtext">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-mentora-brightPink hover:text-mentora-pink">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
