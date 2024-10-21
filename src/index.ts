import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./helper/logger";

// Controllers
import { usersControllers } from "./users";
import { authControllers } from "./auth";
import { ErrorHandelingMiddleware } from "./middlewares";
import { productsControllers } from "./products";

// Express App
const app = express();

// Middlewares
app.use(cors()); // Middleware to enable CORS (GLOBAL)
app.use(express.json()); // Middleware to parse body json (GLOBAL)

app.get("/", (req: Request, res: Response) => {
  res.send("WELCOME TO HOME PAGE!");
});

// Routes Group
app.use("/users", usersControllers);
app.use("/auth", authControllers);
app.use("/products", productsControllers);

// Add Error handeling middleware right after routes
app.use(ErrorHandelingMiddleware);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI!!, { autoIndex: true })
  .then(() => {
    // Server Start
    app.listen(process.env.PORT, () => {
      logger.info(`Server is up on PORT ==> ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`ERROR : ${err}`);
  });

// ////////////////////////////////////// Run SOCKET Server //////////////////////////////////////
// import express from "express";
// import http from "http";
// import { Server, Socket } from "socket.io";
// import logger from "./helper/logger";
// import "dotenv/config";

// // Create express app
// const app = express();
// // Create http server for express app
// const httpServer = http.createServer(app);
// // Create socket server
// const socketServer = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// socketServer.on("connection", (socket: Socket) => {
//   logger.info(`USER '${socket.id}' CONNECTED!`);

//   socket.on("sendMessage", (data: any) => {
//     const { message, user, room } = data;
//     socketServer.to(room).emit("message", { message, user });
//   });

//   socket.on("join", (data) => {
//     const { room } = data;
//     logger.info(room);
//     socket.join(room);
//   });

//   socket.on("leave", (data) => {
//     const { room } = data;
//     socket.leave(room);
//   });

//   socket.on("disconnect", () => {
//     logger.info(`USER '${socket.id}' DISCONNECTED!`);
//   });
// });

// httpServer.listen(process.env.PORT, () => {
//   logger.info(`Server is up with SOCKET on PORT ==> ${process.env.PORT}`);
// });
