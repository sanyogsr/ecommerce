import Cart from "../models/cart.model.js";

const cartItems = [
  {
    _id: "65c357fe2f21c40d167c276b",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f5994453",
    quantity: 1,
  },
  {
    _id: "65c3581d2f21c40d167c278f",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f599445d",
    quantity: 4,
  },
  {
    _id: "65c3584f2f21c40d167c27f5",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e45902e12c44f59944a1",
    quantity: 2,
  },
];

const uniqueCartMap = new Map(cartItems.map((item) => [item._id, item]));
const uniqueCart = Array.from(uniqueCartMap.values());

const seedCart = async () => {
  try {
    await Cart.deleteMany({});

    await Cart.insertMany(uniqueCart);
    console.log("Cart seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedCart;
