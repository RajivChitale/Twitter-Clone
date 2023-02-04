import Message from "../models/messageModel.js";
import { Sequelize } from "sequelize";

export const createMessage = async (req, res) => {
    try {
        if(req.body.text === "" && req.body.media1 === "") {throw { message: "Message cannot be empty"}; }
        req.body.posttime = new Date().getTime(); //set timestamp
        await Message.create(req.body);
        res.json({
            message: "Message Sent"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMessagebyId = async (req, res) => {
    try {
        const post = await Message.findAll({
            where: {
                messageid: req.params.messageid
            }
        });
        res.json(post[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMessagesbySender = async (req, res) => {
    try {
        const idlist = await Message.findAll({
            where: {
                sender: req.params.username
            },
            attributes: ['messageid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMessagesbyReceiver = async (req, res) => {
    try {
        const idlist = await Message.findAll({
            where: {
                sender: req.params.username
            },
            attributes: ['messageid']
        });
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getChat = async (req, res) => {
    try {
        let idlist = await Message.findAll({
            where: {
                [Sequelize.Op.or]: [{receiver: req.body.receiver, sender: req.body.sender,}, 
                    {receiver: req.body.sender,sender: req.body.receiver}]
            },
            order: [
                ['posttime', 'DESC']
            ],
            attributes: ['messageid']
        });
        idlist = idlist.map(x => x.messageid);
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}



export const deleteMessage = async (req, res) => {
    try {
        await Message.destroy({
            where: {
                messageid: req.params.messageid
            }
        });
        res.json({
            message: "Message Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}


