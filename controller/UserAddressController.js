const User = require("../model/User.js");

const AddAddress = async (req, res) => {
  const userId = req.user.userId;
  const { address, city, state, pin_code } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.address.push({ address, city, state, pin_code });

    await user.save();

    return res
      .status(200)
      .json({ msg: "Address added successfully", data: user.address });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error adding address", error: error.message });
  }
};

const UserAllAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    return res
      .status(200)
      .json({ msg: "User address fetched successfully", data: user.address });
  } catch (error) {}
};

const GetAddress = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const finalAddress = await user.address.filter(
      (data) => data.isDelete !== true
    );
    return res.status(200).json({
      msg: "User addresses fetched successfully",
      data: finalAddress,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching addresses", error: error.message });
  }
};

const UpdateAddress = async (req, res) => {
  const userId = req.user.userId;
  const addressId = req.params.id;
  const { address, city, state, pin_code } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const userAddress = user.address.id(addressId);

    if (!userAddress) {
      return res.status(404).json({ msg: "Address not found" });
    }

    if (address) userAddress.address = address;
    if (city) userAddress.city = city;
    if (state) userAddress.state = state;
    if (pin_code) userAddress.pin_code = pin_code;

    await user.save();

    return res
      .status(200)
      .json({ msg: "Address updated successfully", data: user.address });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error updating address", error: error.message });
  }
};

const DeleteAddress = async (req, res) => {
  const userId = req.user.userId;
  const addressId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const selectedAddress = user.address.id(addressId);

    if (!selectedAddress) {
      return res.status(404).json({ msg: "Address not found" });
    }
    selectedAddress.isDelete = true;

    await user.save();

    return res
      .status(200)
      .json({ msg: "Address deleted successfully", data: user.address });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error deleting address", error: error.message });
  }
};
module.exports = {
  AddAddress,
  UpdateAddress,
  DeleteAddress,
  GetAddress,
  UserAllAddress,
};
