import { Router } from "express";
import { userRegister, userLogin, userLogout, changePassword, getUserDetails, updateUserDetails, getCurrentUser } from "../Controllers/users.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


const userRouter = Router();


// Defining the route for handling the user registration and all the other user related logic.

userRouter.route("/register").post(userRegister); //User registeration route
userRouter.route("/login").post(userLogin); //user Login route
userRouter.route("/logout").post(verifyJWT, userLogout); //User Logout route 
// Password changed rout
userRouter.route("/change-password").put(verifyJWT, changePassword);

// Creating a route for getting the details of a particular channel with authorizing of the user using th verifyJWT middleware and in this we are getting the username from the url params
userRouter.route("/u/:username").get(verifyJWT, getUserDetails);

// Update user details
userRouter.route("/update-user").put(verifyJWT, updateUserDetails);

// Get current logged in user details
userRouter.route("/my-profile").get(verifyJWT, getCurrentUser);
export default userRouter;