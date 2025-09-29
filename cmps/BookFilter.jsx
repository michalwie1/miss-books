const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    const { title, listPrice } = filterByToEdit

    const isValid = title && listPrice

    return (
        <section className="book-filter container main-layout">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} name="title" id="title" type="text" />


                <label htmlFor="listPrice">Price</label>
                <input onChange={handleChange} value={listPrice || ''} name="listPrice" id="listPrice" type="number" />
                <button disabled={!isValid}>Submit</button>
            </form>
        </section>
    )
}
