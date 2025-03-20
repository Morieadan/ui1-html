
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
let mockContactsTotal = 95; // Expedientes revisados
let mockFilteredTotal = 8; // Expedientes con costo
let mockAcceptedTotal = 7; // Expedientes aceptados
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
            title = title || 'Éxito';
            break;
        case 'error':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
            title = title || 'Error';
            break;
        case 'warning':
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
            title = title || 'Advertencia';
            break;
        default:
            iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
            title = title || 'Información';
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
    selectFileBtn.querySelector('.button-text').textContent = 'ESCANEANDO...';
    
    // Create a file input element for file selection
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Trigger click on file input
    fileInput.click();
    
    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            // Get the selected file
            selectedFile = e.target.files[0];
            
            // Update UI with file info
            noFileSelected.classList.add('hidden');
            fileInfo.classList.remove('hidden');
            fileName.textContent = selectedFile.name;
            fileSize.textContent = formatBytes(selectedFile.size);
            
            // Enable the start process button
            startProcessBtn.disabled = false;
            
            // Show success toast
            showToast('Archivo seleccionado correctamente', 'success', 'Archivo Listo');
        } else {
            // Reset button state
            selectFileBtn.disabled = false;
            selectFileBtn.querySelector('.button-text').textContent = 'SELECCIONAR EXCEL';
            
            // Show warning toast
            showToast('No se seleccionó ningún archivo', 'warning', 'Atención');
        }
        
        // Reset button state
        selectFileBtn.disabled = false;
        selectFileBtn.querySelector('.button-text').textContent = 'SELECCIONAR EXCEL';
        
        // Remove the file input element
        document.body.removeChild(fileInput);
    });
});

startProcessBtn.addEventListener('click', () => {
    if (!selectedFile) return;

    // Show processing info
    startProcessing();
    
    // Show info toast
    showToast('Proceso iniciado', 'info', 'Procesando');
});

closeModalBtn.addEventListener('click', () => {
    // Hide the modal with animation
    resultsModal.classList.remove('visible');
    setTimeout(() => {
        resultsModal.classList.add('hidden');
    }, 300);
    
    // Show completed toast
    showToast('Proceso completado con éxito', 'success', 'Completado');
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
        
        // Update circle progress - percentage of expedientes con costo/total
        updateCircleProgress(progress * 0.08); // 8% for filtered/total ratio
        
        // Update real-time results with expediente display
        const processedCount = Math.floor((progress / 100) * mockContactsTotal);
        const filteredCount = Math.floor(processedCount * 0.08);
        
        updateProcessingMessage(progress);
        updateRealtimeResults(processedCount, filteredCount);
    }, 200);
}

function updateProcessingMessage(progress) {
    const processingStatus = document.querySelector('.processing-status p');
    if (progress < 10) {
        processingStatus.textContent = 'Inicializando navegador...';
    } else if (progress < 30) {
        processingStatus.textContent = 'Conectando a la base de datos...';
    } else if (progress < 60) {
        processingStatus.textContent = 'Analizando expedientes...';
    } else if (progress < 90) {
        processingStatus.textContent = 'Procesando información...';
    } else {
        processingStatus.textContent = 'Finalizando proceso...';
    }
}

function updateProgress(value) {
    const percent = Math.round(value);
    progressFill.style.width = `${percent}%`;
    progressPercentage.textContent = `${percent}%`;
}

function updateRealtimeResults(expedientes, expedientesConCosto) {
    // Generate sample expediente records as processing progresses
    const expedientesArray = [];
    
    // Add sample expedientes data
    if (expedientes >= 15) {
        expedientesArray.push('<p>✓ Expediente: 20711475 - Fila: 2</p>');
    }
    if (expedientes >= 30) {
        expedientesArray.push('<p>✓ Expediente: 20709293 - Fila: 3</p>');
    }
    if (expedientes >= 45) {
        expedientesArray.push('<p>✓ Expediente: 20709019 - Fila: 4</p>');
    }
    if (expedientes >= 60) {
        expedientesArray.push('<p>✓ Expediente: 20706294 - Fila: 5</p>');
    }
    if (expedientes >= 75) {
        expedientesArray.push('<p>✓ Expediente: 20706202 - Fila: 6</p>');
    }
    if (expedientes >= 85) {
        expedientesArray.push('<p>✓ Expediente: 20704111 - Fila: 7</p>');
    }
    if (expedientes >= 95) {
        expedientesArray.push('<p>✓ Expediente: 20703175 - Fila: 8</p>');
    }
    
    // Update the results panel in real-time
    resultsSummary.innerHTML = `
        <p>Expedientes procesados: <strong>${expedientes}</strong></p>
        <p>Expedientes con costo: <strong>${expedientesConCosto}</strong></p>
        ${expedientesArray.join('')}
    `;
}

function finishProcessing() {
    // Calculate elapsed time
    const elapsedTime = ((performance.now() - startTime) / 1000).toFixed(1);
    
    // Update circle progress to final value (8%)
    updateCircleProgress(8);
    
    // Hide processing section with animation
    processingSection.classList.add('hidden');
    
    // Show the results modal with animation
    resultsModal.classList.remove('hidden');
    setTimeout(() => resultsModal.classList.add('visible'), 10);
    
    // Add detailed results
    resultsSummary.innerHTML = `
        <p>Procesados <strong class="highlight">${mockContactsTotal}</strong> expedientes en total.</p>
        <p>Encontrados <strong class="highlight">${mockFilteredTotal}</strong> expedientes con costo.</p>
        <p>Aceptados <strong class="highlight">${mockAcceptedTotal}</strong> expedientes.</p>
        <p>Tiempo de procesamiento: <strong>${elapsedTime}s</strong></p>
        <p>Resultados guardados en <strong>C:/Data/expedientes_resultados.xlsx</strong></p>
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
        showToast('Licencia validada correctamente', 'success', 'Bienvenido');
    }, 3000);
});
