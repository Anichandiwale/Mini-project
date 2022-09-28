const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const bookController = require("../controllers/bookController")
const commonMiddleware = require("../middleware/commonMiddleware")
const getBookscontroller = require("../controllers/getBookController")
const reviewController = require('../controllers/reviewController')

// ------------POST REGISTER API------------------------//

router.post("/register",userController.createUser)

// ---------------POST LOGIN API------------------------//

router.post("/login",userController.login)

// --------------POST BOOKS API--------------------------//

router.post("/books",commonMiddleware.Authentication ,bookController.createBook)

// ------------GET BOOKS API-----------------------------//

router.get("/books",commonMiddleware.Authentication, getBookscontroller.getBooks)

// -------------GET BOOKSBYID API------------------------//

router.get("/books/:bookId", commonMiddleware.Authentication, getBookscontroller.getBooksById)

// -------------UPDATE BOOKS API--------------------------//

router.put("/books/:bookId"  ,commonMiddleware.Authentication, commonMiddleware.Authorisation, bookController.updateBook)

// -------------DELETE BOOKS API---------------------------//

router.delete("/books/:bookId" ,commonMiddleware.Authentication, commonMiddleware.Authorisation  ,bookController.deletedBooks)

//----------POST REVIEW BOOKS API--------------------------//

router.post('/books/:bookId/review', reviewController.createReview)

// ---------------UPDATE REVIEW BOOKS API-------------------//

router.put("/books/:bookId/review/:reviewId" , reviewController.updateReview)

//----------------DELETE REVIEW BOOKS API--------------------//

router.delete("/books/:bookId/review/:reviewId" , reviewController.deleteReview)


module.exports = router;
