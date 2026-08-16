import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import TargetMarketSection from "../components/landing/TargetMarketSection";
import ImpactStatsSection from "../components/landing/ImpactStatsSection";
import WhyUsSection from "../components/landing/WhyUsSection";
import SocialImpactSection from "../components/landing/SocialImpactSection";
import AboutSection from "../components/landing/AboutSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import NewsletterSection from "../components/landing/NewsletterSection";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
  const [userInitials, setUserInitials] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [impactStats, setImpactStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    activeUsers: 0,
    wasteCollected: 0,
  });
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    fetchUserInitials();
    fetchImpactStats();
  }, []);

  const fetchUserInitials = async () => {
    try {
      const response = await axios.get("/api/users/leaderboard?limit=5");
      const users = response.data.data.users;

      // Get initials from user names
      const initials = users.map((user) => {
        const names = user.name.split(" ");
        return names.map((n) => n[0].toUpperCase()).join("");
      });

      setUserInitials(initials);

      // Get total user count
      const statsResponse = await axios.get("/api/reports/stats/dashboard");
      setTotalUsers(statsResponse.data.data.stats.totalUsers || users.length);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      // Fallback to default initials
      setUserInitials(["S", "M", "A", "J", "K"]);
      setTotalUsers(12000);
    }
  };

  const fetchImpactStats = async () => {
    try {
      const statsResponse = await axios.get("/api/reports/stats/dashboard");
      const stats = statsResponse.data.data.stats;

      // Calculate waste collected, ensuring we have a valid number
      const totalReports = stats.totalReports || 1234;
      const wasteCollected = isNaN(totalReports)
        ? 2.5
        : (totalReports * 0.0021).toFixed(1);

      setImpactStats({
        totalReports: totalReports,
        resolvedReports: stats.resolvedReports || 856,
        activeUsers: stats.totalUsers || 2456,
        wasteCollected: wasteCollected,
      });
    } catch (error) {
      console.error("Failed to fetch impact stats:", error);
      // Fallback to default stats
      setImpactStats({
        totalReports: 1234,
        resolvedReports: 856,
        activeUsers: 2456,
        wasteCollected: 2.5,
      });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection
        authLoading={authLoading}
        isAuthenticated={isAuthenticated}
        userInitials={userInitials}
        totalUsers={totalUsers}
      />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TargetMarketSection />
      <ImpactStatsSection impactStats={impactStats} />
      <WhyUsSection />
      <SocialImpactSection impactStats={impactStats} />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection authLoading={authLoading} isAuthenticated={isAuthenticated} />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
