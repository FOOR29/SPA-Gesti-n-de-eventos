// Importamos las vistas que vamos a renderizar según la ruta
import home from './views/home';
import login from './views/login.js';
import register from './views/register.js';
import dashboard from './views/dashboard.js';

// Esta función es la que se encarga de manejar las rutas de la app SPA
export function router() {
    // Si no hay hash en la URL, redirigimos al home por defecto
    if (!location.hash) {
        location.hash = '#/';
        return;
    }

    // Diccionario de rutas cada hash apunta a su vista correspondiente
    const routes = {
        '#/': home,
        '#/login': login,
        '#/register': register,
        '#/dashboard': dashboard
    };

    // Obtenemos la vista según el hash actual
    const view = routes[location.hash] || home;

    // Limpiamos el contenido actual antes de renderizar la nueva vista
    document.getElementById('app').innerHTML = '';

    // Ejecutamos la función que carga la vista
    view();
}