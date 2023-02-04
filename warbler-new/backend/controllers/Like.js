import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const setLike = async (req, res) => {
    try {
        req.body.liketime = new Date().getTime(); //set timestamp
        await Like.create(req.body);
        await Post.increment(['likes'], { where: { postid:req.body.postid } });
        res.json({
            message: "Liked"
        });

        /*
        const post = await Post.findOne({
            where: { postid: req.body.postid }
        });
        post.likes += 1;

        await Post.update(post, {
            where: {postid: req.body.postid}
        }); */
        

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
                postid: req.body.postid,
                username: req.body.username
            }
        });
        await Post.decrement(['likes'], { where: { postid: req.body.postid } });
        res.json({
            message: "Unliked"
        });

        /*
        const post = await Post.findOne({
            where: { postid: req.data.postid }
        });
        post.likes -= 1;

        await Post.update(post, {
            where: {postid: req.data.postid}
        });
        */

    } catch (error) {
        res.json({ message: error.message });
    }
}


