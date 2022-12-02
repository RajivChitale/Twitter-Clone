import { Sequelize } from "sequelize";
const db = new Sequelize('twitter_db', 'ubuntu', '321321', {
   host: "localhost",
   dialect: "mysql"
});
export default db;