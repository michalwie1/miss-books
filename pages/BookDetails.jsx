import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('err:', err))
    }

    // const bookImg = 
    if (!book) return <div>Loading Details...</div>
    const { title, listPrice } = book
    return (
        <section className="book-details">
            <h1>Book Title: {title}</h1>
            <h1>Book Price: {price}</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            {/* <img src={`../assets/img/${vendor}.png`} alt="Car Image" /> */}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
