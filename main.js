
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

// State variables
let selectedFile = null;
let startTime = null;
let mockContactsTotal = 583; // Mock data for demo purposes
let mockFilteredTotal = 397; // Mock data for demo purposes

// Utility functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showToast(message, type = 'info') {
    // Simple toast notification implementation
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Add visible class to trigger animation
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Event Listeners
selectFileBtn.addEventListener('click', () => {
    // Add loading state to button
    selectFileBtn.classList.add('loading');
    selectFileBtn.textContent = 'Selecting...';
    
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
        selectFileBtn.classList.remove('loading');
        selectFileBtn.textContent = 'Select File';
        
        // Show success toast
        showToast('File selected successfully', 'success');
    }, 800);
});

startProcessBtn.addEventListener('click', () => {
    if (!selectedFile) return;

    // Show license validation screen
    document.querySelector('.screen').classList.add('hidden');
    licenseValidation.classList.remove('hidden');
    
    // Simulate license validation
    setTimeout(() => {
        // Hide license validation and show main app again
        licenseValidation.classList.add('hidden');
        document.querySelector('.screen').classList.remove('hidden');
        
        // Start processing
        startProcessing();
        
        // Show info toast
        showToast('Processing started', 'info');
    }, 2000);
});

closeModalBtn.addEventListener('click', () => {
    // Hide the modal with animation
    resultsModal.classList.remove('visible');
    setTimeout(() => {
        resultsModal.classList.add('hidden');
    }, 300);
    
    // Show completed toast
    showToast('Process completed successfully', 'success');
});

// Processing functions
function startProcessing() {
    // Clear previous results
    resultsSummary.innerHTML = '';
    
    // Show processing section with animation
    processingSection.classList.remove('hidden');
    setTimeout(() => processingSection.classList.add('visible'), 10);
    
    // Disable buttons during processing
    selectFileBtn.disabled = true;
    startProcessBtn.disabled = true;
    
    // Record start time
    startTime = performance.now();
    
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
    
    // Update stats in the modal
    totalContacts.textContent = mockContactsTotal.toString();
    totalFiltered.textContent = mockFilteredTotal.toString();
    processingTime.textContent = `${elapsedTime}s`;
    
    // Hide processing section with animation
    processingSection.classList.remove('visible');
    setTimeout(() => {
        processingSection.classList.add('hidden');
        
        // Show the results modal with animation
        resultsModal.classList.remove('hidden');
        setTimeout(() => resultsModal.classList.add('visible'), 10);
    }, 300);
    
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
}

// Initial license validation on app start
document.addEventListener('DOMContentLoaded', () => {
    // Add styles for toast notifications
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            min-width: 200px;
            padding: 15px 20px;
            border-radius: 10px;
            background: var(--surface);
            color: var(--text-primary);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transform: translateY(30px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            border-left: 4px solid var(--primary);
        }
        
        .toast.visible {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-success {
            border-left-color: var(--success);
        }
        
        .toast-error {
            border-left-color: var(--danger);
        }
        
        .toast-info {
            border-left-color: var(--primary);
        }
        
        .toast-warning {
            border-left-color: var(--warning);
        }
        
        .action-button.loading {
            position: relative;
            pointer-events: none;
        }
        
        .action-button.loading::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 15px;
            width: 12px;
            height: 12px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            transform: translateY(-50%);
        }
        
        .processing-info.visible {
            animation: fadeIn 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);

    // Show main screen initially
    document.querySelector('.screen').classList.remove('hidden');
    
    // Simulate initial validation
    setTimeout(() => {
        showToast('Application ready', 'success');
    }, 1000);
});
