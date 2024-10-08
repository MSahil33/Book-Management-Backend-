import { Router } from "express";
import { userRegister } from "../Controllers/users.controller.js";


const userRouter = Router();


// Defining the route for handling the user registration and all the other user related logic.

userRouter.post("/register", userRegister); //User registeration route
export default userRouter;