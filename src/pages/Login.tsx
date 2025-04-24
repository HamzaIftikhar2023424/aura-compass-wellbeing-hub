
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would connect to backend in a real implementation
    console.log("Login with:", { email, password, anonymousMode, rememberMe });
    
    // For demo, show successful login toast
    toast({
      title: "Login successful",
      description: anonymousMode ? "You've logged in anonymously" : `Welcome back, ${email.split('@')[0]}!`,
    });
    
    // Redirect would occur here in a real implementation
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-mentora-subtext">
            Sign in to your Mentora account
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                    disabled={anonymousMode}
                    required={!anonymousMode}
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-mentora-subtext" />
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

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link to="/forgot-password" className="text-sm font-medium text-mentora-brightPink hover:text-mentora-pink">
                  Forgot password?
                </Link>
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
                    In anonymous mode, we'll minimize data collection while still providing personalized support.
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-mentora-pink to-mentora-brightPink hover:opacity-90 text-white py-6"
            >
              Sign in
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-mentora-subtext">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-mentora-brightPink hover:text-mentora-pink">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
