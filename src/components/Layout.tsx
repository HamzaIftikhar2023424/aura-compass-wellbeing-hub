
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <DidYouKnowPopup />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
