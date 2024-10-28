import { Router } from 'express';
import { verifyJWT } from '../Middlewares/auth.middleware.js';
import { deleteBook, getAllBooks, getMyBooks, postBook } from '../Controllers/books.controller.js';

const bookRouter = Router();

bookRouter.route("/post-book").post(verifyJWT, postBook);
bookRouter.route("/my-books").get(verifyJWT, getMyBooks);
// Route to get all posted books without authorization
bookRouter.route("/").get(getAllBooks);
// Route to delete a book by id
bookRouter.route("/delete-book/:bookId").delete(verifyJWT, deleteBook);

export default bookRouter;