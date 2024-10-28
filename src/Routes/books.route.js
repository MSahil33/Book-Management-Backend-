import { Router } from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { postBook } from '../Controllers/books.controller.js';

const bookRouter = Router();

bookRouter.route("/post-book").post(verifyJWT, postBook);


export default bookRouter;