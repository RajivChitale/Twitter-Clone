import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Retweet = db.define('retweetlist', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    retweetid: {                    //original id
        type: DataTypes.INTEGER,
        allowNull: false
    },
    newid: {                        //id of the retweet
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Retweet.removeAttribute('id');
export default Retweet;

/*
CREATE TABLE retweetlist (
    username VARCHAR(40),
    retweetid INT,
    newid INT
) ENGINE=INNODB;
*/