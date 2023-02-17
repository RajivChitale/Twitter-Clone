import Bookmark from "../models/bookmarkModel.js";

export const setBookmark = async (req, res) => {
    try {
        await Bookmark.create(req.body);
        res.json({
            message: "Bookmarked"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMarkedByUser = async (req, res) => {
    try {
        const pairs = await Bookmark.findAll({
            where: {username: req.params.username}
        });
        res.json(pairs);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const unmark = async (req, res) => {
    try {
        await Bookmark.destroy({
            where: {
                postid: req.body.postid,
                username: req.body.username
            }
        });
        res.json({
            message: "Unmarked"
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}


