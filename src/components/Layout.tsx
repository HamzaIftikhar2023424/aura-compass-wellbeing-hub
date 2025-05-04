
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeProvider";
import DidYouKnowPopup from "./DidYouKnowPopup";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-500">
        <div className="fixed inset-0 bg-pattern-light dark:bg-pattern-dark pointer-events-none z-0 opacity-50"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-transparent via-mentora-teal/5 to-mentora-orange/5 dark:from-transparent dark:via-mentora-teal/5 dark:to-mentora-orange/10 pointer-events-none z-0"></div>
        <Header />
        <main className="flex-grow z-10 animate-fade-in">
          {children}
        </main>
        <Footer />
        <DidYouKnowPopup />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
