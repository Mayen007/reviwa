/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reviwa civic tech color scheme
        'eco-green': '#10B981',
        'waste-orange': '#F59E0B',
        'admin-blue': '#3B82F6',
        'civic-gray': '#6B7280',
        'community-purple': '#8B5CF6',
      },
      fontFamily: {
        'civic': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}