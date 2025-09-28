import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState(null)

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

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onRemoveBook(){}


    if (!books || !books.length) return <div>Loading...</div>
    return (
        <section>
            <h2>Book Index</h2>
            {/* <BookList 
                books={books}
                onRemoveBook={onRemoveBook}
                onSelectBookId={onSelectBookId}
             /> */}

             {console.log(selectedBookId)}

            {selectedBookId
                ? <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />
                :
                
                    
                    (
                    <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onSelectBookId={onSelectBookId}
                    />
                  )  
                
            }



            {/* <BookDetails /> */}
            {/* <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)}  /> */}
            {/* <h3>{books[0].title}</h3> */}
        </section>
    )
}
{/* <Fragment>
                </Fragment> */}