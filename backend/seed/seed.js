import seedBrand from "./Brand.js";
import seedCategory from "./Category.js";
import seedProduct from "./Product.js";
import seedUser from "./User.js";
import seedAddress from "./Address.js";
import seedWishlist from "./Wishlist.js";
import seedCart from "./Cart.js";
import seedReview from "./Review.js";
import seedOrder from "./Order.js";
import connectDb from "../config/db.js";

const seedData = async () => {
  try {
    await connectDb();
    console.log("Seed [started] please wait..");
    await seedBrand();
    await seedCategory();
    await seedProduct();
    await seedUser();
    await seedAddress();
    await seedWishlist();
    await seedCart();
    await seedReview();
    await seedOrder();

    console.log("Seed completed..");
  } catch (error) {
    console.log(error);
  }
};

seedData();
