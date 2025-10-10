document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll('[data-tabs-target]');
  const tabContents = document.querySelectorAll('[role="tabpanel"]');

  // Function to set the initial active tab
  function setActiveTab(button, content) {
    button.setAttribute('aria-selected', 'true');
    button.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    button.classList.remove('hover:text-gray-600', 'hover:border-gray-300', 'dark:hover:text-gray-300', 'text-gray-500', 'border-transparent');

    content.classList.remove('hidden', 'opacity-0');
    content.classList.add('block', 'opacity-100');
  }

  // Set the first tab as active on page load
  const firstButton = tabButtons[0];
  const firstTargetContent = document.querySelector(firstButton.dataset.tabsTarget);
  setActiveTab(firstButton, firstTargetContent);

  // Add a click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const targetId = button.dataset.tabsTarget;
      const targetContent = document.querySelector(targetId);

      // Prevent the click if the tab is already active
      if (button.getAttribute('aria-selected') === 'true') {
        return;
      }

      // Deactivate all buttons
      tabButtons.forEach(btn => {
        btn.setAttribute('aria-selected', 'false');
        btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        btn.classList.add('hover:text-gray-600', 'hover:border-gray-300', 'dark:hover:text-gray-300', 'text-gray-500', 'border-transparent');
      });

      // Find the currently active content panel
      const activeContent = document.querySelector('[role="tabpanel"].opacity-100');

      // Fade out the current active content
      activeContent.classList.remove('opacity-100');
      activeContent.classList.add('opacity-0');

      // Listen for the fade-out to complete
      activeContent.addEventListener('transitionend', function fadeOutEnd() {
        activeContent.classList.remove('block');
        activeContent.classList.add('hidden');

        // Immediately show and fade in the new tab content
        button.setAttribute('aria-selected', 'true');
        button.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
        button.classList.remove('hover:text-gray-600', 'hover:border-gray-300', 'dark:hover:text-gray-300', 'text-gray-500', 'border-transparent');

        targetContent.classList.remove('hidden', 'opacity-0');
        targetContent.classList.add('block');

        // Allow the browser to apply the 'block' display before transitioning opacity
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            targetContent.classList.add('opacity-100');
          });
        });

        // Clean up the event listener to prevent it from firing multiple times
        activeContent.removeEventListener('transitionend', fadeOutEnd);
      });
    });
  });
});


