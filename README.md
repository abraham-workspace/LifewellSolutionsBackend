# LifewellSolutionsBackend
Life-Solutions-Backend

🧱 Core Features
The API provides the following core functionalities:

✅ User Authentication & Authorization
Secure login and registration system using JWT. Users are assigned roles (e.g., admin, supplier, customer) to control access to different parts of the system.

✅ Product Management
Manage products, including adding, updating, deleting, and viewing available products.

✅ Category Management
Organize products into categories for easy browsing.

✅ Favorites
Users can mark products as favorites for quick access.

✅ Cart Management
Users can add, update, or remove items from their cart.

✅ Orders
Users can place orders, view their order history, and manage order status.

✅ Payments (Stripe Integration)
Payments are processed securely using Stripe. Users can pay for their orders and track payment status.

✅ User Profiles
Extend user information with additional details like phone number, gender, city, preferences (like favorite food types), and security questions.

🔒 Security Features
✅ JWT Authentication
✅ Role-based Access Control (RBAC)
✅ Password Hashing (bcrypt)
✅ Payment Security via Stripe

🏗️ How It Works
1️⃣ Authentication

Uses JWT tokens for authentication and authorization.

Middleware (authMiddleware) protects routes.

2️⃣ Controllers and Models

Models: Handle database queries using pool.query.

Controllers: Handle business logic, request validation, and responses.

Errors are handled using asyncHandler and try/catch for safe error management.

3️⃣ Stripe Integration

Payment operations are integrated with Stripe.

The /api/payments endpoints manage payment workflows.

4️⃣ Modular Design

Each feature (auth, products, cart, etc.) has its own model, controller, and route.

Clean separation of concerns makes it easy to maintain and extend.

💻 Running the Project
To run the project:

Install dependencies: npm install

Start the server: npm run server

Use Postman or any API client to test the endpoints.

And you can use it in your frontend application.