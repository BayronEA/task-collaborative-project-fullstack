Lista de Tareas Colaborativa con Permisos
Crea una aplicación fullstack donde los usuarios puedan crear listas de tareas y compartirlas con otros usuarios con diferentes niveles de permisos.

📌 Backend (Express.js + MongoDB)
Autenticación de usuarios:
Registro con nombre, email y contraseña (hash con bcrypt).
Login con JWT para proteger las rutas.


Gestión de listas de tareas:
📌Un usuario puede crear múltiples listas de tareas.
📌Cada lista tiene un título y una colección de tareas.
📌CRUD de listas y tareas dentro de cada lista.
📌Compartir listas con permisos:

📌Un usuario puede invitar a otros a colaborar en su lista.
Roles: Admin (puede editar/eliminar la lista), Colaborador (puede añadir/completar tareas, pero no eliminar la lista).
Endpoints requeridos:

POST /api/auth/register → Crear usuario.
POST /api/auth/login → Autenticación y generación de token.
POST /api/lists → Crear nueva lista.
GET /api/lists → Listar todas las listas del usuario autenticado.
POST /api/lists/:id/tasks → Agregar tarea a una lista.
PUT /api/lists/:id/tasks/:taskId → Completar tarea.
DELETE /api/lists/:id → Eliminar lista (solo el admin).
POST /api/lists/:id/share → Compartir lista con otro usuario y asignar rol.



📌 Frontend (React + TypeScript)
Pantalla de login y registro.
Dashboard de listas de tareas:
Listar todas las listas del usuario.
Botón para crear una nueva lista.
Opción de compartir la lista con otro usuario.
Dentro de cada lista: Agregar, completar y eliminar tareas.
Gestión de permisos en el frontend:
Un colaborador solo puede agregar/completar tareas.
Un admin puede eliminar listas y cambiar permisos.
Llamadas al backend con axios o fetch.
Manejo de estado con Context API o Zustand.
💡 Extras Opcionales (Si quieres más reto)
Notificaciones en tiempo real cuando alguien edita la lista (usando WebSockets con socket.io).
Dark Mode.
Paginación en la lista de tareas.
📌 Entrega esperada: Repositorio en GitHub con instrucciones en el README.