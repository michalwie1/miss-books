
import { bookService } from "../services/book.service.js"
import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookAdd(){

    const [booksList, setBooksList] = useState()

    const [bookToSearch, setBookToSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleSearchDebounce = useRef(debounce(handleSearch, 2000))
    // const googleBooks = searchBooks()

    //doesnt work
    // useEffect(() => { 
    //     googleBooks = searchBooks()
    //     console.log(googleBooks)
    // },[[setBookToSearch]])

    useEffect(() => { 
        console.log(booksList)
    },[[setBooksList]])

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

    function handleSearch(target) {
        bookService.getGoogleBooks(target.value)
            .then(books => {
                setBooksList(books)
            })
            .finally(() => setIsLoading(false))
    }

    function onSearch({ target }) {
        if (!target.value) return
        setIsLoading(true)
        handleSearchDebounce.current(target)
    }

    function onAddGoogleBook(book){
        bookService.addGoogleBook(book)
        // bookService.save(bookToEdit)
        //             .then(() => {
        //                 showSuccessMsg('Book saved successfully')
        //                 navigate('/book')
        //             })
    }

    

    return (
    
        <section className="book-add">
            <h1>Add book from google</h1>

            <input onChange={onSearch} placeholder="Book name..." name="bookAdd" id="bookAdd" type="text" />

            <ul>
            {booksList &&
            booksList.map(book => (
                    <li className="review" key={book.id}>
                        {book.title}
                        <button onClick={() => onAddGoogleBook(book)}>+</button>
                    </li>
                ))}
            </ul>

        </section>
    )
}