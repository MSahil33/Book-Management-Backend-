import { Router } from "express";
import { userRegister, userLogin, userLogout, changePassword } from "../Controllers/users.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";


const userRouter = Router();


// Defining the route for handling the user registration and all the other user related logic.

userRouter.route("/register").post(userRegister); //User registeration route
userRouter.route("/login").post(userLogin); //user Login route
userRouter.route("/logout").post(verifyJWT, userLogout); //User Logout route 
// Password changed rout
userRouter.route("/change-password").post(verifyJWT, changePassword);

export default userRouter;