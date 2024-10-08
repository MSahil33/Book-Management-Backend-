import { User } from "../Models/users.model.js";
import { ApiError } from "../Utils/ApiErrors.js"
import { ApiResponse } from "../Utils/ApiResponse.js";

const userRegister = async (req, res) => {

    // Step-1 :  Getting the user details
    const { username, fullName, email, password, location } = req.body;

    // Step-2 : Validation (checking whether the any of the field is empty )
    if (!fullName) {
        throw new ApiError(400, "Name is required");
    }
    if (!username) {
        throw new ApiError(400, "username is required");
    }
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // Step-3 : Checking whether the user already exist or not(using the email and username)

    const existingUserEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });

    if (existingUserEmail) {
        throw new ApiError(409, "Email already registered");
    }

    if (existingUserName) {
        throw new ApiError(409, "username already taken!!");
    }

    // Step-4 : Creating a entry into the database as a userobject
    const user = await User.create({
        username,
        fullName,
        email,
        password,
        location
    });

    // Not returning the password in the response
    const getNewUser = await User.findById(user._id).select("-password");

    if (!getNewUser) {
        throw new ApiError(500, "Something went wrong while registering the user !!");
    }

    // console.log(fullName, email, password, location);
    return res.status(200).json(new ApiResponse(201, getNewUser, "User created successfully"));
}

export { userRegister };