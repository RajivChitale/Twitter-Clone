import express from "express";
import { createUser, authUser, updateUser, deleteUser, getUserByName, checkToken } from "../controllers/User.js";
import { createPost, getPostById, getPostsBySender,getPostsByParent, getPostsByTime, getPostsByLikes, 
    searchByTime, searchByLikes, getRecentPosts,getCustomFeed, updatePost, deletePost, getPostById2 } from "../controllers/Post.js";
import { setLike, unlike, getLikedByUser, getLikersByPost } from "../controllers/Like.js";
import { setFollow, unfollow, getFollowingList, getFollowerList } from "../controllers/Follow.js";
import { setBookmark, unmark, getMarkedByUser } from "../controllers/Bookmark.js";
import { createMessage, deleteMessage, getMessagebyId, getMessagesbySender, getMessagesbyReceiver, getChat} from "../controllers/Message.js";
import {  getTrending } from "../controllers/Hashtag.js";
import { undoRetweet, getRetweetedByUser } from "../controllers/Retweet.js";

const router = express.Router();
router.post('/checkToken', checkToken);

router.post('/userlist', createUser);
router.post('/userlist/auth', authUser);
router.get('/userlist/:username', getUserByName); //
router.patch('/userlist', updateUser);
router.delete('/userlist/:username', deleteUser); //

router.post('/postlist', createPost);
router.get('/postlist/id/:postid', getPostById); //
router.get('/postlist/sender/:username', getPostsBySender); //
router.get('/postlist/parent/:parentid', getPostsByParent); //
router.get('/postlist/time', getPostsByTime); //
router.get('/postlist/likes', getPostsByLikes); //
router.post('/postlist/searchtime', searchByTime); 
router.post('/postlist/searchlikes', searchByLikes); 
router.get('/postlist/recent/:hours', getRecentPosts); //
router.get('/postlist/custom/:username', getCustomFeed); //
router.patch('/postlist', updatePost);
router.delete('/postlist/id/:postid', deletePost); //
//router.post('/postlist/id', getPostById2); //alternate version using post

router.post('/likelist', setLike); 
router.get('/likelist/user/:username', getLikedByUser); //
router.get('/likelist/id/:postid', getLikersByPost); //
router.post('/likelist/delete', unlike);

router.post('/followlist', setFollow); 
router.get('/followlist/follower/:follower', getFollowingList); //
router.get('/followlist/following/:following', getFollowerList); //
router.post('/followlist/delete', unfollow);

router.post('/bookmarklist', setBookmark); 
router.get('/bookmarklist/user/:username', getMarkedByUser); //
router.post('/bookmarklist/delete', unmark);

router.post('/messagelist', createMessage);
router.post('/messagelist/getchat', getChat);
router.get('/messagelist/sender/:username', getMessagesbySender);  //
router.get('/messagelist/receiver/:username', getMessagesbyReceiver);  //
router.get('/messagelist/id/:messageid', getMessagebyId);  //
router.delete('/messagelist/id/:messageid', deleteMessage); //

router.get('/hashtaglist/:hours', getTrending); //
router.post('/retweetlist/delete', undoRetweet);
router.get('/retweetlist/user/:username', getRetweetedByUser);


export default router;