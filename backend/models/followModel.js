import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Follow = db.define('followlist', {
    follower: {
        type: DataTypes.STRING,
        allowNull: false
    },
    following: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Follow.removeAttribute('id');
export default Follow;

/*
CREATE TABLE followlist (
    follower VARCHAR(40),
    following VARCHAR(40)
) ENGINE=INNODB;
*/