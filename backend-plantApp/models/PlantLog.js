import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Plant from "./Plant.js";

const { DataTypes } = Sequelize;

const PlantLog = db.define("plant_logs", {
  activity: DataTypes.STRING,     // contoh: "Penyiraman"
  description: DataTypes.STRING,  // contoh: "Disiram pukul 7 pagi"
  log_type: DataTypes.STRING,     // contoh: "Perawatan"
  plantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

Plant.hasMany(PlantLog, { foreignKey: "plantId" });
PlantLog.belongsTo(Plant, { foreignKey: "plantId" });

export default PlantLog;

(async () => {
  await db.sync();
})();
