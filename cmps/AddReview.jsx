import { bookService } from "../services/book.service.js"
import { ReviewList } from "./ReviewList.jsx"
// import { handleChange } from "../services/util.service.js"

const { useState, useEffect } = React

export function AddReview({ book, onRemoveReview }){
    // const review = {fname, rating, readAt}

    const [review, setReview] = useState({
        fname: '',
        rating: 0,
        readAt: '',
    })
    const [reviewsList, setReviewsList] = useState([])

    
    // USE EFFECT SO THAT EVERY TIME THE REVIEW CHANGES, IT WILL RENDER ON THE HTML TOO:

    // useEffect(() => {
    //     loadReviews()
    // },[[setReview]])

    // function loadReviews(){
    //     bookService.get(book.id)
    //         .then(book => {
    //             setReview(prevReview => ({ ...prevReview, [field]: value }))
    //         })
    //         .catch(err => {
    //             console.log('err:', err)
    //         })
    // }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        bookService.addReview(book.id,review)
        setReviewsList(prevReviews => [...prevReviews, review])
        console.log('review',review)
        
        setReview({ fname: '', rating: 0, readAt: '' })
    }

    function onRemoveReview(reviewId){
        bookService.removeReview(book.id, reviewId)  
    }

    const {fname, rating, readAt} = review
    const isValid = fname && rating && readAt


    return (
        <section className = "add-review">
        
        {(!book.reviews || book.reviews.length === 0)
        ? <p>No reviews yet...</p>
        : <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
        }

            <form onSubmit={onSubmitReview}>
                <label htmlFor="fname">Full Name</label>
                <input onChange={handleChange} name="fname" id="fname" type="text" />

                <label htmlFor="rating">Rating</label>
                <select onChange={handleChange} name="rating" id="rating" value={rating}>
                    <option value="">Select rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label htmlFor="readAt">Read date</label>
                <input onChange={handleChange} name="readAt" id="readAt" type="date" />

                <button disabled={!isValid}>Add a review</button>
            </form>
        </section>
    )
}