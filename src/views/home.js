export default function home() {
    // get the element where everything will be rendered
    const app = document.getElementById('app');

    // check if there is a user saved in localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // If there is already an active session, we redirect to the dashboard directly
    if (user) {
        location.hash = '#/dashboard';
        return;
    }

    // If there is no session, we show the welcome screen
    app.innerHTML = `
    <div class="container-home">
        <div class="titles-home">
            <h1>Welcome to the event manager</h1>
            <p>manage your events and everything</p>
        </div>
        <div class="buttons">
            <button id="goLogin">Iniciar Sesión</button>
            <button id="goRegister">Registrarse</button>
        </div>
    </div>`;

    // Button that redirects to the login when the user clicks
    document.getElementById('goLogin').addEventListener('click', () => {
        location.hash = '#/login';
    });

    // Button that redirects to the registry when the user clicks
    document.getElementById('goRegister').addEventListener('click', () => {
        location.hash = '#/register';
    });
}