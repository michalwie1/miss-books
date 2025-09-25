const { useState } = React

import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"


export function App() {
    const [page, setPage] = useState('home')

    return (
        <section className="app">
            <header className="app-header container">
                <section>
                    <h1>Miss Books</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')}>Home</a>
                        <a onClick={() => setPage('about')}>About</a>
                        <a onClick={() => setPage('books')}>Books</a>
                    </nav>
                </section>
            </header>


            <main>
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )

}