
import { bookService } from "../services/book.service.js"
import { debounce } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookAdd(){

    // const [booksList, setBooksList] = useState()

    const [bookToSearch, setBookToSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleSearchDebounce = useRef(debounce(handleSearch, 2000))
    const googleBooks = searchBooks()

    //doesnt work
    // useEffect(() => { 
    //     googleBooks = searchBooks()
    //     console.log(googleBooks)
    // },[[setBookToSearch]])

    function searchBooks(){
        const googleJson =
        {
            "kind": "books#volumes",
            "totalItems": 1000000,
            "items": [
                {
                    "kind": "books#volume",
                    "id": "nBuA0hmspdMC",
                    "etag": "CBcQPfi7OUE",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/nBuA0hmspdMC",
                },
                {
                    "kind": "books#volume",
                    "id": "TIlTEQAAQBAJ",
                    "etag": "r2IpZw6LRzI",
                    "selfLink": "https://www.googleapis.com/books/v1/volumes/TIlTEQAAQBAJ",
                }
                ],
        }

    return JSON.parse(googleJson)

         // https://www.googleapis.com/books/v1/volumes?printType=books&q={bookToSearch}
    }

    // function onSave(book) {
    //     booksService.addGoogleBook(book)
    //         .then(() => showSuccessMsg('Book has successfully saved!'))
    //         .catch(() => showErrorMsg(`couldn't save book`))
    //         .finally(() => navigate('/book'))
    // }

    // function handleSearch(target) {
    //     bookService.getGoogleBooks(target.value)
    //         .then(books => {
    //             setBooksList(books)
    //         })
    //         .finally(() => setIsLoading(false))
    // }

    // function onSearch({ target }) {
    //     if (!target.value) return
    //     setIsLoading(true)
    //     handleSearchDebounce.current(target)
    // }

    return (
    
        <section className="book-add">
            <h1>Add book from google</h1>

            {/* <label htmlFor="bookAdd">Book name</label> */}
            <input onChange={onSearch} placeHolder="Book name..." name="bookAdd" id="bookAdd" type="text" />

            <ul>
            {googleBooks &&
            googleBooks.items.map(googleBook => (
                    <li className="review" key={googleBook.id}>
                        {googleBook.title}
                        <button onClick={() => bookService.addGoogleBook(googleBook)}>+</button>
                    </li>
                ))}
            </ul>

        </section>
    )
}