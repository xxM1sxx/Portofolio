AOS.init({
    duration: 1000,
    once: true,
});

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const body = document.body;

function toggleDarkMode() {
    if (body.classList.contains("dark-mode")) {
        setDarkMode(false);
        localStorage.setItem("theme", "light");
    } else {
        setDarkMode(true);
        localStorage.setItem("theme", "dark");
    }
}

darkModeToggle.addEventListener("click", toggleDarkMode);
darkModeToggleMobile.addEventListener("click", function(e) {
    e.preventDefault();
    toggleDarkMode();
});

// Check for saved theme preference or use user's system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

function setDarkMode(isDark) {
    if (isDark) {
        body.classList.add("dark-mode");
        document.querySelectorAll('.nav-link-custom').forEach(link => {
            link.style.color = '#ffffff';
        });
        // Add this line to update modals
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.classList.add('dark-mode');
        });
    } else {
        body.classList.remove("dark-mode");
        document.querySelectorAll('.nav-link-custom').forEach(link => {
            link.style.color = '#000000';
        });
        // Add this line to update modals
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.classList.remove('dark-mode');
        });
    }
    updateButtonIcon();
}

if (currentTheme === "dark") {
    setDarkMode(true);
} else if (currentTheme === "light") {
    setDarkMode(false);
} else if (prefersDarkScheme.matches) {
    setDarkMode(true);
}

// Update button icon
function updateButtonIcon() {
    const icon = darkModeToggle.querySelector('i');
    const mobileText = darkModeToggleMobile.querySelector('i');
    if (body.classList.contains("dark-mode")) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        mobileText.classList.remove('fa-moon');
        mobileText.classList.add('fa-sun');
        darkModeToggleMobile.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        mobileText.classList.remove('fa-sun');
        mobileText.classList.add('fa-moon');
        darkModeToggleMobile.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
    }
}

// Initial icon update
updateButtonIcon();

// Function to set active nav item
function setActiveNavItem() {
    const navLinks = document.querySelectorAll('.nav-link-custom');
    const currentHash = window.location.hash || '#Layanan'; // Default to #Layanan if no hash

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active nav item on page load and hash change
window.addEventListener('load', setActiveNavItem);
window.addEventListener('hashchange', setActiveNavItem);

document.addEventListener('show.bs.modal', function (event) {
    const modal = event.target;
    if (body.classList.contains('dark-mode')) {
        modal.querySelector('.modal-content').classList.add('dark-mode');
    } else {
        modal.querySelector('.modal-content').classList.remove('dark-mode');
    }
});