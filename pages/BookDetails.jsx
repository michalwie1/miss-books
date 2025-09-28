import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    console.log(bookId)
    
    useEffect(() => {
        loadBook()
    },[])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                console.log('Book from service:', book)
                setBook(book)})
            .catch(err => console.log('err:', err))
    }
    console.log(book)

    // const bookImg = 
    if (!book) return <div>Loading Details...</div>
    const { title, listPrice } = book
    return (
        <section className="book-details">
            <h1>Book Title: {title}</h1>
            <h1>Book Price: {listPrice}</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            {/* <img src={`../assets/img/${vendor}.png`} alt="Book Image" /> */}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
