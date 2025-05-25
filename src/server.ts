import { setupAliases } from "import-aliases";
setupAliases()
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "@app/routes/authRoutes"
import productRoutes from "@app/routes/productRoutes"
import categoryRoutes from "@app/routes/categoryRoutes"
import cartRoutes from "@app/routes/cartRoutes"
import orderRoutes from "@app/routes/orderRoutes"
import favoriteRoutes from "@app/routes/favoriteRoutes"
import paymentRoutes from "@app/routes/paymentRoutes"
// Load environment variables first
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(

    cors({
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/favorite', favoriteRoutes)
// Test route

app.get("/", (req, res) => {
    res.send("Hello, this is the Lifewell Solutions Server, it is working🔥🔥👍");
});  

// Start server
app.listen(port, () => {
    console.log(`Server is running on port perfectly🔥`);
});
 