import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Like = db.define('likelist', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    liketime: {
        type: DataTypes.STRING //string for storage but practically integer
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Like.removeAttribute('id');
export default Like;

/*
CREATE TABLE likelist (
    username VARCHAR(40),
    postid INT,
    liketime VARCHAR(40)
) ENGINE=INNODB;
*/