import express, { Router } from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import Cart from '../model/CartItem';

const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client.db().collection<Cart>('cartItems').find().toArray();
    res.json(results); // send JSON results
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({message: "Internal Server Error"});
  }
});

routes.get("/cart-items/:id", async (req, res) => {
        const id = req.params.id;
        getClient().then(client => {
            return client.db().collection<Cart>('cartItems').findOne({_id: new ObjectId(id)}).then(results => {
                if (results) {
                    res.json(results);
                } else {
                    res.status(404).json({message: "ID Not Found"});
                }
            });
        }).catch (err => {
            console.log("got an error over here", err);
            res.status(500).json({message: "Internal Server Error"});
        });
});

export default routes;