import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Hashtag = db.define('hashtaglist', {
    postid: {
        type: DataTypes.STRING,
       // allowNull: false
    },
    username: {
        type: DataTypes.STRING,
       // allowNull: false
    },
    hashtag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posttime: {
        type: DataTypes.STRING,
      //  allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Hashtag.removeAttribute('id');
export default Hashtag;

/*
CREATE TABLE hashtaglist (
    postid INT,
    username VARCHAR(40),
    hashtag VARCHAR(280),
    posttime VARCHAR(40)
) ENGINE=INNODB;
*/