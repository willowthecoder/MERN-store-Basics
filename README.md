# 🛍️ Product Management App

A full-stack MERN-based application for creating, viewing, and managing products. Built with **Vite + React + Chakra UI** on the frontend, and **Express + MongoDB** on the backend.

---

## ✨ Features

- ✅ Create new products with name, price, and image URL
- 🧾 View a list of all products
- ✏️ Update or delete products (coming soon)
- 🔗 RESTful API powered by Express
- ⚡ State management using Zustand
- 🎨 Beautiful and responsive UI with Chakra UI
- 🌈 Dark/light mode toggle support

---

## 📁 Folder Structure



root/
│
├── frontend/            # Vite + React client
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/
│       └── App.jsx
│
├── backend/             # Express server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env             # Must contain MONGODB\_URI and PORT
│   └── server.js


---


## 🔗 API Endpoints

* GET /api/products` — fetch all products
* POST /api/products` — create a new product
* PUT /api/products/:id` — update a product (coming soon)
* DELETE /api/products/:id` — delete a product (coming soon)

---

## 🧠 Tech Stack

| Tech       | Purpose                |
| ---------- | ---------------------- |
| Vite       | Fast React development |
| Chakra UI  | Styling & theme UI     |
| Zustand    | Local state management |
| Express.js | RESTful API backend    |
| MongoDB    | NoSQL database         |
| Mongoose   | ODM for MongoDB        |
| dotenv     | Env config management  |


## 🧭 License

This project is open source and available under the [MIT License](LICENSE).


