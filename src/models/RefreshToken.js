import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./User.js";

export const RefreshToken = sequelize.define("RefreshToken", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

RefreshToken.belongsTo(User);
User.hasMany(RefreshToken);
