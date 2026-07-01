/* ==========================================
   VYVORA INTERACTIVE SYSTEM
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. Hide Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 800);
    }

    // 2. Sticky Header Scroll Effect & Scroll Progress Bar
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky navigation background
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;

        // Back-To-Top Button visibility
        if (scrollTop > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Link Highlight on Scroll
        highlightActiveLink();
    });

    // Back to top click handler
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            menuToggle.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // 4. Dark Mode Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcons(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const targetTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        updateThemeToggleIcons(targetTheme);
    });

    function updateThemeToggleIcons(theme) {
        const darkIcon = themeToggleBtn.querySelector('.dark-icon');
        const lightIcon = themeToggleBtn.querySelector('.light-icon');
        if (theme === 'dark') {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'block';
        } else {
            darkIcon.style.display = 'block';
            lightIcon.style.display = 'none';
        }
    }

    // 5. Highlight Navigation Links Dynamically
    const sections = document.querySelectorAll('section');
    const navAnchorLinks = document.querySelectorAll('.nav-links a');

    function highlightActiveLink() {
        let scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navAnchorLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 6. Generate Floating Bubbles in Hero Section
    const bubblesContainer = document.getElementById('hero-bubbles');
    if (bubblesContainer) {
        const bubbleCount = 20;
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            const size = Math.random() * 25 + 10; // size 10px to 35px
            const left = Math.random() * 100; // pos 0% to 100%
            const delay = Math.random() * 8; // delay 0s to 8s
            const duration = Math.random() * 10 + 6; // duration 6s to 16s

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;

            bubblesContainer.appendChild(bubble);
        }
    }

    // 7. Animated Counter Statistics
    const statNums = document.querySelectorAll('.stat-num');
    let countersStarted = false;

    const startCounters = () => {
        statNums.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-val'));
            const duration = 2000; // 2 seconds animation
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            
            // Adjust step time for larger numbers
            const increment = target > 1000 ? Math.ceil(target / 100) : 1;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.innerText = current.toLocaleString();
                }
            }, target > 1000 ? 20 : stepTime);
        });
    };

    // Trigger counters when scrolled into view
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                startCounters();
                countersStarted = true;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statSection = document.querySelector('.stat-counters');
    if (statSection) {
        counterObserver.observe(statSection);
    }

    // 8. FAQ Accordion Action
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 9. Floating Chatbot Logic
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    
    if (chatTrigger && chatWindow) {
        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            const isOpen = chatWindow.classList.contains('open');
            
            const openIcon = chatTrigger.querySelector('.chat-open-icon');
            const closeIcon = chatTrigger.querySelector('.chat-close-icon');
            
            if (isOpen) {
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }

    // Set initial preview state
    updatePreview();
});

// ==========================================
// 10. Live Configurator & Wrapper Preview
// ==========================================
function updatePreview() {
    const eventType = document.getElementById('cust-event-type').value;
    const eventName = document.getElementById('cust-event-name').value || "Aakash weds Priyanka";
    const customText = document.getElementById('cust-text').value || "Kapavarapu's Wedding Celebrations";
    const color = document.getElementById('cust-color').value;

    const liveLabel = document.getElementById('live-label');
    const labelEventTypeView = document.getElementById('label-event-type-view');
    const labelEventNameView = document.getElementById('label-event-name-view');
    const labelCustomTextView = document.getElementById('label-custom-text-view');

    if (liveLabel) {
        liveLabel.style.backgroundColor = color;
        // Auto text color contrast check
        const isDarkColor = isColorDark(color);
        liveLabel.style.color = isDarkColor ? '#ffffff' : '#050a30';
        
        const logoPlaceholder = document.getElementById('label-logo-view');
        if (logoPlaceholder) {
            logoPlaceholder.style.borderColor = isDarkColor ? 'rgba(255,255,255,0.3)' : 'rgba(5,10,48,0.3)';
            logoPlaceholder.style.backgroundColor = isDarkColor ? 'rgba(255,255,255,0.2)' : 'rgba(5,10,48,0.1)';
            const droplet = logoPlaceholder.querySelector('.droplet-icon');
            if (droplet) {
                droplet.style.color = isDarkColor ? '#ffffff' : '#050a30';
            }
        }
    }

    if (labelEventTypeView) labelEventTypeView.innerText = eventType;
    if (labelEventNameView) labelEventNameView.innerText = eventName;
    if (labelCustomTextView) labelCustomTextView.innerText = customText;
}

// Convert Hex to YIQ color calculation for text contrast
function isColorDark(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // Convert 3-digit hex to 6-digit
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq < 128;
}

// Image Upload Preview in label mockup
let uploadedImageUrl = null;
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImageUrl = e.target.result;
        const logoView = document.getElementById('label-logo-view');
        if (logoView) {
            logoView.innerHTML = `<img src="${uploadedImageUrl}" alt="Uploaded Logo">`;
        }
    };
    reader.readAsDataURL(file);
}

// ==========================================
// 11. WhatsApp Form Integrations
// ==========================================

// Primary phone number
const CONTACT_NUMBER = "917095227142";

// Handle Customized Order Submission
function handleCustomSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const eventType = document.getElementById('cust-event-type').value;
    const bottleSize = document.getElementById('cust-size').value;
    const eventName = document.getElementById('cust-event-name').value;
    const customText = document.getElementById('cust-text').value;
    const quantity = document.getElementById('cust-quantity').value;
    const color = document.getElementById('cust-color').value;

    // Check quantity constraints
    if (parseInt(quantity) < 10) {
        alert("Minimum customized order quantity is 10 bottles.");
        return;
    }

    const fileInput = document.getElementById('cust-logo');
    const imageAttached = fileInput.files.length > 0 ? "Yes (Attached in browser config - will send raw file)" : "No";

    const textMessage = `*NEW CUSTOMIZED BOTTLE REQUEST* \n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Event Type:* ${eventType}\n` +
        `*Event Name/Title:* ${eventName}\n` +
        `*Custom Wrapper Text:* ${customText}\n` +
        `*Bottle Size:* ${bottleSize}\n` +
        `*Quantity:* ${quantity} bottles\n` +
        `*Theme Color Hex:* ${color}\n` +
        `*Custom Image Uploaded:* ${imageAttached}\n\n` +
        `Hello Vyvora, I have configured this wrapper template on your site. Please send me a quote and instructions to upload my original design.`;

    const whatsappUrl = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Handle Order Now Modal Form Submission
function handleBulkOrderSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('ord-name').value;
    const phone = document.getElementById('ord-phone').value;
    const address = document.getElementById('ord-address').value;
    const packType = document.getElementById('ord-pack-type').value;
    const bottleSize = document.getElementById('ord-size').value;
    const quantity = document.getElementById('ord-quantity').value;
    const deliveryDate = document.getElementById('ord-date').value;
    const instructions = document.getElementById('ord-notes').value || "None";

    if (parseInt(quantity) < 10) {
        alert("Minimum order quantity is 10 packs / bottles.");
        return;
    }

    const textMessage = `*NEW PACKAGED WATER ORDER* \n\n` +
        `*Customer Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Package Selection:* ${packType}\n` +
        `*Bottle Size:* ${bottleSize}\n` +
        `*Quantity:* ${quantity}\n` +
        `*Preferred Delivery Date:* ${deliveryDate}\n` +
        `*Delivery Address:* ${address}\n` +
        `*Instructions:* ${instructions}\n\n` +
        `Hello Vyvora team, please confirm availability and payment options for this order.`;

    const whatsappUrl = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
    closeOrderModal();
}

// Handle Direct Contact Inquiry Form Submission
function handleContactSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('cnt-name').value;
    const phone = document.getElementById('cnt-phone').value;
    const message = document.getElementById('cnt-msg').value;

    const textMessage = `*NEW WEBSITE ENQUIRY* \n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Enquiry Detail:* ${message}`;

    const whatsappUrl = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Newsletter sign up
function handleNewsletter(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    alert(`Thank you for subscribing, ${input.value}! We will keep you updated.`);
    input.value = '';
}

// ==========================================
// 12. Modal Open / Close Controllers
// ==========================================
const orderModal = document.getElementById('order-modal');

function openOrderModal(packSelection = 'Pack of 24') {
    if (orderModal) {
        orderModal.classList.add('show');
        
        // Pre-select package drop-down value
        const packSelect = document.getElementById('ord-pack-type');
        if (packSelect) {
            for (let option of packSelect.options) {
                if (option.value === packSelection) {
                    option.selected = true;
                    break;
                }
            }
        }
        
        // Default delivery date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        document.getElementById('ord-date').value = tomorrowStr;
    }
}

function closeOrderModal() {
    if (orderModal) {
        orderModal.classList.remove('show');
    }
}

// Close modal if user clicks outside content card
window.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        closeOrderModal();
    }
});

// ==========================================
// 13. AI Assistant Bot Logic
// ==========================================
const chatbotReplies = {
    sizes: "We offer Vyvora bottles in three convenient sizes:\n💧 *250 ml* (perfect for events and parties)\n💧 *500 ml* (standard daily bottle)\n💧 *1 Litre* (great for home/offices)\n\nAll sizes come with security sealing and mineral-enriched clean water.",
    custom: "Yes, you can customize wrappers with your own logo, event name, colors, and texts for:\n🎉 Weddings\n🎂 Birthdays\n🏢 Corporate promotions\n🍼 Seemantham\n\nMinimum order starts from *just 10 bottles*! You can configure a design right on this page under the *Customized Bottles* section.",
    pricing: "Our prices are highly affordable! Package costs vary based on bottle size and quantity. Customized label orders start from 10 bottles. Standard water packs start at:\n📦 *Pack of 12* (500ml/1L)\n📦 *Pack of 24* (250ml/500ml/1L)\n\nPlease click *Order Now* to enter your size and quantity details. You will get the wholesale pricing quote instantly via WhatsApp.",
    delivery: "We offer fast doorstep delivery across Vijayawada (including Sanath Nagar, Ramalayam Street, and nearby areas). Standard package orders are delivered within 24 hours. Bulk event bookings can be scheduled for any date.",
    safety: "Purity is our promise! Vyvora drinking water undergoes a high-standard multi-stage purification process:\n✔️ Multi-grade sand and carbon filtration\n✔️ Reverse Osmosis (RO) filtration\n✔️ Ultra Violet (UV) treatment\n✔️ Ozone sanitization\n✔️ Balanced mineral addition\nWe are BIS certified and operate under strict government compliance.",
    contact: "You can reach us at:\n📞 *Manager Line:* +91 9553509407\n📞 *Primary Line:* +91 7095227142\n📍 *Office:* Door No: 16-155, Sanath Nagar, Ramalayam Street, Vijayawada - 520007\n⏰ *Business Hours:* 8:00 AM - 9:00 PM (Daily)",
    fallback: "I want to make sure I help you best! Feel free to ask about bottle sizes, customized wrappers, bulk orders, delivery areas, safety, or office location. You can also click the quick reply buttons above for instant answers!"
};

function askChat(topic) {
    const userText = getTopicLabel(topic);
    appendChatMessage(userText, 'user');
    
    // Simulate typing animation
    showChatTyping();

    setTimeout(() => {
        removeChatTyping();
        const reply = chatbotReplies[topic] || chatbotReplies['fallback'];
        appendChatMessage(reply, 'bot');
    }, 800);
}

function getTopicLabel(topic) {
    switch(topic) {
        case 'sizes': return "What bottle sizes are available?";
        case 'custom': return "How do I order customized bottles?";
        case 'pricing': return "What is the bulk pricing?";
        case 'delivery': return "Where do you deliver?";
        case 'safety': return "What are your safety standards?";
        case 'contact': return "How do I contact support or locate the office?";
        default: return "Hello!";
    }
}

function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chat-user-text');
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    appendChatMessage(input.value, 'user');
    input.value = '';

    showChatTyping();

    // Answer matching
    let topic = 'fallback';
    if (text.includes('size') || text.includes('ml') || text.includes('litre')) {
        topic = 'sizes';
    } else if (text.includes('custom') || text.includes('wedding') || text.includes('celebr') || text.includes('seemantham') || text.includes('label')) {
        topic = 'custom';
    } else if (text.includes('price') || text.includes('cost') || text.includes('wholesale') || text.includes('rate')) {
        topic = 'pricing';
    } else if (text.includes('deliver') || text.includes('place') || text.includes('vijayawada')) {
        topic = 'delivery';
    } else if (text.includes('safe') || text.includes('pure') || text.includes('ro') || text.includes('uv') || text.includes('certif') || text.includes('clean')) {
        topic = 'safety';
    } else if (text.includes('contact') || text.includes('phone') || text.includes('number') || text.includes('location') || text.includes('address') || text.includes('hours') || text.includes('manager')) {
        topic = 'contact';
    }

    setTimeout(() => {
        removeChatTyping();
        const reply = chatbotReplies[topic];
        appendChatMessage(reply, 'bot');
    }, 850);
}

function appendChatMessage(content, sender) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-msg', sender);
    
    // Convert newlines to breaks and support simple bold markdown (*text*)
    let htmlContent = content.replace(/\n/g, '<br>');
    htmlContent = htmlContent.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

    messageDiv.innerHTML = `<div class="chat-msg-bubble">${htmlContent}</div>`;
    container.appendChild(messageDiv);
    
    // Auto scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function showChatTyping() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-msg', 'bot', 'typing-loader');
    typingDiv.id = 'chat-typing-indicator';
    typingDiv.innerHTML = `<div class="chat-msg-bubble">Typing...</div>`;
    
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeChatTyping() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}
