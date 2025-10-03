const { useState } = React

export function BookEdit(){

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
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Book Name</label>
                <input onChange={handleChange} name="title" id="title" type="text" />

                <label htmlFor="price">Book Price</label>
                <input onChange={handleChange} name="price" id="price" type="number" />

            </form>
        </div>
    )
}