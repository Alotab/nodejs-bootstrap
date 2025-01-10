const Book = require('../models/book')


const getAllBooks = async(req, res)=> {
    try {
        const allBooks = await Book.find({});
        if(allBooks?.length > 0){
            res.status(200).json({
                success : true,
                message : 'List of books fetched successfully',
                data : allBooks
            })
        } else {
            res.status(404).json({
                success : false,
                message : 'No Books found in collections'
            })
        };

    }catch(e){
        console.log('Error', e);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        })
    }
};

const getSingleBookById = async(req,res)=> {
    try {
        const getCurrentBookID = req.params.id;
        const bookDetailsByID = await Book.findById(getCurrentBookID);
        if(!getCurrentBookID) {
            return res.status(404).json({
                success : false,
                message: 'Book with the current ID is not found. Try with different ID'
            });
        }

        res.status(200).json({
            success : true,
            data : bookDetailsByID
        })

    } catch(error){
        console.log('Error', e);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    };
};

const addNewBook = async(req, res)=> {
     try {
        const newBookFormData = req.body;
        console.log('This is the body: ', newBookFormData);
        const newlyCreatedBook = await Book.create(newBookFormData);
        // console.log(newlyCreatedBook);
        if(newBookFormData) {
            res.status(201).json({
                success : true,
                message : 'Book added',
                data : newBookFormData
            })
        }
    } catch(error) {
        console.log('Error', error);
    }
};

const updateBook = async(req, res)=> {
    try {
        const userId = req.userInfo.userId;
        const updateBookFormData = req.body;
        const getCurrentBookID = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(
            getCurrentBookID, 
            updateBookFormData,
            {
                new: true,
            }
        );

        if(!updatedBook){
            res.status(404).json({
                success : false,
                message : `Book is found with this ID ${getCurrentBookID}`
            });
        };
        res.status(200).json({
            success : true,
            message : 'Book updated successfully',
            data: updatedBook
        })

    } catch(error){
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    }
};

const deleteBook = async(req, res)=> {
    try {
        const getCurrentBookID = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);

        if(!deletedBook){
            res.status(404).json({
                success : false,
                message : `Book with this ID ${getCurrentBookID} was not found`
            })
        }
        res.status(200).json({
            success : true,
            data : deletedBook
        })

    } catch(error) {
        console.log('Error', error);
        res.status(500).json({
            success : false,
            message: 'Something went wrong! Please try again'
        });
    }
};

module.exports = { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook}