import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import setRoute from "./route.conf.js";

// Initialize Dotenv file
dotenv.config();

// Set app constants
const
  app = express(),
  PORT = process.env.PORT || 8080;

// Set cros options
app.use(cors({
  origin: `http://localhost:${PORT}`
}));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// Parse requests of content-type - application/json
app.use(express.json());

// Utilize Registered Routes
new setRoute(app);

// Listining to defined PORT or environment port
app.listen(
  PORT, () => console.log(`Server Running: http://localhost:${PORT}`)
);
