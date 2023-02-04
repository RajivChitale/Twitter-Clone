import Hashtag from "../models/hashtagModel.js";
import { Sequelize } from "sequelize";

//PENDING
export const createHashtag = async (postobj) => {
    try {
        const words = postobj.text.split(' ');
        const hashtags = words.filter(word => word.startsWith('#'));
        
        for (let i = 0; i < hashtags.length; i++) {
        await Hashtag.create({
            postid: postobj.postid,
            username: postobj.username,
            hashtag: hashtags[i].toLowerCase(),
            posttime: postobj.posttime
        });
        }
        return({ message: "Hashtags registered" });
    } catch (error) {
        return({ message: error.message });
    }
}

//add time
export const getTrending = async (req, res) => {
    try {
        const now = new Date().getTime();
        const threshold = now - req.params.hours * 60 * 60 * 1000;
        const [hashtagCount, metdata] = await Hashtag.sequelize.query(
        `SELECT hashtag, COUNT(*) as count FROM hashtaglist
        WHERE(posttime > ${threshold} AND posttime <= ${now} )
        GROUP BY hashtag ORDER BY count DESC;`
        );
        //{ type: QueryTypes.SELECT }
        res.json(hashtagCount);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteHashtag = async (postid) => {
    try {
        await Hashtag.destroy({
            where: {
                postid: postid
            }
        });
        return({
            message: "Deleted hashtags from post"
        });

    } catch (error) {
        return({ message: error.message });
    }
}


