import Retweet from "../models/retweetModel.js";
import Post from "../models/postModel.js";

export const getRetweetedByUser = async (req, res) => {
    try {
        const record = await Retweet.findAll({
            where: {username: req.params.username}
        });
        res.json(record);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const undoRetweet = async (req, res) => {
    try {
        await Post.destroy({
            where: {username: req.body.username,
                retweetid: req.body.retweetid}
        })

        await Retweet.destroy({
            where: {
                retweetid: req.body.retweetid,
                username: req.body.username
            }
        });

        await Post.decrement(['retweets'], { where: { postid: req.body.retweetid } });

        res.json({
            message: "Unmarked"
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}


