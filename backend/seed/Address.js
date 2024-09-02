import Address from "../models/address.model.js";

const addresses = [
  {
    _id: "65c26398e1e1a2106ac8fbd5",
    user: "65b8e564ea5ce114184ccb96",
    street: "main 11th",
    city: "Indrapuram",
    state: "Uttar Pradesh",
    phoneNumber: "9452571272",
    postalCode: "201012",
    country: "India",
    type: "Home",
    __v: 0,
  },
  {
    _id: "65c26412e1e1a2106ac8fbd8",
    user: "65b8e564ea5ce114184ccb96",
    street: "main 18th",
    city: "Noida",
    state: "Uttar Pradesh",
    phoneNumber: "9846286159",
    postalCode: "301273",
    country: "India",
    type: "Buisness",
    __v: 0,
  },
];

const uniqueAddressesMap = new Map(
  addresses.map((address) => [address._id, address])
);
const uniqueAddresses = Array.from(uniqueAddressesMap.values());

const seedAddress = async () => {
  try {
    await Address.deleteMany({});

    await Address.insertMany(uniqueAddresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.error(error);
  }
};
export default seedAddress;
