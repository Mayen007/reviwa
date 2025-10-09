import React, { useState, useEffect } from "react";

const AchievementNotification = ({ achievement, onClose, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show notification
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Auto-hide notification
    const hideTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  if (!achievement) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm transition-all duration-300 ${
        isVisible && !isLeaving
          ? "transform translate-x-0 opacity-100"
          : "transform translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-green-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏆</span>
              </div>
              <h3 className="text-white font-semibold text-sm">
                Achievement Unlocked!
              </h3>
            </div>
            <button
              onClick={() => {
                setIsLeaving(true);
                setTimeout(() => onClose?.(), 300);
              }}
              className="text-white/80 hover:text-white transition-colors"
              style={{ color: "white" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 font-semibold text-base mb-1">
                {achievement.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {achievement.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +{achievement.green_points_earned} points
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {achievement.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-1 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300 ease-out"
            style={{
              width: isVisible ? "0%" : "100%",
              transition: `width ${duration}ms linear`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  // Sample achievements that could be triggered
  const sampleAchievements = [
    {
      id: 1,
      title: "First Report",
      description:
        "You've submitted your first waste report! Every small action makes a difference.",
      category: "reporting",
      green_points_earned: 10,
      icon: "🌱",
    },
    {
      id: 2,
      title: "Environmental Warrior",
      description:
        "5 reports submitted! You're becoming a true environmental champion.",
      category: "reporting",
      green_points_earned: 25,
      icon: "⚔️",
    },
    {
      id: 3,
      title: "Photo Evidence Pro",
      description: "Great job including clear photos with your reports!",
      category: "quality",
      green_points_earned: 15,
      icon: "📸",
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Your report was verified and led to a successful cleanup!",
      category: "impact",
      green_points_earned: 50,
      icon: "🤝",
    },
    {
      id: 5,
      title: "Location Detective",
      description:
        "Accurate location data helps cleanup crews find issues faster!",
      category: "accuracy",
      green_points_earned: 20,
      icon: "📍",
    },
  ];

  const showAchievement = (achievementId) => {
    const achievement = sampleAchievements.find((a) => a.id === achievementId);
    if (achievement && !notifications.find((n) => n.id === achievement.id)) {
      setNotifications((prev) => [
        ...prev,
        { ...achievement, timestamp: Date.now() },
      ]);
    }
  };

  const removeNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  // Expose methods for triggering achievements
  window.triggerAchievement = showAchievement;

  return (
    <div>
      {notifications.map((notification) => (
        <AchievementNotification
          key={`${notification.id}-${notification.timestamp}`}
          achievement={notification}
          onClose={() => removeNotification(notification.id)}
          duration={5000}
        />
      ))}
    </div>
  );
};

// Quick Stats Component
const QuickStats = ({ user, reports = [] }) => {
  const stats = {
    reportsSubmitted: reports.filter((r) => r.submitted_by === user?.id).length,
    reportsResolved: reports.filter(
      (r) => r.status === "resolved" && r.submitted_by === user?.id
    ).length,
    greenPoints: user?.green_points || 0,
    streak: user?.current_streak || 0,
  };

  const completionRate =
    stats.reportsSubmitted > 0
      ? Math.round((stats.reportsResolved / stats.reportsSubmitted) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Your Impact
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {stats.greenPoints}
          </div>
          <div className="text-xs text-green-700 font-medium">Green Points</div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {stats.reportsSubmitted}
          </div>
          <div className="text-xs text-blue-700 font-medium">
            Reports Submitted
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {completionRate}%
          </div>
          <div className="text-xs text-purple-700 font-medium">
            Success Rate
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {stats.streak}
          </div>
          <div className="text-xs text-orange-700 font-medium">Day Streak</div>
        </div>
      </div>

      {/* Progress towards next achievement */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Next Achievement: Environmental Warrior
          </span>
          <span className="text-sm text-gray-500">
            {stats.reportsSubmitted}/5 reports
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((stats.reportsSubmitted / 5) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export { AchievementNotification, NotificationCenter, QuickStats };
export default NotificationCenter;
