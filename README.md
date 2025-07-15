# Event Management SPA

This project is a **Single Page Application (SPA)** built with **Vanilla JavaScript** and **Vite**, allowing users to manage and view events. It features two types of users: **admin** and **regular user**. The **admin** can **create**, **edit**, and **delete** events, while the **regular user** can only **view events** and **reserve**.

---

## Developed by

- **Name:** Forlán Ordoñez  
- **ID:** 1143429216  
- **Clan:** Ciénaga  
- **Email:** nalrofor@gmail.com 

---

##  Technologies used

- **Html 5**
- **CSS**
- **JavaScript**
- **Vite**


###  Authentication
- Login and registration with validation.
- User data is stored in `database.json`.

###  Roles
- `admin`: full access to manage all events.
- `visitor`: can only view events and reserve (cannot edit or delete).

##### user and password:

- **admin:** admin123
- **foor29:** 12345


###  Dashboard View
- Displays a list of all events.
- UI and functionality change based on the logged-in user's role.

---

##  How to run it

**In the terminal,enter the command:**

- npm run dev

**Open another terminal and enter the command:**

- npx json-server public/database