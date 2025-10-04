
export function BookPreview({ book }) {
  
    const { title, listPrice, thumbnail } = book
    // console.log(book)
    // console.log(listPrice)
    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h3>Price: {listPrice.amount} {listPrice.currencyCode}</h3>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}