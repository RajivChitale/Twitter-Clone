import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Bookmark = db.define('bookmarklist', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postid: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
Bookmark.removeAttribute('id');
export default Bookmark;

/*
CREATE TABLE bookmarklist (
    username VARCHAR(40),
    postid VARCHAR(40)
) ENGINE=INNODB;
*/