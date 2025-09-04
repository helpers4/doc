/**
 * Theme toggle functionality for the documentation site
 */

// Initialize theme on page load
(function () {
  // Get saved theme or default to system preference
  const savedTheme = localStorage.getItem('theme');
  let theme = savedTheme;

  if (!theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', theme);
})();

// Setup theme toggle functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Dispatch custom event for other components that might need to know
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      }));
    });
  }

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', function (e) {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  });
});
