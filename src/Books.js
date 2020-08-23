import React from 'react';
import PropTypes from 'prop-types';
import ShelfChange from './ShelfChange.js'

const Books = (props) => (
  <ol className="books-grid">
    {props.books !== undefined && props.books.length > 0 &&
      (props.books.map((book) =>
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193
                , backgroundImage:
                (book.imageLinks !== undefined ?
                `url("${book.imageLinks.thumbnail} || ${book.imageLinks.smallThumbnail}")`
                : ''
              )
              }}>
              </div>
              <ShelfChange book={book}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{(book.authors !== undefined ? book.authors.map((author, i) =>
              book.authors.length - 1 === i ? `${author}` : `${author}, `) : ''
            )}</div>
          </div>
        </li>
      )
    )}
  </ol>
);
Books.propTypes = {
  books: PropTypes.array
}

export default Books;
