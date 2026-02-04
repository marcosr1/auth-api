import dotenv from "dotenv";
import { app } from "./app.js";
import sequelize from "./src/config/database.js";

dotenv.config();

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("🔥 API rodando");
  });
});
