
// Elementos del DOM
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

// Variable para almacenar la referencia al archivo
let selectedFile = null;
let startTime = null;

// Evento para simular la selección de archivo (en una app real, esto usaría APIs de Electron)
selectFileBtn.addEventListener('click', () => {
    // Simula un diálogo de archivo después de un breve retraso
    setTimeout(() => {
        // Crea un archivo simulado
        selectedFile = {
            name: "contactos_ejemplo.xlsx",
            size: 1024 * 1024 * 2.3, // 2.3 MB
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        
        // Actualiza la interfaz para mostrar el archivo seleccionado
        noFileSelected.classList.add('hidden');
        fileInfo.classList.remove('hidden');
        fileName.textContent = selectedFile.name;
        fileSize.textContent = formatBytes(selectedFile.size);
        
        // Habilita el botón de inicio
        startProcessBtn.disabled = false;
    }, 500);
});

// Función para formatear bytes a una forma legible
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Evento para iniciar el procesamiento
startProcessBtn.addEventListener('click', () => {
    if (!selectedFile) return;

    // Muestra la validación de licencia primero
    licenseValidation.classList.remove('hidden');
    
    // Simula la validación de licencia
    setTimeout(() => {
        licenseValidation.classList.add('hidden');
        
        // Comienza el procesamiento
        startProcessing();
    }, 2000);
});

// Función para iniciar el procesamiento
function startProcessing() {
    // Reinicia valores previos
    resultsSummary.innerHTML = '';
    
    // Muestra la sección de procesamiento
    processingSection.classList.remove('hidden');
    
    // Deshabilita los botones durante el procesamiento
    selectFileBtn.disabled = true;
    startProcessBtn.disabled = true;
    
    // Registra el tiempo de inicio
    startTime = performance.now();
    
    // Simula un procesamiento progresivo
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Finaliza el procesamiento
            processingComplete();
        }
        
        // Actualiza la barra de progreso
        updateProgress(progress);
        
        // Actualiza resultados en tiempo real
        const contactsProcessed = Math.floor((progress / 100) * 583);
        const filteredContacts = Math.floor(contactsProcessed * 0.68);
        updateRealtimeResults(contactsProcessed, filteredContacts);
    }, 200);
}

// Función para actualizar la barra de progreso
function updateProgress(value) {
    const percent = Math.round(value);
    progressFill.style.width = `${percent}%`;
    progressPercentage.textContent = `${percent}%`;
}

// Función para actualizar resultados en tiempo real
function updateRealtimeResults(contacts, filtered) {
    // Actualiza el panel de resultados en tiempo real
    resultsSummary.innerHTML = `
        <p>Contactos procesados: <strong>${contacts}</strong></p>
        <p>Contactos filtrados: <strong>${filtered}</strong></p>
    `;
}

// Función para manejar la finalización del procesamiento
function processingComplete() {
    // Calcula el tiempo transcurrido
    const elapsedTime = ((performance.now() - startTime) / 1000).toFixed(1);
    
    // Actualiza estadísticas en el modal
    totalContacts.textContent = '583';
    totalFiltered.textContent = '397';
    processingTime.textContent = `${elapsedTime}s`;
    
    // Oculta sección de procesamiento
    processingSection.classList.add('hidden');
    
    // Muestra el modal con los resultados
    resultsModal.classList.remove('hidden');
    
    // Añade resultados más detallados
    resultsSummary.innerHTML = `
        <p>Se procesaron <strong class="highlight">583</strong> contactos en total.</p>
        <p>Se filtraron <strong class="highlight">397</strong> contactos únicos.</p>
        <p>Tiempo de procesamiento: <strong>${elapsedTime}s</strong></p>
        <p>El archivo de resultados se guardó en <strong>C:/Datos/resultados.xlsx</strong></p>
    `;
    
    // Reestablece los botones
    selectFileBtn.disabled = false;
    startProcessBtn.disabled = false;
}

// Evento para cerrar el modal
closeModalBtn.addEventListener('click', () => {
    resultsModal.classList.add('hidden');
});

// Validación de licencia simulada al inicio
document.addEventListener('DOMContentLoaded', () => {
    licenseValidation.classList.remove('hidden');
    
    // Simula la validación inicial
    setTimeout(() => {
        licenseValidation.classList.add('hidden');
    }, 1500);
});
