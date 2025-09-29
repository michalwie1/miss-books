
export function AppHeader({ setPage }) {

    return (
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
    )
}
