import '@testing-library/jest-dom';

// Optionally add global mocks here (e.g., fetch, geolocation)
// Example: provide a noop for window.scrollTo used by some components
window.scrollTo = window.scrollTo || function () { };
