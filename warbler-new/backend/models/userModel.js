import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const User = db.define('userlist', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    displayname: {
        type: DataTypes.STRING
    },
    displaypic: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATEONLY
    },
    followercount: {
    type: DataTypes.INTEGER
    },
    followingcount: {
    type: DataTypes.INTEGER
    },
    jointime: {
        type: DataTypes.STRING //practically int stored as string
        //  allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});
export default User;

/*
CREATE TABLE userlist (
    username VARCHAR(40) PRIMARY KEY ,
    password VARCHAR(40),
    displayname VARCHAR(40),
    displaypic VARCHAR(100),
    bio VARCHAR(160),
    location VARCHAR(160),
    birthday DATE,
    jointime VARCHAR(40),
    followercount INT,
    followingcount INT
) ENGINE=INNODB;
*/