import '@testing-library/jest-dom';

// Optionally add global mocks here (e.g., fetch, geolocation)
// Example: provide a noop for window.scrollTo used by some components
window.scrollTo = window.scrollTo || function () { };

// JSDOM doesn't implement IntersectionObserver which some libs (framer-motion)
// rely on — provide a lightweight mock for tests.
class IntersectionObserver {
  constructor() { }
  observe() { }
  unobserve() { }
  disconnect() { }
}

global.IntersectionObserver = global.IntersectionObserver || IntersectionObserver;
