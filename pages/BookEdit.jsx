import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    console.log(bookToEdit)

    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value


        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;


            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        console.log('bookToEdit',bookToEdit)
        bookService.save(bookToEdit)
            .then(() => {
                showSuccessMsg('Book saved successfully')
                navigate('/book')
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
                showErrorMsg('Cannot save book')
            })
    }



    const loadingClass = isLoading ? 'loading' : ''
    const { title, listPrice } = bookToEdit
    console.log(bookToEdit)
    console.log(listPrice.amount)
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form className={loadingClass} onSubmit={onSaveBook}>

                <label htmlFor="title">Book Name</label>
                <input value={title} onChange={handleChange} name="title" id="title" type="text" />

                <label htmlFor="price">Book Price</label>
                <input value={listPrice.amount} onChange={handleChange} name="price" id="price" type="number" />


                <button disabled={!title}>Save</button>
            </form>

        </section>
    )


}
