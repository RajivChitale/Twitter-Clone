import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Retweet = db.define('retweetlist', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    retweetid: {                    //original id
        type: DataTypes.STRING,
        allowNull: false
    },
    newid: {                        //id of the retweet
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
export default Retweet;

/*
CREATE TABLE retweetlist (
    username VARCHAR(40),
    retweetid VARCHAR(40),
    newid VARCHAR(40)
) ENGINE=INNODB;
*/