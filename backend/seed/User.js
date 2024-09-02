import User from "../models/user.model.js";

const users = [
  {
    _id: "65b8e564ea5ce114184ccb96",
    name: "demo user",
    email: "demo@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze",
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
  {
    _id: "65c2526fdcd9253acfbaa731",
    name: "rishibakshi",
    email: "demo2@gmail.com",
    password: "$2a$10$tosjkprqtomSah0VJNyKi.TIv1JU65pl1i1IJ6wUttjYw.ENF99jG",
    isVerified: true,
    isAdmin: false,
    __v: 0,
  },
];

const uniqueUserMap = new Map(users.map((user) => [user._id, user]));
const uniqueUser = Array.from(uniqueUserMap.values());
const seedUser = async () => {
  try {
    await User.deleteMany({});

    await User.insertMany(uniqueUser);
    console.log("User seeded successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedUser;
