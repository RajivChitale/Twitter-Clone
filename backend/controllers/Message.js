import Message from "../models/postModel.js";
export const createMessage = async (req, res) => {
    try {
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


