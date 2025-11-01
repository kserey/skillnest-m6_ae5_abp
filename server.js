const express = require('express');
const { readTasks, writeTasks, generateId } = require('./fileUtils');
const app = express();
const PORT = 3000;

app.use(express.json());

// ==== URL BASE ==== 

app.get('/', (req, res) => {
    res.send('<h1>Servidor de Tareas (M6_AE5_ABP) está en funcionamiento. Usa /tasks para interactuar con la API.</h1>');
});

// === CREAR TAREA ===
app.post('/tasks', (req, res) => {

    const tasks = readTasks();
    
    const newTask = {
        id: generateId(),
        title: req.body.title || 'Tarea sin título',
        completed: false
    };

    tasks.push(newTask);

    writeTasks(tasks);
    
    res.status(201).json(newTask);
});

// === LISTAR TODAS LAS TAREAS ===
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});


// === ACTUALIZAR UNA TAREA (PUT /tasks/:id) ===
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    let tasks = readTasks();

    const index = tasks.findIndex(t => t.id === taskId);

    if (index === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    const taskToUpdate = tasks[index];
    
    if (req.body.title !== undefined) {
        taskToUpdate.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
        taskToUpdate.completed = req.body.completed;
    }

    writeTasks(tasks);

    res.json(taskToUpdate);
});


// === ELIMINAR UNA TAREA (DELETE /tasks/:id) ===
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const tasks = readTasks();

    const initialLength = tasks.length;
    const updatedTasks = tasks.filter(t => t.id !== taskId);

    if (updatedTasks.length === initialLength) {
        return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
    }

    writeTasks(updatedTasks);

    res.status(204).send(); 
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});