import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const setLike = async (req, res) => {
    try {
        req.body.liketime = new Date().getTime(); //set timestamp
        await Like.create(req.body);
        res.json({
            message: "Liked"
        });

        const post = await Post.findAll({
            where: { postid: req.body.postid }
        });
        post[0].likes += 1;

        await Post.update(post[0], {
            where: {postid: req.body.postid}
        });
        

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getLikedByUser = async (req, res) => {
    try {
        const pair = await Like.findAll({
            where: {username: req.params.username}
        });
        res.json(pair[0]);
    } catch (error) {
        res.json({ messsage: error.message });
    }
}

export const getLikersByPost = async (req, res) => {
    try {
        const likers = await Like.findAll({
            where: {
                postid: req.params.postid,
            },
            attributes: ['username']
        });
        res.json(likers);
    } catch (error) {
        res.json({ message: error.message });
    }
}

/*
export const checkLikedByUser = async (req, res) => {
    try {
        const pair = await Like.findAll({
            where: {username: req.body.username,
                    postid: req.body.username}
        });
        if(pair=[])  {res.json(
            {liked:false}
        )}
        else {res.json(
            {liked:true } 
        )}
    } catch (error) {
        res.json({ messsage: error.message });
    }
}
*/

export const unlike = async (req, res) => {
    try {
        await Like.destroy({
            where: {
                postid: req.data.postid,
                username: req.data.username
            }
        });
        res.json({
            message: "Unliked"
        });

        const post = await Post.findAll({
            where: { postid: req.data.postid }
        });
        post[0].likes -= 1;

        await Post.update(post[0], {
            where: {postid: req.data.postid}
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}


