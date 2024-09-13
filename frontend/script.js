document.addEventListener('DOMContentLoaded', () => {
    // Llamar al backend para obtener la lista de usuarios
    getUsers();

    // Manejador para el formulario de registro de usuario
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Obtener los valores de los campos del formulario
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const password = document.getElementById('password').value;

        // Depuración: Imprimir los datos que se enviarán al servidor
        console.log("Enviando datos:", { nombres, apellidos, fecha_nacimiento, password });

        try {
            // Enviar la solicitud POST al backend
            const response = await fetch('http://ec2-54-161-153-207.compute-1.amazonaws.com:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombres: nombres,
                    apellidos: apellidos,
                    fecha_nacimiento: fecha_nacimiento,
                    password: password
                })
            });

            // Parsear la respuesta en formato JSON
            const result = await response.json();

            // Depuración: Imprimir la respuesta del servidor
            console.log("Respuesta recibida:", result);

            if (response.ok) {
                // Mostrar un mensaje de éxito y limpiar el formulario
                alert(result.message);
                form.reset();  // Limpiar el formulario
                getUsers();  // Actualizar la lista de usuarios
            } else {
                // Mostrar un mensaje de error si algo falló
                alert('Error: ' + result.error);
            }
        } catch (error) {
            // Capturar y mostrar cualquier error que ocurra durante la solicitud
            console.error('Error al enviar la solicitud:', error);
        }
    });
});

// Función para obtener la lista de usuarios desde el backend
async function getUsers() {
    try {
        // Enviar la solicitud GET al backend
        const response = await fetch('http://54.161.153.207:5000/users');
        const users = await response.json();

        // Depuración: Imprimir la lista de usuarios obtenida
        console.log("Usuarios recibidos:", users);

        // Limpiar la lista de usuarios existente en el DOM
        const usersList = document.getElementById('users');
        usersList.innerHTML = '';

        // Agregar cada usuario a la lista en el DOM
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user[0]} ${user[1]}`;
            usersList.appendChild(li);
        });
    } catch (error) {
        // Capturar y mostrar cualquier error durante la solicitud
        console.error('Error obteniendo usuarios:', error);
    }
}