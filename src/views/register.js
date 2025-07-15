import { enpointUsers } from "../main";

export default function register() {
    // get the main container where the content goes
    const app = document.getElementById('app');

    // show the registration form
    app.innerHTML = `
    <div class="container-register">
        <h2>REGISTER</h2>
        <input id="fullname" placeholder="Full name" />
        <input id="username" placeholder="User name" />
        <input id="password" type="password" placeholder="Password" />
        <select id="role">
            <option value="user">User</option>
        </select>
        <button id="registerBtn">Create Account</button>
        <p>¿Do you already have an account?? <a href="#/login">Sign in</a></p>
    </div>`;

    // Event for when the user clicks Create Account
    document.getElementById('registerBtn').addEventListener('click', async () => {
        // Obtenemos los valores del formulario
        const fullname = document.getElementById('fullname').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        // validate that no field is empty
        if (!fullname || !username || !password) {
            alert('Fill in all fields');
            return;
        }

        try {
            // get the list of users from the "database" (JSON Server)
            const res = await fetch(enpointUsers); //change the url
            const users = await res.json();

            // Verificamos si ya existe un usuario con ese nombre
            const exists = users.find(u => u.username === username);

            if (exists) {
                alert('That user already exists');
                return;
            }

            // create the new user with the entered data
            const nuevo = {
                fullname,
                username,
                password,
                role
            };

            // We send the new user to the database using POST
            const post = await fetch(enpointUsers, {  //change the url
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevo)
            });

            // If it was saved correctly, we will notify you and redirect you to login.
            if (post.ok) {
                alert('Successfully created user');
                location.hash = '#/login';
            } else {
                alert('Error creating user');
            }

        } catch (error) {
            // Si hay algún error, lo mostramos en consola
            console.error('Error al registrarse:', error);
        }
    });
}