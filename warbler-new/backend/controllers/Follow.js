import Follow from "../models/followModel.js";
import User from "../models/userModel.js";

export const setFollow = async (req, res) => {
    try {
        await Follow.create(req.body);
        User.increment(['followingcount'], { where: { username: req.body.follower } });
        User.increment(['followercount'], { where: { username: req.body.following } });

        res.json({
            message: "Followed"
        });
        
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getFollowingList = async (req, res) => {
    try {
        const followingList = await Follow.findAll({
            where: {follower: req.params.follower},
            attributes: ['following']
        });
        res.json(followingList);
    } catch (error) {
        res.json({ messsage: error.message });
    }
}

export const getFollowerList = async (req, res) => {
    try {
        const followerList = await Follow.findAll({
            where: {
                following: req.params.following,
            },
            attributes: ['follower']
        });
        res.json(followerList);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const unfollow = async (req, res) => {
    try {
        await Follow.destroy({
            where: {
                follower: req.body.follower,
                following: req.body.following
            }
        });
        User.decrement(['followingcount'], { where: { username: req.body.follower } });
        User.decrement(['followercount'], { where: { username: req.body.following } });
        res.json({
            message: "Unfollowed"
        });


    } catch (error) {
        res.json({ message: error.message });
    }
}


