// All-in-One Tools Website - JavaScript
// Author: Senior Web Developer
// Description: Complete functionality for all tools with modern features

class AllInOneTools {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.loadTheme();
    }

    init() {
        // Initialize variables
        this.currentModal = null;
        this.qrCode = null;
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', 
            localStorage.getItem('theme') || 'light'
        );
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Theme toggle
        this.setupThemeToggle();
        
        // Tool cards
        this.setupToolCards();
        
        // Modal controls
        this.setupModalControls();
        
        // Download HTML functionality
        this.setupDownloadHTML();
        
        // Individual tool setups
        this.setupQRGenerator();
        this.setupImageResizer();
        this.setupPasswordGenerator();
        this.setupUnitConverter();
        this.setupTextReverser();
        this.setupWordCounter();
        this.setupColorPicker();
        this.setupAgeCalculator();
        this.setupBMICalculator();
        this.setupNumberRandomizer();
        this.setupURLShortener();
        this.setupBase64Converter();
        this.setupJSONFormatter();
        
        // Enhanced features
        this.setupKeyboardShortcuts();
        this.setupToolUsageTracking();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
    }

    // Navigation Setup
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                navMenu.classList.remove('active');
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    header.style.background = 'rgba(15, 23, 42, 0.98)';
                }
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    header.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });
    }

    // Theme Toggle Setup
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        
        themeToggle?.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle?.querySelector('i');
        
        if (icon) {
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Tool Cards Setup
    setupToolCards() {
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            const btn = card.querySelector('.tool-card__btn');
            btn?.addEventListener('click', () => {
                const toolName = card.getAttribute('data-tool');
                this.openModal(toolName);
            });
        });
    }

    // Modal Controls
    setupModalControls() {
        const modalOverlay = document.getElementById('modal-overlay');
        const closeButtons = document.querySelectorAll('.modal__close');
        
        // Close modal when clicking overlay
        modalOverlay?.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });
        
        // Close modal buttons
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    }

    openModal(toolName) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modal = document.getElementById(`${toolName}-modal`);
        
        if (modal && modalOverlay) {
            // Close any open modal first
            this.closeModal();
            
            // Open new modal
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            this.currentModal = modal;
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        
        if (this.currentModal) {
            modalOverlay.classList.remove('active');
            this.currentModal.classList.remove('active');
            this.currentModal = null;
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    // Download HTML Setup
    setupDownloadHTML() {
        const downloadBtn = document.getElementById('download-html');
        
        downloadBtn?.addEventListener('click', () => {
            this.downloadHTML();
        });
    }

    downloadHTML() {
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'all-in-one-tools.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('HTML file downloaded successfully!');
    }

    // QR Code Generator
    setupQRGenerator() {
        const generateBtn = document.getElementById('generate-qr');
        const downloadBtn = document.getElementById('download-qr');
        const input = document.getElementById('qr-input');
        const canvas = document.getElementById('qr-canvas');
        
        generateBtn?.addEventListener('click', () => {
            const text = input.value.trim();
            if (!text) {
                this.showNotification('Please enter text or URL', 'error');
                return;
            }
            
            this.generateQRCode(text, canvas);
            downloadBtn.style.display = 'inline-flex';
        });
        
        downloadBtn?.addEventListener('click', () => {
            this.downloadCanvas(canvas, 'qr-code.png');
        });
    }

    generateQRCode(text, canvas) {
        try {
            const qr = qrcode(0, 'M');
            qr.addData(text);
            qr.make();
            
            const ctx = canvas.getContext('2d');
            const size = 300;
            canvas.width = size;
            canvas.height = size;
            
            const moduleCount = qr.getModuleCount();
            const moduleSize = size / moduleCount;
            
            // Clear canvas
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, size, size);
            
            // Draw QR code
            ctx.fillStyle = '#000000';
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
                    }
                }
            }
            
            this.showNotification('QR Code generated successfully!');
        } catch (error) {
            this.showNotification('Error generating QR code', 'error');
        }
    }

    // Image Resizer
    setupImageResizer() {
        const uploadInput = document.getElementById('image-upload');
        const resizeBtn = document.getElementById('resize-image');
        const downloadBtn = document.getElementById('download-image');
        const canvas = document.getElementById('image-canvas');
        
        resizeBtn?.addEventListener('click', () => {
            const file = uploadInput.files[0];
            const maxWidth = parseInt(document.getElementById('max-width').value) || 800;
            
            if (!file) {
                this.showNotification('Please select an image', 'error');
                return;
            }
            
            this.resizeImage(file, maxWidth, canvas, downloadBtn);
        });
        
        downloadBtn?.addEventListener('click', () => {
            this.downloadCanvas(canvas, 'resized-image.png');
        });
    }

    resizeImage(file, maxWidth, canvas, downloadBtn) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                
                // Calculate new dimensions
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw resized image
                ctx.drawImage(img, 0, 0, width, height);
                
                downloadBtn.style.display = 'inline-flex';
                this.showNotification('Image resized successfully!');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Password Generator
    setupPasswordGenerator() {
        const generateBtn = document.getElementById('generate-password');
        const copyBtn = document.getElementById('copy-password');
        const lengthSlider = document.getElementById('password-length');
        const lengthDisplay = document.getElementById('length-display');
        const passwordOutput = document.getElementById('generated-password');
        
        lengthSlider?.addEventListener('input', () => {
            lengthDisplay.textContent = lengthSlider.value;
        });
        
        generateBtn?.addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            const options = {
                uppercase: document.getElementById('include-uppercase').checked,
                lowercase: document.getElementById('include-lowercase').checked,
                numbers: document.getElementById('include-numbers').checked,
                symbols: document.getElementById('include-symbols').checked
            };
            
            const password = this.generatePassword(length, options);
            passwordOutput.value = password;
            
            if (password) {
                this.showNotification('Password generated successfully!');
            }
        });
        
        copyBtn?.addEventListener('click', () => {
            this.copyToClipboard('generated-password');
        });
    }

    generatePassword(length, options) {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!charset) {
            this.showNotification('Please select at least one character type', 'error');
            return '';
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        return password;
    }

    // Unit Converter
    setupUnitConverter() {
        const fromValue = document.getElementById('from-value');
        const fromUnit = document.getElementById('from-unit');
        const toValue = document.getElementById('to-value');
        const toUnit = document.getElementById('to-unit');
        
        const convert = () => {
            const value = parseFloat(fromValue.value);
            if (isNaN(value)) {
                toValue.value = '';
                return;
            }
            
            const result = this.convertUnits(value, fromUnit.value, toUnit.value);
            toValue.value = result.toFixed(6).replace(/\.?0+$/, '');
        };
        
        fromValue?.addEventListener('input', convert);
        fromUnit?.addEventListener('change', convert);
        toUnit?.addEventListener('change', convert);
    }

    convertUnits(value, fromUnit, toUnit) {
        // Convert to meters first
        const toMeters = {
            'm': 1,
            'cm': 0.01,
            'km': 1000,
            'ft': 0.3048,
            'in': 0.0254,
            'yd': 0.9144
        };
        
        const meters = value * toMeters[fromUnit];
        return meters / toMeters[toUnit];
    }

    // Text Reverser
    setupTextReverser() {
        const textInput = document.getElementById('text-input');
        const reversedText = document.getElementById('reversed-text');
        const copyBtn = document.getElementById('copy-reversed');
        
        textInput?.addEventListener('input', () => {
            const text = textInput.value;
            reversedText.value = text.split('').reverse().join('');
        });
        
        copyBtn?.addEventListener('click', () => {
            this.copyToClipboard('reversed-text');
        });
    }

    // Word Counter
    setupWordCounter() {
        const textInput = document.getElementById('text-to-count');
        const wordCount = document.getElementById('word-count');
        const charCount = document.getElementById('char-count');
        const charNoSpaces = document.getElementById('char-no-spaces');
        const paragraphCount = document.getElementById('paragraph-count');
        
        textInput?.addEventListener('input', () => {
            const text = textInput.value;
            
            // Word count
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            wordCount.textContent = words;
            
            // Character count
            charCount.textContent = text.length;
            
            // Character count without spaces
            charNoSpaces.textContent = text.replace(/\s/g, '').length;
            
            // Paragraph count
            const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;
            paragraphCount.textContent = paragraphs;
        });
    }

    // Color Picker
    setupColorPicker() {
        const colorInput = document.getElementById('color-input');
        const colorPreview = document.getElementById('color-preview');
        const hexValue = document.getElementById('hex-value');
        const rgbValue = document.getElementById('rgb-value');
        
        const updateColor = () => {
            const color = colorInput.value;
            colorPreview.style.backgroundColor = color;
            hexValue.value = color.toUpperCase();
            
            // Convert hex to RGB
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            rgbValue.value = `rgb(${r}, ${g}, ${b})`;
        };
        
        colorInput?.addEventListener('input', updateColor);
        
        // Initialize
        updateColor();
    }

    // Age Calculator
    setupAgeCalculator() {
        const calculateBtn = document.getElementById('calculate-age');
        const birthDateInput = document.getElementById('birth-date');
        
        calculateBtn?.addEventListener('click', () => {
            const birthDate = new Date(birthDateInput.value);
            if (!birthDateInput.value) {
                this.showNotification('Please select your birth date', 'error');
                return;
            }
            
            this.calculateAge(birthDate);
        });
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        
        if (birth > today) {
            this.showNotification('Birth date cannot be in the future', 'error');
            return;
        }
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        
        // Additional details
        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        
        const details = document.getElementById('age-details');
        details.innerHTML = `
            <p><strong>Total:</strong> ${totalDays} days, ${totalWeeks} weeks, ${totalMonths} months</p>
            <p><strong>Next Birthday:</strong> ${this.getNextBirthday(birth)}</p>
        `;
        
        this.showNotification('Age calculated successfully!');
    }

    getNextBirthday(birthDate) {
        const today = new Date();
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        return `${daysUntil} days`;
    }

    // BMI Calculator
    setupBMICalculator() {
        const calculateBtn = document.getElementById('calculate-bmi');
        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');
        
        calculateBtn?.addEventListener('click', () => {
            const height = parseFloat(heightInput.value);
            const weight = parseFloat(weightInput.value);
            
            if (!height || !weight || height <= 0 || weight <= 0) {
                this.showNotification('Please enter valid height and weight', 'error');
                return;
            }
            
            this.calculateBMI(height, weight);
        });
    }

    calculateBMI(height, weight) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category = '';
        let categoryClass = '';
        
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryClass = 'underweight';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            categoryClass = 'normal';
        } else if (bmi < 30) {
            category = 'Overweight';
            categoryClass = 'overweight';
        } else {
            category = 'Obese';
            categoryClass = 'obese';
        }
        
        document.getElementById('bmi-value').textContent = bmi.toFixed(1);
        const categoryElement = document.getElementById('bmi-category');
        categoryElement.textContent = category;
        categoryElement.className = `bmi-category ${categoryClass}`;
        
        // Highlight the appropriate range
        document.querySelectorAll('.bmi-range').forEach(range => {
            range.style.opacity = '0.5';
        });
        document.querySelector(`.bmi-range.${categoryClass}`).style.opacity = '1';
        
        this.showNotification('BMI calculated successfully!');
    }

    // Number Randomizer
    setupNumberRandomizer() {
        const generateBtn = document.getElementById('generate-number');
        const generateAgainBtn = document.getElementById('generate-again');
        const minInput = document.getElementById('min-number');
        const maxInput = document.getElementById('max-number');
        const resultDisplay = document.getElementById('random-number');
        
        const generateNumber = () => {
            const min = parseInt(minInput.value);
            const max = parseInt(maxInput.value);
            
            if (isNaN(min) || isNaN(max)) {
                this.showNotification('Please enter valid numbers', 'error');
                return;
            }
            
            if (min >= max) {
                this.showNotification('Maximum must be greater than minimum', 'error');
                return;
            }
            
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            resultDisplay.textContent = randomNumber;
            generateAgainBtn.style.display = 'inline-flex';
            
            this.showNotification('Random number generated!');
        };
        
        generateBtn?.addEventListener('click', generateNumber);
        generateAgainBtn?.addEventListener('click', generateNumber);
    }

    // URL Shortener
    setupURLShortener() {
        const shortenBtn = document.getElementById('shorten-url');
        const copyBtn = document.getElementById('copy-short-url');
        const longUrlInput = document.getElementById('long-url');
        const customAliasInput = document.getElementById('custom-alias');
        const resultArea = document.getElementById('url-result');
        
        shortenBtn?.addEventListener('click', () => {
            const longUrl = longUrlInput.value.trim();
            const customAlias = customAliasInput.value.trim();
            
            if (!longUrl) {
                this.showNotification('Please enter a URL to shorten', 'error');
                return;
            }
            
            if (!this.isValidUrl(longUrl)) {
                this.showNotification('Please enter a valid URL', 'error');
                return;
            }
            
            this.shortenUrl(longUrl, customAlias);
        });
        
        copyBtn?.addEventListener('click', () => {
            this.copyToClipboard('shortened-url');
        });
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    shortenUrl(longUrl, customAlias) {
        // Generate a short URL (client-side simulation)
        const baseUrl = 'https://short.ly/';
        const shortCode = customAlias || this.generateShortCode();
        const shortUrl = baseUrl + shortCode;
        
        // Update UI
        document.getElementById('shortened-url').value = shortUrl;
        document.getElementById('original-length').textContent = longUrl.length;
        document.getElementById('shortened-length').textContent = shortUrl.length;
        document.getElementById('saved-chars').textContent = longUrl.length - shortUrl.length;
        
        document.getElementById('url-result').style.display = 'block';
        this.showNotification('URL shortened successfully!');
        
        // Store in localStorage for history
        this.saveUrlToHistory(longUrl, shortUrl);
    }

    generateShortCode() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    saveUrlToHistory(longUrl, shortUrl) {
        const history = JSON.parse(localStorage.getItem('urlHistory') || '[]');
        history.unshift({ longUrl, shortUrl, date: new Date().toISOString() });
        if (history.length > 50) history.pop(); // Keep only last 50
        localStorage.setItem('urlHistory', JSON.stringify(history));
    }

    // Base64 Converter
    setupBase64Converter() {
        const tabBtns = document.querySelectorAll('#base64-converter-modal .tab-btn');
        const tabContents = document.querySelectorAll('#base64-converter-modal .tab-content');
        const encodeBtn = document.getElementById('encode-base64');
        const decodeBtn = document.getElementById('decode-base64');
        const copyEncodedBtn = document.getElementById('copy-encoded');
        const copyDecodedBtn = document.getElementById('copy-decoded');
        
        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Update tab buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${targetTab}-tab`) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Encode functionality
        encodeBtn?.addEventListener('click', () => {
            const text = document.getElementById('text-to-encode').value;
            if (!text) {
                this.showNotification('Please enter text to encode', 'error');
                return;
            }
            
            try {
                const encoded = btoa(unescape(encodeURIComponent(text)));
                document.getElementById('encoded-result').value = encoded;
                this.showNotification('Text encoded to Base64 successfully!');
            } catch (error) {
                this.showNotification('Error encoding text', 'error');
            }
        });
        
        // Decode functionality
        decodeBtn?.addEventListener('click', () => {
            const base64 = document.getElementById('base64-to-decode').value.trim();
            if (!base64) {
                this.showNotification('Please enter Base64 string to decode', 'error');
                return;
            }
            
            try {
                const decoded = decodeURIComponent(escape(atob(base64)));
                document.getElementById('decoded-result').value = decoded;
                this.showNotification('Base64 decoded successfully!');
            } catch (error) {
                this.showNotification('Invalid Base64 string', 'error');
            }
        });
        
        // Copy buttons
        copyEncodedBtn?.addEventListener('click', () => {
            this.copyToClipboard('encoded-result');
        });
        
        copyDecodedBtn?.addEventListener('click', () => {
            this.copyToClipboard('decoded-result');
        });
        
        // Real-time encoding/decoding
        document.getElementById('text-to-encode')?.addEventListener('input', (e) => {
            if (e.target.value) {
                try {
                    const encoded = btoa(unescape(encodeURIComponent(e.target.value)));
                    document.getElementById('encoded-result').value = encoded;
                } catch (error) {
                    document.getElementById('encoded-result').value = 'Invalid input';
                }
            } else {
                document.getElementById('encoded-result').value = '';
            }
        });
    }

    // JSON Formatter
    setupJSONFormatter() {
        const formatBtn = document.getElementById('format-json');
        const minifyBtn = document.getElementById('minify-json');
        const validateBtn = document.getElementById('validate-json');
        const clearBtn = document.getElementById('clear-json');
        const copyBtn = document.getElementById('copy-json');
        const jsonInput = document.getElementById('json-input');
        const jsonOutput = document.getElementById('json-output');
        const jsonInfo = document.getElementById('json-info');
        
        formatBtn?.addEventListener('click', () => {
            const input = jsonInput.value.trim();
            if (!input) {
                this.showNotification('Please enter JSON to format', 'error');
                return;
            }
            
            try {
                const parsed = JSON.parse(input);
                const formatted = JSON.stringify(parsed, null, 2);
                jsonOutput.value = formatted;
                this.showJsonInfo(parsed, 'formatted');
                this.showNotification('JSON formatted successfully!');
            } catch (error) {
                this.showJsonError(error.message);
            }
        });
        
        minifyBtn?.addEventListener('click', () => {
            const input = jsonInput.value.trim();
            if (!input) {
                this.showNotification('Please enter JSON to minify', 'error');
                return;
            }
            
            try {
                const parsed = JSON.parse(input);
                const minified = JSON.stringify(parsed);
                jsonOutput.value = minified;
                this.showJsonInfo(parsed, 'minified');
                this.showNotification('JSON minified successfully!');
            } catch (error) {
                this.showJsonError(error.message);
            }
        });
        
        validateBtn?.addEventListener('click', () => {
            const input = jsonInput.value.trim();
            if (!input) {
                this.showNotification('Please enter JSON to validate', 'error');
                return;
            }
            
            try {
                const parsed = JSON.parse(input);
                this.showJsonInfo(parsed, 'valid');
                this.showNotification('JSON is valid!');
            } catch (error) {
                this.showJsonError(error.message);
            }
        });
        
        clearBtn?.addEventListener('click', () => {
            jsonInput.value = '';
            jsonOutput.value = '';
            jsonInfo.innerHTML = '';
            jsonInfo.className = 'json-info';
        });
        
        copyBtn?.addEventListener('click', () => {
            this.copyToClipboard('json-output');
        });
    }

    showJsonInfo(parsed, action) {
        const jsonInfo = document.getElementById('json-info');
        const size = JSON.stringify(parsed).length;
        const keys = this.countJsonKeys(parsed);
        
        jsonInfo.className = 'json-info success';
        jsonInfo.innerHTML = `
            <strong>✓ Valid JSON ${action}</strong><br>
            Size: ${size} characters<br>
            Keys: ${keys}<br>
            Type: ${Array.isArray(parsed) ? 'Array' : typeof parsed}
        `;
    }

    showJsonError(message) {
        const jsonInfo = document.getElementById('json-info');
        jsonInfo.className = 'json-info error';
        jsonInfo.innerHTML = `<strong>✗ Invalid JSON</strong><br>${message}`;
        this.showNotification('Invalid JSON format', 'error');
    }

    countJsonKeys(obj) {
        if (typeof obj !== 'object' || obj === null) return 0;
        if (Array.isArray(obj)) return obj.length;
        return Object.keys(obj).length;
    }

    // Enhanced Features
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to open search (future feature)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Future: Open tool search
            }
            
            // Escape to close modal
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
            
            // Ctrl/Cmd + Enter to execute primary action in modals
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && this.currentModal) {
                e.preventDefault();
                const primaryBtn = this.currentModal.querySelector('.btn--primary');
                if (primaryBtn) primaryBtn.click();
            }
        });
    }

    setupToolUsageTracking() {
        // Track tool usage for analytics (stored locally)
        const originalOpenModal = this.openModal.bind(this);
        this.openModal = function(toolName) {
            this.trackToolUsage(toolName);
            return originalOpenModal(toolName);
        };
    }
    
    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe tool cards for stagger animation
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe other sections
        const sections = document.querySelectorAll('.about__content, .contact__content');
        sections.forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
    }
    
    setupParallaxEffects() {
        // Simple parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.home__blob');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px) scale(1)`;
            });
        });
    }

    trackToolUsage(toolName) {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
        usage[toolName] = (usage[toolName] || 0) + 1;
        usage.lastUsed = new Date().toISOString();
        localStorage.setItem('toolUsage', JSON.stringify(usage));
    }

    getMostUsedTools() {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
        return Object.entries(usage)
            .filter(([key]) => key !== 'lastUsed')
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }

    // Utility Functions
    copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.select();
            document.execCommand('copy');
            this.showNotification('Copied to clipboard!');
        }
    }

    downloadCanvas(canvas, filename) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL();
        link.click();
        this.showNotification(`${filename} downloaded successfully!`);
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.success}</span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Add click to dismiss
        notification.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 4000);
    }
    
    hideNotification(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
}

// Global function for color picker copy buttons
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.select();
        document.execCommand('copy');
        
        // Use the main notification system
        if (window.allInOneTools) {
            window.allInOneTools.showNotification('Copied to clipboard!');
        } else {
            // Fallback notification
            const notification = document.createElement('div');
            notification.className = 'notification success show';
            notification.innerHTML = `
                <span class="notification-icon">✓</span>
                <span class="notification-message">Copied to clipboard!</span>
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.allInOneTools = new AllInOneTools();
    
    // Add loading animation to tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Performance optimization: Lazy load non-critical features
window.addEventListener('load', () => {
    // Add any post-load optimizations here
    console.log('All-in-One Tools loaded successfully!');
});
