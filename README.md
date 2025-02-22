# CASO DE ESTUDIO 1
## Sistema de gestión de productos alimenticios.
## Descripción: 
Has sido contratado como desarrollador fullstack en la empresa “Soft-Space”, la cual
es una empresa dedicada al desarrollo de aplicaciones empresariales y como parte de la primera
tarea asignada se cuenta con una Base de datos con las siguientes entidades : **Clientes, Pedidos,
Productos y Usuarios**

Ahora bien, con base al modelo presentado se requiere desarrollar un sistema web para el
supermercado “TuTi” el cual debe brindar la siguiente funcionalidad que se detalla a continuación
como parte de los Requisitos del Product Owner.
## Sistema de gestión de productos alimenticios.
-  4 tablas : clientes – pedidos – productos – usuarios
- Módulo – Login
- Módulo – Productos
- Módulo – Clientes
- Módulo – Pedidos
### Módulo – Login
Esta pantalla será la inicial del sistema y presentará un formulario de inicio de sesión con los
siguientes campos:
- Campo de texto: “Usuario”
- Campo de texto: “Clave”
- Botón “Ingresar”
Al ingresar los datos en el formulario se debe verificar que los mismos se encuentren registrados en
la Base de datos, caso contrario se debe presentar un mensaje de alerta “Usuario o contraseña
incorrectos.”

Si los datos ingresados en el formulario son correctos, se debe presentar una pantalla con todos los
productos.
### Módulo – Clientes
- Para este módulo del sistema web solo tendrán acceso los usuarios que hayan iniciado sesión correctamente, si un usuario sin sesión intenta ingresar, se lo debe redireccionar al módulo inicial.
- Si el usuario ingresa a este módulo, se debe mostrar un mensaje de bienvenida.
     
         *“Bienvenido - Nombre del usuario”*
- El usuario en el sistema web debe realizar la gestión (CRUD) de clientes.
### Módulo – Productos
- Para este módulo del sistema web solo tendrán acceso los usuarios que hayan iniciado sesión correctamente, si un usuario sin sesión intenta ingresar, se lo debe redireccionar al módulo inicial.
- Si el usuario ingresa a este módulo, se debe mostrar un mensaje de bienvenida.
 
   *“Bienvenido - Nombre del usuario”*
- El usuario en el sistema web debe realizar la gestión (CRUD) de productos.
### Módulo – Pedidos
- Para este módulo del sistema web solo tendrán acceso los usuarios que hayan iniciado sesión correctamente, si un usuario sin sesión intenta ingresar, se lo debe redireccionar al módulo inicial.
- Si el usuario ingresa a este módulo, se debe mostrar un mensaje de bienvenida. 
  
    *“Bienvenido - Nombre del usuario”*
-  El usuario en el sistema web debe realizar la gestión (CRUD) de reservas en donde:
- Un cliente puede realizar varios pedidos de productos.
- Un producto puede tener asignado varios clientes.
#### De acuerdo con el problema planteado se tiene las siguientes tareas a realizar:
- Diseñar el modelo físico para el Sistema Gestor de Base de datos.
- Implementar el patrón de arquitectura (MVC).
- Diseñar cada una de la interfaz de usuario, teniendo en cuenta las bases para UI y UX.
- Codificar las interfaces de usuario.
- Codificar los endpoints para el inicio de sesión de los usuarios y los endpoints del CRUD de productos.
- Consumir los endpoints del backend.
- Realizar pruebas de rendimiento.
- Desplegar el frontend y backend a un entorno de producción.
- Alojar todo el frontend y backend en un repositorio de GitHub 
