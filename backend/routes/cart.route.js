import express from 'express' 
import{ createCart, getCartByUserId, deleteCartById, deleteCartByUserId, updateCartByUserId } from  '../controllers/cart.controller.js'
const router=express.Router()

router
    .post("/",createCart)
    .get("/user/:id",getCartByUserId)
    .patch("/:id",updateCartByUserId)
    .delete("/:id",deleteCartById)
    .delete("/user/:id",deleteCartByUserId)


    export default router