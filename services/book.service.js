import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'books'
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
    // getEmptyBook,
    // getNextCarId,
    // getFilterBy,
    // setFilterBy,
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

// function getEmptyBook(title = '', listPrice = 0) {
//     return { id: '', title, listPrice }
// }

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
//     if (filterBy.listPrice !== undefined) gFilterBy.listPrice = filterBy.listPrice
//     return gFilterBy
// }

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

// function _createBooks() {
//     let book = utilService.loadFromStorage(BOOK_KEY)
//     if (!book || !book.length) {
//         book = []
//         book.push(_createBook('Harry Potter', 300))
//         book.push(_createBook('Winnie the Pooh', 120))
//         book.push(_createBook('The Little Prince', 250))
//         utilService.saveToStorage(BOOK_KEY, book)
//     }
// }

// function _createBook(title, listPrice = 250) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = utilService.makeId()
//     return book
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    
    if (books && books.length) return books
    books = []

    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [
        ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]
      ],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: "en",
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7
      }
    }

    books.push(book)
  }
  utilService.saveToStorage(BOOK_KEY, books)
  console.log('books', books)
}
