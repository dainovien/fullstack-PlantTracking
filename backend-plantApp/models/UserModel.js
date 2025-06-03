import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // tambahkan unique agar tidak duplikat
    },
    refresh_token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    createdAt: "tanggal_dibuat",
    updatedAt: "tanggal_diperbarui",
  }
);

export default User;

// Untuk development: force sync agar kolom baru (email) dibuat jika belum ada
// HATI-HATI: force: true akan DROP tabel, gunakan alter: true untuk update kolom tanpa drop data
(async () => {
  await db.sync({ alter: true }); // gunakan alter agar tidak drop data
})();
