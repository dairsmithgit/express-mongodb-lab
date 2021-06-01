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

export default routes;