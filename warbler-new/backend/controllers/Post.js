import Post from "../models/postModel.js";
import Follow from "../models/followModel.js";
import { createHashtag, deleteHashtag } from "../controllers/Hashtag.js";
import Retweet from "../models/retweetModel.js";
import { Sequelize } from "sequelize";

export const createPost = async (req, res) => {
    try {
        if(req.body.text === "" && req.body.media1 === "") {throw { message: "Post cannot be empty"}; }
        const now = new Date().getTime();
        req.body.posttime = new Date().getTime(); //set timestamp
        const threshold = now -  15 * 60 * 1000; //15 min

        //spam protection:
        const spamcount = await Post.count({
            where: {
                username: req.body.username,
                posttime: { [Sequelize.Op.gte]: threshold,  [Sequelize.Op.lte]: now}
            }
        });
        if(spamcount>15)
        {
            res.json({ message: 'Spam' });
            return;
        }
        await Post.create(req.body);
        
        const post = await Post.findOne({
            where: {posttime: req.body.posttime, username: req.body.username}
        });
        await createHashtag(post);

        if(req.body.parentid != null) {
            Post.increment(['replies'], { where: { postid:req.body.parentid } });
        }

        if(req.body.retweetid != null && req.body.retweetid != 0) {
            await Retweet.create(
                {username: req.body.username,
                retweetid : req.body.retweetid,
                newid: post.postid}
            );
            await Post.increment(['retweets'], { where: { postid: req.body.retweetid } });
        }

        res.json({
            message: "Post created"  //,message2: message2
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findAll({
            where: {
                postid: req.params.postid,
            }
        });
        res.json(post[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostById2 = async (req, res) => {
    try {
        const post = await Post.findAll({
            where: {
                postid: req.body.postid,
            }
        });
        res.json(post[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostsBySender = async (req, res) => {
    try {
        const now = new Date().getTime();
        const idlist = await Post.findAll({
            where: {
                username: req.params.username,
                posttime: {[Sequelize.Op.lte]: now}
            },
            order: [
                ['posttime', 'DESC']
            ],
            attributes: ['postid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostsByParent = async (req, res) => {
    try {
        const now = new Date().getTime();
        const idlist = await Post.findAll({
            where: {
                parentid: req.params.parentid,
                posttime: {[Sequelize.Op.lte]: now}
            },
            order: [
                ['likes', 'DESC']
            ],
            attributes: ['postid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostsByTime = async (req, res) => {
    try {
        const now = new Date().getTime();
        const idlist = await Post.findAll({
            attributes: ['postid'],
            order: [
                ['posttime', 'DESC']
            ],
            where: { posttime: {[Sequelize.Op.lte]: now} }
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostsByLikes = async (req, res) => {
    try {
        const now = new Date().getTime();
        const idlist = await Post.findAll({
            attributes: ['postid'],
            order: [
                ['likes', 'DESC'],
                ['posttime', 'DESC']
            ],
            where: { posttime: {[Sequelize.Op.lte]: now} }
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const searchByLikes = async (req, res) => {
    try {
        const now = new Date().getTime();
        const ltext = req.body.search.toLowerCase();
        const idlist = await Post.findAll({
            where: {
                text: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('text')), 'LIKE', `%${ltext}%`),
                posttime: {[Sequelize.Op.lte]: now},
            },
            order: [
                ['likes', 'DESC'],
                ['posttime', 'DESC']
            ],
            attributes: ['postid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//case insentive search for substring
export const searchByTime = async (req, res) => {
    try {
        const now = new Date().getTime();
        const ltext = req.body.search.toLowerCase();
        const idlist = await Post.findAll({
            where: {
                text: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('text')), 'LIKE', `%${ltext}%`),
                posttime: {[Sequelize.Op.lte]: now},
            },
            order: [
                ['posttime', 'DESC']
            ],
            attributes: ['postid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRecentPosts = async (req, res) => {
    try {
        const now = new Date().getTime();
        const threshold = now - req.params.hours * 60 * 60 * 1000;
        const idlist = await Post.findAll({
            attributes: ['postid'],
            where: {
                posttime: { [Sequelize.Op.gte]: threshold,  [Sequelize.Op.lte]: now},
                parentid: null
            },
            order: [
                ['likes', 'DESC'],
                ['posttime', 'DESC'],
            ]
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getCustomFeed = async (req, res) => {
    try {
        const now = new Date().getTime();
        const username = req.params.username;
        const threshold = now - 48 * 60 * 60 * 1000;

        let followingList = await Follow.findAll({
            where: {follower: username},
            attributes: ['following']
        });
        followingList = followingList.map( obj => obj.following);
        let idlist1 = await Post.findAll({
            attributes: ['postid'],
            where: {
                posttime: { [Sequelize.Op.gte]: threshold,  [Sequelize.Op.lte]: now},
                username: {[Sequelize.Op.in]: followingList}
            },
            order: [
                ['likes', 'DESC'],
                ['posttime', 'DESC']
            ]
        });
        idlist1 = idlist1.map(x => x.postid);

        let idlist2 = await Post.findAll({
            attributes: ['postid'],
            where: {
                posttime: { [Sequelize.Op.gte]: threshold,  [Sequelize.Op.lte]: now},
                parentid: null,
                retweetid: null
            },
            order: [
                ['likes', 'DESC'],
                ['posttime', 'DESC']
            ]
        });
        idlist2 = idlist2.map(x => x.postid);

        const merged =  [...new Set([...idlist1,...idlist2])]
        res.json(merged);

    } catch (error) {

        res.json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        await Post.update(req.body, {
            where: {
                postid: req.body.postid
            }
        });
        res.json({
            message: "Post Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        await Post.destroy({
            where: {
                postid: req.params.postid
            }
        });
        deleteHashtag(req.params.postid);
        res.json({
            message: "Post Deleted"
        });

        Post.decrement(['replies'], { where: { postid:req.params.parentid } });
    } catch (error) {
        res.json({ message: error.message });
    }
}

