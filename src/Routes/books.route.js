import { Router } from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { getMyBooks, postBook } from '../Controllers/books.controller.js';

const bookRouter = Router();

bookRouter.route("/post-book").post(verifyJWT, postBook);
bookRouter.route("/my-books").get(verifyJWT, getMyBooks);

export default bookRouter;