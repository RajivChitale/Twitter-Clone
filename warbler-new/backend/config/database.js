import { Sequelize } from "sequelize";
const db = new Sequelize('warbler_db', 'ubuntu', '321321', {
   host: "localhost",
   dialect: "mysql"
});
export default db;