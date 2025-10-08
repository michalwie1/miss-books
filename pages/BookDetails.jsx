import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        loadBook()
    },[[params.bookId]])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }


    if (!book) return <div className="loader">Loading Details...</div>

    function pageCountTxt(){
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    function publishedDate(){
        const today = new Date()
        const currentYear = today.getFullYear()    
        if(currentYear - book.publishedDate > 10) return 'Vintage'
        if(currentYear - book.publishedDate < 1) return 'New'
    }

    let priceClass = book.listPrice.amount < 20 ? 'low' : ''
    // let onSaleImg = book.listPrice.isOnSale ? '../assets/img/sale.png' : ''

    return (
        <section className="book-details main-layout">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>

            {book.listPrice.isOnSale &&
             <img className="sale" src="../assets/img/sale.png"></img>}

            {/* <p>{book.authors}</p> */}
            <LongTxt txt={book.description} />
            <p>Page Count: {pageCountTxt()}</p>
            <p>Publish Date: {publishedDate()}</p>
            <p className={`price ${priceClass}`}>Book Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <img src={book.thumbnail} alt="Book Image" />
            <button onClick={onBack}>Back</button>    

            <button onClick={onBack}>Add Review</button>    
            <AddReview book={book} />

            <button><Link to={`/book/${book.prevBookId}`}>Prev</Link></button>
            <button><Link to={`/book/${book.nextBookId}`}>Next</Link></button>

        </section>
    )
}
