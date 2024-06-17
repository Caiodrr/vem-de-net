import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { useRoutes } from "./routes";

const PORT = process.env.PORT || 3050;

const app = express();
app.use(cors());
app.use(bodyParser.json());
useRoutes(app);

app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT)
);
