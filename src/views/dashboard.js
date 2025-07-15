import { enpointEvents } from '../main.js';
import { router } from '../router.js';

// function to load the dashboard according to the type of user
export default function dashboard() {
    const app = document.getElementById('app');
    const user = JSON.parse(localStorage.getItem('user'));

    // If there is no logged in user, we send it to login.
    if (!user) {
        location.hash = '#/login';
        return;
    }

    // show the basic structure of the dashboard
    app.innerHTML = `
    <h2>Hello, ${user.fullname || user.username} (${user.role})</h2>
    <button id="logout">Log out</button>

    ${user.role === 'admin' ? `
        <div class="container-dashboard">
        <h3>Add Event</h3>
            <input id="title" placeholder="Event Title" />
            <input id="description" placeholder="Event Description" />
            <button id="addEvent">Add</button>
    </div>` : ''}

    <h3>Events</h3>
    <div id="eventList"></div>`;

    // Button to log out
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('user');
        location.hash = '#/';
        router(); // redraw the view
    });

    // Function to load and display events
    async function loadEvents() {
        try {
            const res = await fetch(enpointEvents);
            const events = await res.json();

            const list = document.getElementById('eventList');
            list.innerHTML = '';

            events.forEach(event => {
                const div = document.createElement('div');
                div.innerHTML = `
            <p><strong>${event.title}</strong>: ${event.description}</p>

            ${user.role === 'admin' ? `
            <button onclick="editEvent('${event.id}')">Edit</button>
            <button onclick="deleteEvent('${event.id}')">Delete</button>
            ` : `
            <button onclick="reserveEvent('${event.id}')">Reserve</button>
            `}
        `;
                list.appendChild(div);
            });
        } catch (error) {
            console.error('Error loading events:', error);
        }
    }

    // If the user is admin we allow adding events
    if (user.role === 'admin') {
        document.getElementById('addEvent').addEventListener('click', async () => {
            const title = document.getElementById('title').value.trim();
            const description = document.getElementById('description').value.trim();

            if (!title || !description) {
                alert('Fill in both fields');
                return;
            }

            const newEvent = {
                title,
                description,
                userId: String(user.id)
            };

            try {
                await fetch(enpointEvents, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEvent)
                });

                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                loadEvents(); // We reload the events
            } catch (error) {
                console.error('Error adding event:', error);
            }
        });
    }

    // We load events at startup
    loadEvents();
}

// Global function to delete event (admin only)
window.deleteEvent = async function (id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'admin') return; // validate that it is admin

    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
        await fetch(`${enpointEvents}/${id}`, {
            method: 'DELETE'
        });
        location.reload();
    } catch (error) {
        console.error('Error deleting event:', error);
    }
};

// Global function to edit event (admin only)
window.editEvent = async function (id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role !== 'admin') return; // Admin only edits

    const newTitle = prompt('New title');
    const newDescription = prompt('New description');

    if (!newTitle || !newDescription) return;

    try {
        await fetch(`${enpointEvents}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription
            })
        });
        location.reload();
    } catch (error) {
        console.error('Error editing event:', error);
    }
};

// Function to simulate a reservation (normal users)
window.reserveEvent = function (id) {
    alert(`You reserved event #${id}. Thanks for joining!`);
};