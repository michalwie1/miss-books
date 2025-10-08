import { bookService } from "../services/book.service.js"
// import { handleChange } from "../services/util.service.js"

const { useState } = React

export function ReviewList({ book, onRemoveReview }){

const stars = '⭐️'
    return (
            <section className="book-reviews">
                <h3>Book Reviews:</h3>
                {book.reviews.map((review) => (
                    <div className="review" key={review.id}>
                        <p>{review.fname}</p>
                        <p>{stars.repeat(+review.rating)}</p>
                        <p>{review.readAt}</p>
                        <button onClick={() => onRemoveReview(review.id)}>X</button>
                    </div>
                ))}
            </section>
        )
        }

