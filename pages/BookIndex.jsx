import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    console.log(books)
    useEffect(() => {
        loadBooks()
    }, [])
    // }, [filterBy])


    function loadBooks() {
        bookService.query()
        // bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    if (!books || !books.length) return <div>Loading...</div>
    return (
        <section>
            <h2>Book Index</h2>
            <BookList books={books} />
            {/* <BookDetails /> */}
            {/* <BookDetails onBack={() => setSelectedCarId(null)} carId={selectedCarId} /> */}
            {/* <h3>{books[0].title}</h3> */}
        </section>
    )
}