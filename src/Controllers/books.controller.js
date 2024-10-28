import { Book } from "../Models/books.model.js";
import { ApiError } from "../Utils/ApiErrors.js"
import { ApiResponse } from "../Utils/ApiResponse.js";

// 
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
        .json(201, new ApiResponse(201, getPostedBook, "Book uploaded successfully"));
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

export { postBook, getMyBooks }