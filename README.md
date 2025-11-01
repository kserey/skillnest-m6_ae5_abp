# ⚙️ API RESTful de Gestión de Tareas (M6_AE5_ABP)

Este repositorio contiene la solución para el **Ejercicio Individual M6_AE5_ABP** del Bootcamp Full Stack de Skillnest.

El proyecto es una API RESTful simple desarrollada con **Node.js** y **Express.js** que implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar). La persistencia de los datos se realiza sin una base de datos tradicional, utilizando archivos **JSON** y el módulo nativo **`fs`** (File System) de Node.js.

## ✨ Características Principales

* **API Pura:** Diseño enfocado únicamente en servir datos (no hay vistas HTML).
* **Persistencia en JSON:** Las tareas se almacenan en `tasks.json`.
* **Modularización:** La lógica de lectura/escritura de archivos está completamente separada en `fileUtils.js`, haciendo que `server.js` sea limpio y se enfoque solo en las rutas.
* **Métodos Síncronos:** Uso de `fs.readFileSync()` y `fs.writeFileSync()` como se requirió en el ejercicio.

## 🛠️ Tecnologías Utilizadas

* **Node.js / Express.js:** Servidor web y rutas.
* **Módulo `fs` (File System):** Manejo de la persistencia de datos en disco.
* **JSON:** Formato de almacenamiento de las tareas.

## 📂 Estructura del Proyecto
```
.
├── node_modules/ # (Ignorada por .gitignore)
├── printsPostman/ # Evidencia de pruebas de la API (Screenshots)
│ ├── tasks_delete.png
│ ├── tasks_get.png
│ ├── tasks_post.png
│ └── tasks_put.png
├── fileUtils.js # Módulo de utilidades para leer/escribir en tasks.json
├── server.js # Servidor Express y definición de rutas (API)
├── tasks.json # Archivo de persistencia (almacena las tareas)
├── package.json
├── package-lock.json
└── .gitignore
```

## 🚀 Puesta en Marcha

Para iniciar el servidor y probar la API:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/kserey/skillnest-m6_ae5_abp.git](https://github.com/kserey/skillnest-m6_ae5_abp.git)
    cd skillnest-m6_ae5_abp
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar el servidor:**
    ```bash
    node server.js
    ```
    El servidor se ejecutará en `http://localhost:3000`.

## 🔬 Uso de la API con Postman

La API se gestiona completamente a través de peticiones HTTP en la ruta base `/tasks`. Asegúrate de configurar el tipo de cuerpo para `POST` y `PUT` como **`Body` → `raw` → `JSON`**.

| Método | Ruta | Descripción | Body (JSON Requerido) |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/` | **Ruta de Bienvenida** (Instrucciones). | N/A |
| `GET` | `http://localhost:3000/tasks` | Obtiene el listado completo de todas las tareas. | N/A |
| `POST` | `http://localhost:3000/tasks` | Crea una nueva tarea (genera automáticamente `id` y `completed: false`). | `{"title": "Mi nueva tarea"}` |
| `PUT` | `http://localhost:3000/tasks/:id` | Actualiza el `title` o el estado `completed` de una tarea específica. | `{"completed": true}` o `{"title": "Título corregido"}` |
| `DELETE` | `http://localhost:3000/tasks/:id` | Elimina una tarea según el ID proporcionado en la URL. | N/A |

**Nota sobre `:id`:** Para las operaciones `PUT` y `DELETE`, debes reemplazar `:id` con un ID real de una tarea que exista en el archivo `tasks.json`.
