
// Inicialización de la aplicación Electron
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos de la UI
    const licenseValidation = document.getElementById('licenseValidation');
    const mainScreen = document.getElementById('mainScreen');
    const processingView = document.getElementById('processingView');
    const resultsModal = document.getElementById('resultsModal');
    const uploadContainer = document.getElementById('uploadContainer');
    const fileInput = document.getElementById('fileInput');
    const startButton = document.getElementById('startButton');
    const closeResults = document.getElementById('closeResults');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const currentFile = document.getElementById('currentFile');

    /**
     * FASE 1: Validación de Licencia
     * Esta fase simula la verificación de la licencia del sistema
     */
    setTimeout(() => {
        licenseValidation.classList.add('hidden');
        mainScreen.classList.remove('hidden');
    }, 2000);

    /**
     * FASE 2: Selección de Archivo Excel
     * Manejo de eventos para la selección de archivo mediante drag & drop o click
     */
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Efectos visuales para el drag & drop
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadContainer.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadContainer.classList.add('drag-active');
    }

    function unhighlight() {
        uploadContainer.classList.remove('drag-active');
    }

    // Eventos de selección de archivo
    uploadContainer.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);
    uploadContainer.addEventListener('drop', handleDrop);

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && isValidExcelFile(file)) {
            updateUploadContainer(file);
            startButton.disabled = false;
        }
    }

    function handleDrop(e) {
        const file = e.dataTransfer.files[0];
        if (file && isValidExcelFile(file)) {
            updateUploadContainer(file);
            startButton.disabled = false;
        }
        unhighlight();
    }

    // Validación de archivo Excel
    function isValidExcelFile(file) {
        return file.type.includes('excel') || 
               file.type.includes('spreadsheet') || 
               file.name.endsWith('.xlsx') || 
               file.name.endsWith('.xls');
    }

    // Actualización visual del contenedor de archivo
    function updateUploadContainer(file) {
        const uploadContent = uploadContainer.querySelector('.upload-content');
        uploadContent.innerHTML = `
            <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
            </div>
            <p class="file-name">${file.name}</p>
            <p class="file-status">Archivo seleccionado</p>
        `;
    }

    /**
     * FASE 3: Proceso de Scraping
     * Manejo del proceso de scraping y actualización de la UI
     */
    startButton.addEventListener('click', () => {
        mainScreen.classList.add('hidden');
        processingView.classList.remove('hidden');
        simulateProcessing();
    });

    function simulateProcessing() {
        let progress = 0;
        const totalFiles = 98;
        const interval = setInterval(() => {
            progress += 1;
            progressFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            currentFile.textContent = Math.floor((progress / 100) * totalFiles);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(showResults, 500);
            }
        }, 50);
    }

    /**
     * FASE 4: Resultados
     * Visualización y manejo de los resultados del scraping
     */
    function showResults() {
        processingView.classList.add('hidden');
        resultsModal.classList.remove('hidden');
    }

    // Evento para cerrar resultados y reiniciar proceso
    closeResults.addEventListener('click', () => {
        resultsModal.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        resetUploadContainer();
        startButton.disabled = true;
    });

    function resetUploadContainer() {
        fileInput.value = '';
        const uploadContent = uploadContainer.querySelector('.upload-content');
        uploadContent.innerHTML = `
            <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
            </div>
            <p>Arrastra un archivo Excel o haz clic para seleccionar</p>
        `;
    }
});
