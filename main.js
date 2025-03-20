
// DOM Elements
const selectFileBtn = document.getElementById('selectFileBtn');
const startProcessBtn = document.getElementById('startProcessBtn');
const noFileSelected = document.getElementById('noFileSelected');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const processingSection = document.getElementById('processingSection');
const progressFill = document.getElementById('progressFill');
const progressPercentage = document.getElementById('progressPercentage');
const resultsModal = document.getElementById('resultsModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const totalContacts = document.getElementById('totalContacts');
const totalFiltered = document.getElementById('totalFiltered');
const processingTime = document.getElementById('processingTime');
const resultsSummary = document.getElementById('resultsSummary');
const licenseValidation = document.getElementById('licenseValidation');
const mainApp = document.getElementById('mainApp');
const currentTime = document.getElementById('currentTime');
const circleProgress = document.getElementById('circleProgress');
const circlePercentage = document.getElementById('circlePercentage');

// State variables
let selectedFile = null;
let startTime = null;
let mockContactsTotal = 583; // Mock data for demo purposes
let mockFilteredTotal = 397; // Mock data for demo purposes
let activeToasts = [];

// Utility functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showToast(message, type = 'info', title = '') {
    const toastContainer = document.getElementById('toastContainer');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Generate appropriate icon based on type
    let iconSvg = '';
    switch(type) {
        case 'success':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
            title = title || 'Success';
            break;
        case 'error':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
            title = title || 'Error';
            break;
        case 'warning':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
            title = title || 'Warning';
            break;
        default:
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
            title = title || 'Information';
    }
    
    // Set the toast content
    toast.innerHTML = `
        <div class="toast-icon">${iconSvg}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    // Add to the DOM
    toastContainer.appendChild(toast);
    
    // Add to active toasts array
    activeToasts.push(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Remove after timeout
    const toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
            activeToasts = activeToasts.filter(t => t !== toast);
        }, 300);
    }, 5000);
    
    // Add click to dismiss
    toast.addEventListener('click', () => {
        clearTimeout(toastTimeout);
        toast.classList.remove('visible');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
            activeToasts = activeToasts.filter(t => t !== toast);
        }, 300);
    });
}

function updateCircleProgress(percent) {
    // Calculate the stroke-dashoffset value
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    // Apply the dashoffset to the circle
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleProgress.style.strokeDashoffset = offset;
    
    // Update the percentage text
    circlePercentage.textContent = Math.round(percent);
}

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}:${seconds}`;
}

function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const animate = () => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = Math.round(targetValue).toString();
            return;
        }
        
        element.textContent = Math.round(currentValue).toString();
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Event Listeners
selectFileBtn.addEventListener('click', () => {
    // Add loading state to button
    selectFileBtn.disabled = true;
    selectFileBtn.querySelector('.button-text').textContent = 'SCANNING...';
    
    // Simulate a file selection dialog delay
    setTimeout(() => {
        // Create a mock file object
        selectedFile = {
            name: "contacts_example.xlsx",
            size: 1024 * 1024 * 2.3, // 2.3 MB
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        
        // Update UI with file info
        noFileSelected.classList.add('hidden');
        fileInfo.classList.remove('hidden');
        fileName.textContent = selectedFile.name;
        fileSize.textContent = formatBytes(selectedFile.size);
        
        // Enable the start process button
        startProcessBtn.disabled = false;
        
        // Reset button state
        selectFileBtn.disabled = false;
        selectFileBtn.querySelector('.button-text').textContent = 'SELECT FILE';
        
        // Show success toast
        showToast('File selected successfully', 'success', 'File Ready');
    }, 1500);
});

startProcessBtn.addEventListener('click', () => {
    if (!selectedFile) return;

    // Show processing info
    startProcessing();
    
    // Show info toast
    showToast('Process started', 'info', 'Processing');
});

closeModalBtn.addEventListener('click', () => {
    // Hide the modal with animation
    resultsModal.classList.remove('visible');
    setTimeout(() => {
        resultsModal.classList.add('hidden');
    }, 300);
    
    // Show completed toast
    showToast('Process completed successfully', 'success', 'Completed');
});

// Processing functions
function startProcessing() {
    // Clear previous results
    resultsSummary.innerHTML = '';
    
    // Show processing section with animation
    processingSection.classList.remove('hidden');
    
    // Disable buttons during processing
    selectFileBtn.disabled = true;
    startProcessBtn.disabled = true;
    
    // Record start time
    startTime = performance.now();
    
    // Update the results circle to 0%
    updateCircleProgress(0);
    
    // Simulate progressive processing
    let progress = 0;
    const interval = setInterval(() => {
        // Increase progress with some randomness for realism
        progress += (Math.random() * 3) + 0.5;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Complete the processing
            setTimeout(() => {
                finishProcessing();
            }, 500);
        }
        
        // Update progress UI
        updateProgress(progress);
        
        // Update circle progress
        updateCircleProgress(progress * 0.68); // 68% for filtered/total ratio
        
        // Update real-time results
        const contactsProcessed = Math.floor((progress / 100) * mockContactsTotal);
        const filteredContacts = Math.floor(contactsProcessed * 0.68);
        updateRealtimeResults(contactsProcessed, filteredContacts);
    }, 200);
}

function updateProgress(value) {
    const percent = Math.round(value);
    progressFill.style.width = `${percent}%`;
    progressPercentage.textContent = `${percent}%`;
}

function updateRealtimeResults(contacts, filtered) {
    // Update the results panel in real-time
    resultsSummary.innerHTML = `
        <p>Processed contacts: <strong>${contacts}</strong></p>
        <p>Filtered contacts: <strong>${filtered}</strong></p>
    `;
}

function finishProcessing() {
    // Calculate elapsed time
    const elapsedTime = ((performance.now() - startTime) / 1000).toFixed(1);
    
    // Update circle progress to final value (68%)
    updateCircleProgress(68);
    
    // Hide processing section with animation
    processingSection.classList.add('hidden');
    
    // Show the results modal with animation
    resultsModal.classList.remove('hidden');
    setTimeout(() => resultsModal.classList.add('visible'), 10);
    
    // Add detailed results
    resultsSummary.innerHTML = `
        <p>Processed <strong class="highlight">${mockContactsTotal}</strong> contacts in total.</p>
        <p>Filtered <strong class="highlight">${mockFilteredTotal}</strong> unique contacts.</p>
        <p>Processing time: <strong>${elapsedTime}s</strong></p>
        <p>Results file saved to <strong>C:/Data/results.xlsx</strong></p>
    `;
    
    // Reset buttons
    selectFileBtn.disabled = false;
    startProcessBtn.disabled = false;
    
    // Animate the stat counters
    animateCounter(totalContacts, mockContactsTotal);
    animateCounter(totalFiltered, mockFilteredTotal);
    processingTime.textContent = `${elapsedTime}s`;
    
    // Add animation to stat indicators
    const statIndicators = document.querySelectorAll('.stat-indicator');
    statIndicators.forEach(indicator => {
        setTimeout(() => {
            indicator.style.transform = 'scaleX(1)';
        }, 300);
    });
}

// License validation on app start
document.addEventListener('DOMContentLoaded', () => {
    // Setup SVG gradient for circle progress
    const svgNS = "http://www.w3.org/2000/svg";
    const defs = document.createElementNS(svgNS, "defs");
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "0%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#00b3fe");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#8a5fff");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    
    const circleSvg = document.querySelector('.circle-progress');
    circleSvg.insertBefore(defs, circleSvg.firstChild);
    
    // Set the initial dasharray for the circle
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
    circleProgress.style.strokeDashoffset = circumference;
    
    // Start clock update
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Simulate license validation check
    setTimeout(() => {
        // Success: Hide the license validation screen and show the main app
        licenseValidation.classList.add('hidden');
        mainApp.classList.remove('hidden');
        
        // Show success toast
        showToast('License validated successfully', 'success', 'Welcome');
    }, 3000);
});
