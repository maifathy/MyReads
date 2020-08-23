import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Books from './Books.js';

const BookShelf = (props) => (
  <div>
    <div className="bookshelf">
      <h2 className="bookshelf-title">{(props.shelf.charAt(0).toUpperCase() + props.shelf.slice(1))
        .match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</h2>
      <div className="bookshelf-books">
          <Books books={props.books}/>
      </div>
    </div>
    <div className="open-search">
        <Link to='/search'>Add a book</Link>
    </div>
  </div>
);
BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired
}

export default BookShelf;
