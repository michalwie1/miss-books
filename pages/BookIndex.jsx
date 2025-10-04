import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    // function onSelectBookId(bookId) {
    //     setSelectedBookId(bookId)
    // }

    function onRemoveBook(bookId){
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed successfully!')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Cannot remove book - ${bookId}`)
            })
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    if (!books || !books.length) return <div className="loader">Loading...</div>
    return (
        <section className="book-index main-layout">
            <h2>Books</h2>

            {selectedBookId
                ? <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
                : <Fragment>
                    <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />

                    <section className="container">
                        <button className="edit-link"><Link to="/book/edit">Add Book</Link></button>
                    </section>

                    <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    // onSelectBookId={onSelectBookId}
                    />
                  </Fragment>
                
            }

        </section>
    )
}