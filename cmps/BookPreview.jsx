
export function BookPreview({ book, imgIdx }) {
  
    console.log(book)
    console.log(imgIdx++)
    const { title, listPrice } = book
    const bookImg = `../assets/img/${imgIdx++}.jpg`

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h3>Score: {listPrice}</h3>
            <img src={bookImg} alt="Book Image" />
        </article>
    )
}