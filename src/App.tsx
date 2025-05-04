
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import TherapySessions from "./pages/TherapySessions";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import TherapistDirectory from "./pages/TherapistDirectory";
import Feedback from "./pages/Feedback";
import Prescriptions from "./pages/Prescriptions";
import Chatroom from "./pages/Chatroom";
import GoalsAchievements from "./pages/GoalsAchievements";
import Motivational from "./pages/Motivational";
import PeerSupport from "./pages/PeerSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Layout><Dashboard /></Layout>
              </PrivateRoute>
            } />
            <Route path="/mood" element={
              <PrivateRoute>
                <Layout><MoodTracker /></Layout>
              </PrivateRoute>
            } />
            <Route path="/journal" element={
              <PrivateRoute>
                <Layout><Journal /></Layout>
              </PrivateRoute>
            } />
            <Route path="/therapy" element={
              <PrivateRoute>
                <Layout><TherapySessions /></Layout>
              </PrivateRoute>
            } />
            <Route path="/therapists" element={
              <PrivateRoute>
                <Layout><TherapistDirectory /></Layout>
              </PrivateRoute>
            } />
            <Route path="/feedback" element={
              <PrivateRoute>
                <Layout><Feedback /></Layout>
              </PrivateRoute>
            } />
            <Route path="/prescriptions" element={
              <PrivateRoute>
                <Layout><Prescriptions /></Layout>
              </PrivateRoute>
            } />
            <Route path="/chatroom" element={
              <PrivateRoute>
                <Layout><Chatroom /></Layout>
              </PrivateRoute>
            } />
            <Route path="/goals" element={
              <PrivateRoute>
                <Layout><GoalsAchievements /></Layout>
              </PrivateRoute>
            } />
            <Route path="/motivational" element={
              <PrivateRoute>
                <Layout><Motivational /></Layout>
              </PrivateRoute>
            } />
            <Route path="/peer-support" element={
              <PrivateRoute>
                <Layout><PeerSupport /></Layout>
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
