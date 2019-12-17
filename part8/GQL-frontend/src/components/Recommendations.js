import React from 'react'

const Recommendations = (props) => {
    const favoriteGenre = props.me.data.me.favoriteGenre
    const filteredBooks = props.filteredBooks.data.allBooks
    const booksToShow = () => (
        filteredBooks.map(b => {
            if (b.genres.includes(favoriteGenre)) {
                return (
                <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author}</td>
                    <td>{b.published}</td>
                </tr>
                )
            }
            return null
        })
    )

    if (!props.show) {
        return null
    }
    return (
        <div>
            <h1>recommendations</h1>
            <div>
                books in your favorite genre <strong>{favoriteGenre}</strong>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>
                        title
                        </th>
                        <th>
                        author
                        </th>
                        <th>
                        published
                        </th>
                    </tr>
                    {booksToShow()}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations