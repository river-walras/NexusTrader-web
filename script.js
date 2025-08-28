// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.exchange-card, .feature-card, .section-title, .section-subtitle'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animation states
const style = document.createElement('style');
style.textContent = `
    .exchange-card,
    .feature-card,
    .section-title,
    .section-subtitle {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .header {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add stagger effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const exchangeCards = document.querySelectorAll('.exchange-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    exchangeCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Add hover effect for exchange logos
document.querySelectorAll('.exchange-card').forEach(card => {
    const logo = card.querySelector('.exchange-img');
    
    card.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
        logo.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add subtle animation to hero dots background
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelector('.floating-dots');
    if (dots) {
        // Add subtle parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const rect = dots.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            dots.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
        
        // Reset transform when mouse leaves
        dots.addEventListener('mouseleave', () => {
            dots.style.transform = 'translate(0, 0)';
            dots.style.transition = 'transform 0.5s ease';
        });
        
        dots.addEventListener('mouseenter', () => {
            dots.style.transition = 'transform 0.1s ease';
        });
    }
});

// Add typing effect to hero title
document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) {
        const originalText = titleElement.innerHTML;
        titleElement.innerHTML = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (index < originalText.length) {
                titleElement.innerHTML = originalText.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (target > 10) {
                element.textContent = Math.floor(start) + '+';
            } else {
                element.textContent = start.toFixed(0);
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (element.textContent.includes('/')) {
                element.textContent = element.getAttribute('data-target');
            } else {
                element.textContent = target + (target > 10 ? '+' : '');
            }
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target;
                
                if (text.includes('24/7')) {
                    stat.setAttribute('data-target', '24/7');
                    return;
                } else if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                } else {
                    target = parseInt(text);
                }
                
                stat.textContent = '0';
                setTimeout(() => {
                    animateCounter(stat, target);
                }, 500);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.documentation-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu button
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #374151;
        `;
        
        nav.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-menu-open');
        });
        
        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    flex-direction: column;
                    padding: 20px;
                }
                
                .nav-menu.mobile-menu-open {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading animation after page loads
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Add loading styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        body.loaded::before {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Use the Clipboard API if available
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textarea);
}

function showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    
    // Show checkmark
    copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
    `;
    copyBtn.style.color = '#34d399';
    
    // Reset after 2 seconds
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.color = '';
    }, 2000);
}

// System detection and version fetching
document.addEventListener('DOMContentLoaded', () => {
    const systemInfo = document.getElementById('system-info');
    if (systemInfo) {
        const userAgent = navigator.userAgent.toLowerCase();
        let system = 'Unknown';
        
        if (userAgent.includes('mac')) {
            system = 'macOS';
        } else if (userAgent.includes('windows')) {
            system = 'Windows';
        } else if (userAgent.includes('linux')) {
            system = 'Linux';
        } else if (userAgent.includes('android')) {
            system = 'Android';
        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            system = 'iOS';
        }
        
        systemInfo.textContent = system;
    }
    
    // Fetch latest version from PyPI
    fetchLatestVersion();
});

// Fetch latest version from PyPI API
async function fetchLatestVersion() {
    try {
        const response = await fetch('https://pypi.org/pypi/nexustrader/json');
        const data = await response.json();
        const latestVersion = data.info.version;
        
        // Update the release info
        const releaseInfo = document.querySelector('.release-info');
        if (releaseInfo && latestVersion) {
            const systemInfo = document.getElementById('system-info');
            const systemText = systemInfo ? systemInfo.textContent : 'Unknown';
            releaseInfo.innerHTML = `Latest release: NexusTrader ${latestVersion} | System detected: <span id="system-info">${systemText}</span>`;
        }
    } catch (error) {
        console.log('Could not fetch latest version from PyPI:', error);
        // Keep the default version if fetch fails
    }
}