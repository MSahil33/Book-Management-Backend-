import mongoose from "mongoose";

// Example book data models
// "title": "The Catcher in the Rye",
// "author": "J.D. Salinger",
// "isbn": "978-0-316-76948-0",
// "genre": "Fiction",
// "language":"English"
// "publishedDate": "1951-07-16",
// "summary": "A young boy navigates adolescence...",
// "addedBy": "User ID"  

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // Creating a list of authors
    author: [
        {
            type: String,
            required: true
        },
    ],
    isbn: {
        type: String,
        required: true
    },
    // A book can belong to single or multiple genres
    genre: [
        {
            type: String,
            required: true
        },
    ],
    publishedDate: {
        type: Date,
        default: Date.now // Default date as today's date
    },
    summary: {
        type: String
    },
    language: {
        type: String,
        default: "English"
    },
    // In this referring or pointing to the user object who added this book
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Book = new mongoose.model("Book", bookSchema);