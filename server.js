const express = require('express');
const { readTasks, writeTasks, generateId } = require('./fileUtils');
const app = express();
const PORT = 3000;

app.use(express.json());

// ==== URL BASE ==== 

// server.js (Ruta GET /)

app.get('/', (req, res) => {
    // Usamos comillas invertidas (backticks ``) para escribir HTML multi-línea
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>API de Gestión de Tareas (M6_AE5_ABP)</title>
            <style>
                body { font-family: sans-serif; margin: 40px; background-color: #f4f4f9; color: #333; }
                h1 { color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
                h2 { color: #28a745; margin-top: 30px; }
                code { background-color: #eee; padding: 2px 5px; border-radius: 4px; }
                .instructions { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #e9ecef; }
            </style>
        </head>
        <body>
            <h1>Servidor de Tareas (API RESTful)</h1>
            <p><strong>Ejercicio:</strong> M6_AE5_ABP - Gestión de Tareas con persistencia en archivos JSON.</p>
            <p>La API está en funcionamiento. Utiliza un cliente HTTP como <strong>Postman</strong> para interactuar con las siguientes rutas:</p>

            <div class="instructions">
                <h2>Rutas de la API (CRUD)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Método</th>
                            <th>Ruta</th>
                            <th>Descripción</th>
                            <th>Body (JSON)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/tasks</code></td>
                            <td>Obtiene el listado completo de todas las tareas.</td>
                            <td>No requerido</td>
                        </tr>
                        <tr>
                            <td><code>POST</code></td>
                            <td><code>/tasks</code></td>
                            <td>Crea una nueva tarea.</td>
                            <td><code>{"title": "Nueva Tarea"}</code></td>
                        </tr>
                        <tr>
                            <td><code>PUT</code></td>
                            <td><code>/tasks/:id</code></td>
                            <td>Actualiza una tarea específica por su ID.</td>
                            <td><code>{"title": "Nuevo Título"}</code> o <code>{"completed": true}</code></td>
                        </tr>
                        <tr>
                            <td><code>DELETE</code></td>
                            <td><code>/tasks/:id</code></td>
                            <td>Elimina una tarea específica por su ID.</td>
                            <td>No requerido</td>
                        </tr>
                    </tbody>
                </table>
                
                <h2>Instrucciones para Postman</h2>
                <p>Asegúrate de configurar el tipo de cuerpo para las peticiones <code>POST</code> y <code>PUT</code> como <strong>Body → raw → JSON</strong>.</p>
                <p><strong>Ejemplo de uso de ID:</strong> Para <code>PUT</code> o <code>DELETE</code>, reemplaza <code>:id</code> en la URL por un ID real obtenido con la petición <code>GET</code>.</p>
            </div>
        </body>
        </html>
    `);
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