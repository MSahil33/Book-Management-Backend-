import { User } from "../Models/users.model.js";
import { ApiError } from "../Utils/ApiErrors.js"
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// Creating a secure options for the cookies which means that by this options only the server has the acces to modify it
const options = {
    http: true,
    secure: true,
};

// User Registeration Controller
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
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user !!");
    }

    // console.log(fullName, email, password, location);
    return res.status(200).json(new ApiResponse(201, createdUser, "User created successfully"));
}

// User Login Controller
const userLogin = async (req, res) => {
    // 1. Getting the user login data from request body
    const { username, email, password } = req.body;

    // 2. Input validation
    if (!(username || email)) {
        throw new ApiError(400, "Username or email is required");
    }
    if (!password) {
        throw new ApiError(400, "Password is required!");
    }

    // 3. Getting the user with username or email
    const getUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    // 4. Checking whether the user exists with this email or username
    if (!getUser) {
        throw new ApiError(404, "No user with this email or username exist");
    }

    // 5 : Checking for the password
    // we are using the methods created for encryption and comparison of user password with the database password

    const isPasswordValid = await getUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid Password!!");
    }

    //6. Generating a JWT token for authorization of the user for other functionality
    const token = getUser.generateToken();

    //7. returning the response along with the cookie that stores the jwt token and its secure options
    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: getUser,
                    token
                },
                "User logged in succesfully"
            )
        )
}

// User Logout controller
const userLogout = async (req, res) => {
    // Now we are getting the user_id or user_object of the current logged in user in the body of the request(we have added this in the body of the request through the middleware whuch verify and adds the jwt token into the body)
    const userId = req.user._id;

    // Now sending the response back by clearing the token from the cookies and logging out
    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "User Logged Out"));
}

// User Current Password change controller
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user?.id

    const currUser = await User.findById(userId);

    const isPasswordCorrect = await currUser.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password");
    }

    currUser.password = newPassword;

    await currUser.save({ ValiditeBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"));
}

// Get user details by username
const getUserDetails = async (req, res) => {

    // getting the username from the url
    const { username } = req.params;

    if (!(username?.trim())) {
        throw new ApiError(401, "username is required");
    }

    // Getting the user details from the database except the password
    const getUser = await User.findOne({ username }).select("-password");

    // Validating whether the user exists with the input username
    if (!getUser) {
        throw new ApiError(404, "Invalid username!!");
    }

    // Sending the requested user details
    return res
        .status(200)
        .json(
            new ApiResponse(200, getUser, "User details fetched successfully!")
        );
}

// Update the current user details
const updateUserDetails = async (req, res) => {

    const { username, fullName, email, location } = req.body;


    const userId = req.user?._id;

    const currUser = await User.findById(userId);

    if (username) {

        // if (username === currUser.username) {
        //     throw new ApiError(409, "Username same as previous one!!");
        // }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            throw new ApiError(409, "Username already exists");
        }

        currUser.username = username;
    }

    if (email) {

        // if (email === currUser.email) {
        //     throw new ApiError(409, "Email same as previous one!!");
        // }
        const existingUserEmail = await User.findOne({ email });

        if (existingUserEmail) {
            throw new ApiError(409, "Email already registered");
        }

        currUser.email = email;
    }

    if (fullName) {
        currUser.fullName = fullName;
    }

    if (location) {
        currUser.location = location;
    }

    await currUser.save();

    return res
        .status(200)
        .json(new ApiResponse(201, currUser, "User details updated Successfully!!"));
}


export { userRegister, userLogin, userLogout, changePassword, getUserDetails, updateUserDetails };