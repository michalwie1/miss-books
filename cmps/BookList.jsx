import { BookPreview } from "./BookPreview.jsx";


const { useState, useEffect } = React


export function BookList({ books }) {
// export function BookList({ books, onRemoveBook, onSelectBookId }) {
    return (
        <ul className="book-list container">
            {books.map((book,bookIdx) =>
                <li key={book.id}>
                    <BookPreview book={book} imgIdx={bookIdx} />
                    {console.log(bookIdx)}
                    <section>
                        {/* <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button> */}
                        {/* <button onClick={() => onSelectBookId(book.id)} >Details</button> */}
                    </section>
                </li>
            )}
        </ul>
    )


}
