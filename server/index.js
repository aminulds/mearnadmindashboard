import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import mangementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from "./models/Transaction.js";
import { dataProduct, dataProductStat, dataUser, dataTransaction } from "./data/index.js";

// Configaration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Route
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", mangementRoutes);
app.use("/sales", salesRoutes);

// Mongose Setup
const PORT = process.env.PORT || 9001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server port: ${PORT}`));

  // only add one time
  // Product.insertMany(dataProduct);
  // ProductStat.insertMany(dataProductStat);
  // Transaction.insertMany(dataTransaction);
  // User.insertMany(dataUser);

}).catch((error) => console.log(`${error} didn't connect!`));
