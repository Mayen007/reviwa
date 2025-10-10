import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  AnimateOnView,
} from "./MotionWrapper";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🌍",
      title: "Smart Waste Reporting",
      description:
        "Report waste issues instantly with photo evidence and precise location tracking.",
    },
    {
      icon: "🔍",
      title: "AI-Powered Verification",
      description:
        "Advanced AI analyzes reports for accuracy and prioritizes urgent environmental issues.",
    },
    {
      icon: "🤝",
      title: "Community Action",
      description:
        "Connect with local environmental groups and organize cleanup events in your area.",
    },
    {
      icon: "📊",
      title: "Impact Analytics",
      description:
        "Track your environmental contributions and see real-time community impact metrics.",
    },
    {
      icon: "🏆",
      title: "Green Rewards",
      description:
        "Earn green points for environmental actions and unlock exclusive sustainability perks.",
    },
    {
      icon: "🌱",
      title: "Sustainable Cities",
      description:
        "Help build UN SDG-aligned communities focused on responsible consumption and climate action.",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Waste Reports Submitted" },
    { value: "12,000+", label: "Community Members" },
    { value: "850+", label: "Cleanup Events Organized" },
    { value: "25+", label: "Cities Transformed" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Environmental Advocate",
      avatar: "S",
      quote:
        "Reviwa transformed how our community approaches waste management. We've organized 12 cleanup events this year!",
    },
    {
      name: "Marcus Williams",
      role: "City Sustainability Officer",
      avatar: "M",
      quote:
        "The AI-powered reporting system helps us prioritize environmental issues and allocate resources efficiently.",
    },
    {
      name: "Elena Rodriguez",
      role: "Green Community Leader",
      avatar: "E",
      quote:
        "I've earned over 2,000 green points while making a real impact in my neighborhood. It's addictive in the best way!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-accent-sand to-mist-gray">
      {/* Navigation */}
      <nav className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <FadeIn className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-xl text-white font-inter font-bold">
                  R
                </span>
              </div>
              <span className="text-2xl font-inter font-bold gradient-text">
                Reviwa
              </span>
            </FadeIn>

            <FadeIn
              delay={0.2}
              className="hidden md:flex items-center space-x-8"
            >
              <a
                href="#features"
                className="text-charcoal hover:text-primary transition-colors font-body"
              >
                Features
              </a>
              <a
                href="#impact"
                className="text-charcoal hover:text-primary transition-colors font-body"
              >
                Impact
              </a>
              <a
                href="#community"
                className="text-charcoal hover:text-primary transition-colors font-body"
              >
                Community
              </a>
            </FadeIn>

            <FadeIn delay={0.3} className="flex items-center space-x-4">
              <Link to="/login" className="btn-reviwa btn-ghost px-6 py-2">
                Sign In
              </Link>
              <Link to="/register" className="btn-reviwa btn-primary px-6 py-2">
                Join Movement
              </Link>
            </FadeIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-400">
        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-800/30 via-transparent to-green-400/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-700/20 via-transparent to-cyan-300/30"></div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-8 h-8 bg-white/20 rounded-full opacity-60 animate-float blur-sm"></div>
          <div
            className="absolute top-40 right-40 w-6 h-6 bg-white/15 rounded-full opacity-50 animate-float blur-sm"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-60 right-16 w-10 h-10 bg-white/10 rounded-full opacity-40 animate-float blur-sm"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 w-12 h-12 bg-emerald-200/30 rounded-full opacity-50 animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-60 left-40 w-8 h-8 bg-teal-300/40 rounded-full opacity-60 animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center px-4 py-2 bg-white/90 border border-white/50 rounded-full mb-6 backdrop-blur-sm">
                  <span className="text-slate-800 font-medium text-sm">
                    🌍 Building Sustainable Communities
                  </span>
                </div>
              </FadeIn>

              <SlideUp delay={0.2}>
                <h1 className="text-5xl lg:text-7xl font-inter font-bold mb-6 leading-tight">
                  <span className="text-slate-800">Clean Cities,</span>
                  <br />
                  <span className="text-gray-900">Clear Futures</span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.4}>
                <p className="text-xl text-slate-700 font-body mb-8 leading-relaxed max-w-lg">
                  Join thousands of environmental champions transforming
                  communities through smart waste reporting, collaborative
                  cleanups, and sustainable action.
                </p>
              </SlideUp>

              <SlideUp delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-none shadow-lg transition-all duration-300"
                  >
                    Join a Cleanup
                  </button>
                  <button
                    onClick={() => navigate("/report")}
                    className="bg-white hover:bg-gray-50 text-slate-800 border border-slate-200 px-8 py-4 text-lg font-semibold rounded-none shadow-lg transition-all duration-300"
                  >
                    Report Waste
                  </button>
                </div>
              </SlideUp>

              <SlideUp delay={0.8}>
                <div className="mt-12 flex items-center space-x-6">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">M</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 border-2 border-emerald-300 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 text-sm font-bold">
                        +
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-800 font-body font-medium">
                      Join 12,000+ members
                    </p>
                    <p className="text-slate-600 text-sm">
                      making cities cleaner every day
                    </p>
                  </div>
                </div>
              </SlideUp>
            </div>

            <AnimateOnView
              animation="slideUp"
              delay={0.3}
              className="relative lg:block hidden"
            >
              {/* Environmental Cleanup SVG Illustration */}
              <div className="w-full h-96 flex items-center justify-center">
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-full max-w-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient
                      id="skyGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#E6FFFA" />
                      <stop offset="100%" stopColor="#B2F5EA" />
                    </linearGradient>
                    <linearGradient
                      id="buildingGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2D3748" />
                      <stop offset="100%" stopColor="#1A202C" />
                    </linearGradient>
                    <linearGradient
                      id="personGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#38B2AC" />
                      <stop offset="100%" stopColor="#00B26F" />
                    </linearGradient>
                  </defs>
                  {/* Background */}
                  <rect width={600} height={400} fill="url(#skyGradient)" />
                  {/* City buildings silhouette */}
                  <rect
                    x={400}
                    y={200}
                    width={40}
                    height={120}
                    fill="url(#buildingGradient)"
                    rx={2}
                  />
                  <rect
                    x={450}
                    y={180}
                    width={50}
                    height={140}
                    fill="url(#buildingGradient)"
                    rx={2}
                  />
                  <rect
                    x={510}
                    y={220}
                    width={30}
                    height={100}
                    fill="url(#buildingGradient)"
                    rx={2}
                  />
                  <rect
                    x={550}
                    y={190}
                    width={45}
                    height={130}
                    fill="url(#buildingGradient)"
                    rx={2}
                  />
                  {/* Building windows */}
                  <rect
                    x={410}
                    y={220}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={425}
                    y={220}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={410}
                    y={240}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={425}
                    y={240}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={465}
                    y={200}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={480}
                    y={200}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={465}
                    y={220}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  <rect
                    x={480}
                    y={220}
                    width={8}
                    height={8}
                    fill="#4A5568"
                    rx={1}
                  />
                  {/* Trees */}
                  <ellipse cx={380} cy={290} rx={25} ry={35} fill="#38A169" />
                  <rect x={375} y={300} width={10} height={20} fill="#8B4513" />
                  <ellipse cx={520} cy={280} rx={20} ry={30} fill="#48BB78" />
                  <rect x={516} y={290} width={8} height={18} fill="#8B4513" />
                  <ellipse cx={340} cy={295} rx={22} ry={32} fill="#4FD1C7" />
                  <rect
                    x={336}
                    y={305}
                    width={8}
                    height={17}
                    fill="#8B4513"
                  />{" "}
                  {/* Ground/Path */}
                  <path
                    d="M 0 320 Q 300 300 600 320 L 600 400 L 0 400 Z"
                    fill="#E2E8F0"
                  />
                  {/* Person figure cleaning */}
                  <g transform="translate(200, 250)">
                    {/* Person body */}
                    <ellipse
                      cx={20}
                      cy={10}
                      rx={8}
                      ry={8}
                      fill="#F7FAFC"
                    />{" "}
                    {/* Head */}
                    <rect
                      x={16}
                      y={18}
                      width={8}
                      height={25}
                      fill="url(#personGradient)"
                      rx={4}
                    />{" "}
                    {/* Torso */}
                    <rect
                      x={12}
                      y={25}
                      width={4}
                      height={18}
                      fill="url(#personGradient)"
                      rx={2}
                    />{" "}
                    {/* Left arm */}
                    <rect
                      x={24}
                      y={25}
                      width={4}
                      height={18}
                      fill="url(#personGradient)"
                      rx={2}
                    />{" "}
                    {/* Right arm */}
                    <rect
                      x={17}
                      y={43}
                      width={3}
                      height={20}
                      fill="#2D3748"
                      rx={1.5}
                    />{" "}
                    {/* Left leg */}
                    <rect
                      x={22}
                      y={43}
                      width={3}
                      height={20}
                      fill="#2D3748"
                      rx={1.5}
                    />{" "}
                    {/* Right leg */}
                    {/* Cleaning tool (broom) */}
                    <line
                      x1={28}
                      y1={30}
                      x2={45}
                      y2={50}
                      stroke="#8B4513"
                      strokeWidth={2}
                    />
                    <ellipse cx={47} cy={52} rx={8} ry={3} fill="#D69E2E" />
                  </g>
                  {/* Trash/waste items being cleaned */}
                  <rect
                    x="250"
                    y="310"
                    width="8"
                    height="6"
                    fill="#E53E3E"
                    rx="1"
                  />
                  <circle cx="270" cy="312" r="3" fill="#3182CE" />
                  <rect
                    x="290"
                    y="308"
                    width="6"
                    height="8"
                    fill="#38A169"
                    rx="1"
                  />
                  {/* Cleaning motion lines */}
                  <path
                    d="M 240 305 Q 245 302 250 305"
                    stroke="#00B26F"
                    strokeWidth={2}
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M 245 300 Q 250 297 255 300"
                    stroke="#00B26F"
                    strokeWidth={2}
                    fill="none"
                    opacity="0.4"
                  />
                  {/* Floating particles/dust */}
                  <circle
                    cx="260"
                    cy="290"
                    r="1.5"
                    fill="#A0AEC0"
                    opacity="0.6"
                  />
                  <circle
                    cx="275"
                    cy="285"
                    r="1"
                    fill="#A0AEC0"
                    opacity="0.4"
                  />
                  <circle
                    cx="285"
                    cy="292"
                    r="1.2"
                    fill="#A0AEC0"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </AnimateOnView>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="impact"
        className="py-16 px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <AnimateOnView className="text-center mb-12">
            <h2 className="text-3xl font-inter font-bold gradient-text mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-charcoal/70 font-body text-lg">
              Real numbers from our growing community of environmental champions
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index} className="text-center card-glass">
                <div className="text-4xl font-inter font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-charcoal/70 font-body font-medium">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnView className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold gradient-text mb-6">
              Powerful Features for Sustainable Action
            </h2>
            <p className="text-xl text-charcoal/70 font-body max-w-3xl mx-auto">
              Everything you need to make a meaningful environmental impact in
              your community
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem
                key={index}
                className="card-glass group hover:shadow-premium transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-inter font-bold text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal/70 font-body leading-relaxed">
                  {feature.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="community"
        className="py-24 px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5"
      >
        <div className="max-w-7xl mx-auto">
          <AnimateOnView className="text-center mb-16">
            <h2 className="text-4xl font-inter font-bold gradient-text mb-6">
              Trusted by Environmental Leaders
            </h2>
            <p className="text-xl text-charcoal/70 font-body">
              See how communities around the world are using Reviwa to create
              sustainable change
            </p>
          </AnimateOnView>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index} className="card-glass">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-emerald-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-inter font-bold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-inter font-bold text-charcoal">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-charcoal/70 font-body">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-charcoal/80 font-body italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnView>
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-inter font-bold text-white mb-6">
              Ready to Transform Your Community?
            </h2>
            <p className="text-xl text-white/90 font-body mb-8 leading-relaxed">
              Join thousands of environmental champions making real impact.
              Start your sustainability journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="btn-reviwa bg-white text-primary hover:bg-accent-sand px-8 py-4 text-lg font-medium"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn-reviwa border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-medium"
              >
                Sign In
              </button>
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 bg-secondary-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <FadeIn className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-lg text-white font-inter font-bold">
                    R
                  </span>
                </div>
                <span className="text-xl font-inter font-bold text-white">
                  Reviwa
                </span>
              </div>
              <p className="text-white/70 font-body mb-4 leading-relaxed">
                AI-powered smart waste management platform building sustainable
                cities through community action. Aligned with UN SDG 11, 12, and
                13.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white">🐦</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="text-white">🌐</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 className="font-inter font-bold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-white/70 font-body">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h3 className="font-inter font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-white/70 font-body">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </FadeIn>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/50 font-body text-sm">
                © 2025 Reviwa. All rights reserved. Building sustainable cities
                together.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-white/50 font-body text-sm">
                  Aligned with UN SDGs:
                </span>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">11</span>
                  </div>
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">12</span>
                  </div>
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
