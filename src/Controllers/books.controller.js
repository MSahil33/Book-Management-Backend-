import { Book } from "../Models/books.model.js";
import { ApiError } from "../Utils/ApiErrors.js"
import { ApiResponse } from "../Utils/ApiResponse.js";

// Controller to upload/post a new book
const postBook = async (req, res) => {

    const currUserId = req.user?._id;

    const { title, author, isbn, genre, language, publishedDate, summary } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    if (!author) {
        throw new ApiError(400, "Author/Authors is required");
    }
    if (!isbn) {
        throw new ApiError(400, "ISBN is required");
    }
    if (!genre) {
        throw new ApiError(400, "Genre is required");
    }
    if (!summary) {
        summary = title;
    }

    const postedBook = await Book.create({
        title,
        author,
        isbn,
        genre,
        language,
        publishedDate,
        summary,
        addedBy: currUserId
    });

    const getPostedBook = await Book.findById(postedBook._id);

    if (!getPostedBook) {
        throw new ApiError(404, "Book not Uploaded");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, getPostedBook, "Book uploaded successfully"));
}

// Controller to get the books posted by the current loggedin user
const getMyBooks = async (req, res) => {

    const currUserId = req.user?._id;


    const myBooks = await Book.find({ addedBy: currUserId });
    if (!myBooks) {
        throw new ApiError(404, "No books found!!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { TotalBooks: myBooks.length, myBooks }, "Books fetched succesfully"));
}

// Controller to get all the posted books in the database
const getAllBooks = async (req, res) => {

    const books = await Book.find();

    if (!books) {
        throw new ApiError(500, "Something went wrong!!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { TotalBooks: books.length, books }, "Books fetched successfully"));
}

// Controller to delete a book by its id
const deleteBook = async (req, res) => {

    // Reading the bookId from the url parameters 
    const { bookId } = req.params;
    // console.log(bookId);

    // Getting the current logged in user id
    const currUserId = req.user?._id.toString();

    // Now getting the book for the input id
    const book = await Book.findById(bookId);

    // Checking whether the book exists for that bookId
    if (!book) {
        throw new ApiError(404, "No book found!!");
    }

    const addedBy = book?.addedBy?.toString();

    // Now chechking whether the current logged in user is same as a the user who added/posted this job

    if (addedBy !== currUserId) {
        return res
            .status(409)
            .json(new ApiResponse(409, "You are not authorized to delete this book!!"));
    }

    // Deleting the book
    await Book.deleteOne({ _id: bookId });


    return res
        .status(200)
        .json(new ApiResponse(202, [], "Book Deleted Successfully"));
    // if ()
}


export { postBook, getMyBooks, getAllBooks, deleteBook }