
export function BookPreview({ book }) {
  
    const { title, listPrice, thumbnail } = book

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h3>Score: {listPrice.amount}</h3>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}