import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Post = db.define('postlist', {
    postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parentid: {
        type: DataTypes.INTEGER
    },
    retweetid: {
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posttime: {
        type: DataTypes.STRING //string for storage but practically integer
    },
    text: {
        type: DataTypes.STRING,
    },
    media1: {
        type: DataTypes.STRING
    },
    media2: {
        type: DataTypes.STRING
    },
    media3: {
        type: DataTypes.STRING
    },
    media4: {
        type: DataTypes.STRING
    },
    replies: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    retweets: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    freezeTableName: true,
    timestamps: false
});
export default Post;

/*
CREATE TABLE postlist (
    postid INT PRIMARY KEY AUTO_INCREMENT,
    parentid INT,
    retweetid INT,
    username VARCHAR(40),
    posttime VARCHAR(40),
    text VARCHAR(280),
    media1 VARCHAR(100),
    media2 VARCHAR(100),
    media3 VARCHAR(100),
    media4 VARCHAR(100),
    replies INT,
    retweets INT,
    likes INT
) ENGINE=InnoDB;
*/