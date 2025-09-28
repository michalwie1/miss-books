import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    
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

    if (!book) return <div>Loading Details...</div>

    let pageCountTxt = ''
    console.log(book)
    if (book.pageCount > 500) {pageCountTxt = 'Serious Reading'}
    if (book.pageCount > 200) {pageCountTxt = 'Descent Reading'}
    if (book.pageCount < 100) {pageCountTxt = 'Light Reading'}

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            {/* <p>{book.authors}</p> */}
            <p>Page Count: {pageCountTxt}</p>
            <p>Book Price: {book.listPrice.amount}</p>
            <p>{book.description}</p>
            {/* <img src={`../assets/img/${vendor}.png`} alt="Book Image" /> */}
            <button onClick={onBack}>Back</button>
        </section>
    )
}
