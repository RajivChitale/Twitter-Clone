import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Post = db.define('messagelist', {
    messageid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING
    },
    receiver: {
        type: DataTypes.STRING
    },
    parentid: {                     //applicable if a reply was shared
        type: DataTypes.STRING
    },
    shareid: {
        type: DataTypes.STRING
    },
    posttime: {
        type: DataTypes.STRING //string for storage but practically integer
    },
    text: {
       type: DataTypes.STRING
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
   
}, {
   freezeTableName: true,
   timestamps: false
});
export default Post;

/*
CREATE TABLE messagelist (
	messageid VARCHAR(40),
	sender VARCHAR(40),
	receiver VARCHAR(40),
	parentid VARCHAR(40),
	shareid VARCHAR(40),
	posttime VARCHAR(40),
	text VARCHAR(280),
	media1 VARCHAR(100),
	media2 VARCHAR(100),
	media3 VARCHAR(100),
	media4 VARCHAR(100)
) ENGINE=InnoDB;
*/