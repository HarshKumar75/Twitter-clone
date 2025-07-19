import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from '@clerk/express';

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
})

const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
    }
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();