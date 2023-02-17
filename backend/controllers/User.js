import User from "../models/userModel.js";
import sha1 from 'js-sha1';
import jwt from "jsonwebtoken";

let secretpassword = "Never gonna give you up,Never gonna let you down,Never gonna run around and desert you";

export const checkToken = async (req, res) => {
    try {
        let token = req.body.token;
        if (!token) {
            res.json({
                success: false,
                message: "Error! Token was not provided."
            });
        }
        const decodedToken = jwt.verify(token, secretpassword);
        const user = await User.findAll({
            where: {
                username: decodedToken.username
            }
        })
        if (!user) {
            res.json({
                success: false
            });

        }
        else {
            res.json({
                success: true,
                username: decodedToken.username
            });
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}
export const createUser = async (req, res) => {
    try {
        req.body.jointime = new Date().getTime(); //set timestamp
        req.body.password = sha1(req.body.password + req.body.jointime); //salted hash
        await User.create(req.body);
        let token = jwt.sign({ username: req.body.username }, secretpassword, { expiresIn: "2h" }
        );
        res.json({
            username: req.body.username,
            token: token,
            success: true,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                username: req.body.username
            }
        });
        res.json({
            message: "User Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUserByName = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.params.username
            }
        });
        user[0].password = null; //not shared to client
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                username: req.params.username
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const authUser = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        })
        //if password in database matches input
        if (user[0].password === sha1(req.body.password + user[0].jointime)) {
            let token = jwt.sign({ username: user[0].username }, secretpassword, { expiresIn: "2h" });
            res
                .json({
                    username: user[0].username,
                    token: token,
                    outcome: "Success",
                });
        }
        else {
            res.json({ outcome: "Fail" }); //fail req.body.password + user[0].jointime.getTime() 
        }
    }
    catch (error) {
        res.json({ outcome: error.message });
    }
}

/*
Old authUser
export const authUser = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        })
        //if password in database matches input

        if (user[0].password === sha1(req.body.password + user[0].jointime)) {  //hashed
            res.json({ outcome: "Success" });
        }
        else {
            res.json({ outcome: "Fail" }); //fail req.body.password + user[0].jointime.getTime() 
        }

    } catch (error) {
        res.json({ outcome: error.message });
    }
}
*/

/*import Product from "../models/productModel.js";
export const getAllProducts = async (req, res) => {
   try {
       const products = await Product.findAll();
       res.json(products);
   } catch (error) {
       res.json({ message: error.message });
   }
}
export const getProductById = async (req, res) => {
   try {
       const product = await Product.findAll({
           where: {
               id: req.params.id
           }
       });
       res.json(product[0]);
   } catch (error) {
       res.json({ message: error.message });
   }
}
export const createProduct = async (req, res) => {
   try {
       await Product.create(req.body);
       res.json({
           "message": "Product Created"
       });
   } catch (error) {
       res.json({ message: error.message });
   }
}
export const updateProduct = async (req, res) => {
   try {
       await Product.update(req.body, {
           where: {
               id: req.params.id
           }
       });
       res.json({
           "message": "Product Updated"
       });
   } catch (error) {
       res.json({ message: error.message });
   }
}
export const deleteProduct = async (req, res) => {
   try {
       await Product.destroy({
           where: {
               id: req.params.id
           }
       });
       res.json({
           "message": "Product Deleted"
       });
   } catch (error) {
       res.json({ message: error.message });
   }
}
*/
