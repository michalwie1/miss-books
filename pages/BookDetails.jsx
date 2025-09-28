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

    function pageCountTxt(){
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    function publishedDate(){
        const today = new Date()
        const currentYear = today.getFullYear()
        
        if(currentYear - book.publishedDate > 10) return 'Vintage'
        if(currentYear - book.publishedDate < 1) return 'New'
    }

    let priceClass = book.listPrice.amount < 20 ? 'low' : ''

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            {/* <p>{book.authors}</p> */}
            <p>{book.description}</p>
            <p>Page Count: {pageCountTxt()}</p>
            <p>Publish Date: {publishedDate()}</p>
            <p className={`price ${priceClass}`}>Book Price: {book.listPrice.amount}$</p>
            <img src={book.thumbnail} alt="Book Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}
