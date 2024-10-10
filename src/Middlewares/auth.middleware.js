import { User } from "../Models/users.model.js";
import { ApiError } from "../Utils/ApiErrors.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    try {

        // Getting the token from the client side cookies or request header
        const rawToken = (await req.cookie?.token) || req.header("Authorization");

        if (!rawToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Removing the text "Bearer" from the auth token (i,e jwt token) 
        const token = rawToken.replace("Bearer ", "");

        // Getting all the data such as user_id and other information from the token which is encrypted with the secret key so it has to be decrypted with the same secret key as follows
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Now getting the user object from the database through the user_id (which is get from the decodeToken) excluding password
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }

        // passing user data to next controller after verifying the token
        req.user = user;

        // Directing to next controller after verifying the token 
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid Access Token!");
    }
}

export { verifyJWT };