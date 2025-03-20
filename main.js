
/**
 * IKE Expedientes Automation
 * Script principal para la aplicación de escritorio Electron
 * Maneja la interfaz de usuario y la comunicación con el backend de scraping
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos de la UI para cada vista
    
    // Vista de validación de licencia
    const licenseValidation = document.getElementById('licenseValidation');
    
    // Vista principal
    const mainScreen = document.getElementById('mainScreen');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const startProcessBtn = document.getElementById('startProcessBtn');
    const fileStatus = document.getElementById('fileStatus');
    const resultsContent = document.getElementById('resultsContent');
    
    // Vista de procesamiento
    const processingView = document.getElementById('processingView');
    const currentFile = document.getElementById('currentFile');
    const totalFiles = document.getElementById('totalFiles');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    
    // Vista de resultados
    const resultsModal = document.getElementById('resultsModal');
    const closeResults = document.getElementById('closeResults');

    /**
     * FASE 1: Inicialización y validación de licencia
     * Esta fase simula la verificación de la licencia del sistema
     */
    function initApp() {
        console.log('Iniciando aplicación IKE Expedientes Automation');
        // Simulación de validación de licencia (en un caso real, esto se conectaría con el backend)
        setTimeout(() => {
            licenseValidation.classList.add('hidden');
            mainScreen.classList.remove('hidden');
        }, 2000);
    }

    /**
     * FASE 2: Selección del archivo Excel
     * Manejo de la selección de archivo 
     */
    selectFileBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && isValidExcelFile(file)) {
            updateFileStatus(file);
            startProcessBtn.disabled = false;
        } else if (file) {
            updateFileStatus(null, 'El archivo seleccionado no es un archivo Excel válido.');
            startProcessBtn.disabled = true;
        }
    }

    function isValidExcelFile(file) {
        return file.type.includes('excel') || 
               file.type.includes('spreadsheet') || 
               file.name.endsWith('.xlsx') || 
               file.name.endsWith('.xls');
    }

    function updateFileStatus(file, errorMessage = null) {
        if (errorMessage) {
            fileStatus.innerHTML = `<p class="error-message">${errorMessage}</p>`;
            return;
        }

        if (file) {
            fileStatus.innerHTML = `
                <p class="file-name">Archivo seleccionado: <strong>${file.name}</strong></p>
                <p class="file-size">Tamaño: ${formatFileSize(file.size)}</p>
            `;
        } else {
            fileStatus.innerHTML = `<p>No se seleccionó ningún archivo.</p>`;
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * FASE 3: Inicio y monitoreo del proceso de scraping
     * Maneja el inicio del proceso y muestra el progreso
     */
    startProcessBtn.addEventListener('click', () => {
        // Leer el archivo y enviarlo al backend
        const file = fileInput.files[0];
        if (!file) return;
        
        // Preparar la vista de procesamiento
        mainScreen.classList.add('hidden');
        processingView.classList.remove('hidden');
        
        // Aquí se conectaría con el backend para iniciar el proceso
        // En esta simulación simplemente mostramos el progreso
        simulateProcessing(file);
    });

    function simulateProcessing(file) {
        // Esta función simula el proceso de scraping
        // En una implementación real, esto se comunicaría con el backend de Puppeteer
        
        // Simulación de un total de expedientes
        const totalExpedientes = Math.floor(Math.random() * 95) + 5; // Entre 5 y 100 expedientes
        totalFiles.textContent = totalExpedientes;
        
        let expedientesCompletados = 0;
        
        // Actualizar el progreso periódicamente
        const interval = setInterval(() => {
            expedientesCompletados++;
            currentFile.textContent = expedientesCompletados;
            
            const progress = Math.floor((expedientesCompletados / totalExpedientes) * 100);
            progressFill.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            // Actualizar los resultados en tiempo real
            updateResults(expedientesCompletados, totalExpedientes);
            
            if (expedientesCompletados >= totalExpedientes) {
                clearInterval(interval);
                setTimeout(showResultsModal, 1000, expedientesCompletados, totalExpedientes);
            }
        }, 200);
    }

    function updateResults(completed, total) {
        // Actualiza la sección de resultados en tiempo real durante el proceso
        // En una implementación real, estos datos vendrían del backend
        
        const conCosto = Math.floor(completed * 0.15); // Simular ~15% con costo
        const aceptados = Math.floor(completed * 0.10); // Simular ~10% aceptados
        
        resultsContent.innerHTML = `
            <div class="results-summary">
                <p><strong>Expedientes procesados:</strong> ${completed} de ${total}</p>
                <p><strong>Con costo:</strong> ${conCosto}</p>
                <p><strong>Aceptados:</strong> ${aceptados}</p>
            </div>
        `;
    }

    /**
     * FASE 4: Mostrar resultados finales
     * Muestra los resultados completos del proceso al finalizar
     */
    function showResultsModal(processed, total) {
        // Actualizar estadísticas en el modal de resultados
        const conCosto = Math.floor(processed * 0.15);
        const aceptados = Math.floor(processed * 0.10);
        
        // Actualizar los valores en el modal
        document.querySelector('[data-stat="total-processed"] .stat-value').textContent = processed;
        document.querySelector('[data-stat="with-cost"] .stat-value').textContent = conCosto;
        document.querySelector('[data-stat="accepted"] .stat-value').textContent = aceptados;
        
        // Mostrar el modal
        resultsModal.classList.remove('hidden');
    }

    // Evento para cerrar el modal de resultados
    closeResults.addEventListener('click', () => {
        resultsModal.classList.add('hidden');
        processingView.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        
        // Restablecer el estado
        resetAppState();
    });

    function resetAppState() {
        // Limpiar la selección de archivo
        fileInput.value = '';
        updateFileStatus(null);
        startProcessBtn.disabled = true;
        
        // Restablecer progreso
        progressFill.style.width = '0%';
        progressPercentage.textContent = '0%';
        currentFile.textContent = '0';
        totalFiles.textContent = '0';
        
        // Limpiar resultados
        resultsContent.innerHTML = '';
    }

    // Iniciar la aplicación
    initApp();
});
