import React, { forwardRef } from "react";
import "./Post.css";
import {Heart, Share, Chat, BookmarkSimple} from "phosphor-react";

/* WILL CONNECT WITH BACKEND LATER
const post = await axios.get('http://192.168.51.81:5000/postlist', {
    postid: "p1";
});

const poster = await axios.get('http://192.168.51.81:5000/postlist', {
    username: post.username;
});
let displayname = poster.displayname;
let username = post.username;
let text = post.text;
let avatar = poster.displaypic;

*/



const Postold = forwardRef(
    ({ displayname, username, text, image,}, ref) => {
        return (
            <div className="post" ref={ref}>
                <div className="post_body">
                    <div className="post_header">
                        <div className="post_headerText">
                            <h3>
                                {displayname}{" "}
                                <span className="post_headerSpecial">
                                    @{username}
                                </span>
                            </h3>
                        </div>
                        <div className="post_headerDescription">
                            <p>{text}</p>
                        </div>
                    </div>
                    <img src={image} alt=""/>
                    <div className="post_footer">
                        <Heart/>
                        <Chat/>
                        <Share/>
                        <BookmarkSimple/>
                    </div>
                </div>
            </div>
        );
    }
);

export default Postold;