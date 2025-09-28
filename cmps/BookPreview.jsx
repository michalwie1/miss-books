
export function BookPreview({ book }) {
  
    const { title, listPrice } = book
    // const bookImg = `../assets/img/${imgIdx++}.jpg`

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h3>Score: {listPrice.amount}</h3>
            {/* <img src={bookImg} alt="Book Image" /> */}
        </article>
    )
}