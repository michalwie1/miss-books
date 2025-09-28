import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

// {
//  "id": "OXeMG8wNskc",
//  "title": "metus hendrerit",
//  "description": "placerat nisi sodales suscipit tellus",
//  "thumbnail": "http://ca.org/books-photos/20.jpg",
//  "listPrice": {
//  "amount": 109,
//  "currencyCode": "EUR",
//  "isOnSale": false
//  }
//  }

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    // getNextCarId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                console.log(filterBy.title)
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.listPrice) {
                books = books.filter(book => book.listPrice >= filterBy.listPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = 0) {
    return { id: '', title, listPrice }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.listPrice !== undefined) gFilterBy.listPrice = filterBy.listPrice
    return gFilterBy
}

function getDefaultFilter() {
    return { title: '', listPrice: '' }
}

// function getNextBookId(bookId) {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
//             if (nextBookIdx === books.length) nextBookIdx = 0
//             return books[nextBookIdx].id
//         })
// }

function _createBooks() {
    let book = utilService.loadFromStorage(BOOK_KEY)
    if (!book || !book.length) {
        book = []
        book.push(_createBook('Harry Potter', 300))
        book.push(_createBook('Winnie the Pooh', 120))
        book.push(_createBook('The Little Prince', 250))
        utilService.saveToStorage(BOOK_KEY, book)
    }
}

function _createBook(title, listPrice = 250) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}