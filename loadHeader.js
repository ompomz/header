async function loadHeader() {
    const containerId = 'header-placeholder';
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Error: Element with id "${containerId}" not found.`);
        return;
    }
    try {
        const response = await fetch('https://ompomz.github.io/header/index.html');
        if (!response.ok) {
            throw new Error(`Failed to load header.html: ${response.statusText}`);
        }
        const headerHtml = await response.text();
        container.innerHTML = headerHtml;
        setupHamburgerMenu();
    } catch (error) {
        console.error('Failed to load header:', error);
    }
}
function setupHamburgerMenu() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navMenu = document.querySelector('.main-nav');
    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            hamburgerButton.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
        });
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = hamburgerButton.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideMenu && navMenu.classList.contains('is-open')) {
                hamburgerButton.setAttribute('aria-expanded', 'false');
                hamburgerButton.classList.remove('is-open');
                navMenu.classList.remove('is-open');
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', loadHeader);
