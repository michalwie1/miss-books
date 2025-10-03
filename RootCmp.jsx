// const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

import { UserMsg } from "./cmps/UserMsg.jsx"
import { NotFound } from "./cmps/NotFound.jsx"


export function App() {

    return (
        <Router >
        <section className="app">
            <AppHeader />
            <main>
                  <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} /> {/* ADD */}
                        <Route path="/book/edit/:bookId" element={<BookEdit />} /> {/* EDIT */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
            </main>
            <UserMsg />
        </section>
        </Router>
    )

}