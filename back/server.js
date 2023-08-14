const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
require("dotenv").config({ path: "./.env" });
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({ origin: "http://127.0.0.1:5500" }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5000, // Limitez chaque adresse IP à 100 requêtes par "fenêtre" (ici, par tranche de 15 minutes)
	standardHeaders: true, // Renvoyer les informations de limite de taux dans les en-têtes
	legacyHeaders: false, // Désactiver les en-têtes `X-RateLimit-*`
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

//routes
app.use("/api", require("./routes"));
app.use("/assets/avatar", express.static(path.join(__dirname, "assets", "avatar")));
app.use("/assets/photo", express.static(path.join(__dirname, "assets", "photo")));

//vérifie que le port est correct
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

//contrôle erreur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//  écouter les événements du serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});
