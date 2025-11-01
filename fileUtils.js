const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// ==== FUNCIONES DE UTILIDAD ====

const readTasks = () => {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        // Parsea el contenido JSON a un objeto JavaScript
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer tareas. Devolviendo array vacío.", error.message);
        return [];
    }
};


const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al escribir tareas:", error.message);
    }
};


const generateId = () => {
    return Date.now().toString();
};

module.exports = {
    readTasks,
    writeTasks,
    generateId
};