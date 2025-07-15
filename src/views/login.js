import { enpointUsers } from "../main";

export default function login() {
    // select the main container where the content will go
    const app = document.getElementById('app');

    // We render the login form
    app.innerHTML = `
    <div class="container-login">
        <h2>LOGIN</h2>
        <input id="username" placeholder="User name" />
        <input id="password" type="password" placeholder="Password" />
        <button id="loginBtn">Enter</button>
        <p>¿You don't have an account?? <a href="#/register">Sign up</a></p>
    </div>`;

    // Event for the login button
    document.getElementById('loginBtn').addEventListener('click', async () => {
        // Obtenemos los valores ingresados por el usuario
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // validate that the fields are not empty
        if (!username || !password) {
            alert('Fill in all fields');
            return;
        }

        try {
            // We call the API (JSON Server) to get all registered users
            const res = await fetch(enpointUsers);
            const users = await res.json();

            // We look for a user that matches the name and password.
            const user = users.find(u => u.username === username && u.password === password);

            if (!user) {
                alert('User incorrect');
                return;
            }

            // If everything is ok, we save the session in localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // redirect to the dashboard
            location.hash = '#/dashboard';

        } catch (error) {
            // If an error occurs while fetching, we display it in the console.
            console.error('Error adding event:', error);
        }
    });
}