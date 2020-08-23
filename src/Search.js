import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Books from './Books.js';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  state={
    searchBooks: [],
    noResult: ''
  };
  search = (query) => {
    const refBooks = this.props.books;
    if(query === '') query = ' ';
    BooksAPI.search(query)
    .then((books) => {
      if(books !== undefined && books.length > 0){
        books.map((book) => {
          /*for(let i=0; i < refBooks.length; i++)
          {
            if(book.id === refBooks[i].id)
            {
               return book.shelf = refBooks[i].shelf;
            }
            else return book
          }*/
          return refBooks.map((refBook) => {
            if(book.id === refBook.id)
              return book.shelf = refBook.shelf;
            else return book
          })
        });
        this.setState(()=> ({
            searchBooks: books,
            noResult: ''
        }))
      }
      else {
        this.setState(()=> ({
            searchBooks: [],
            noResult: 'No Results.'
        }))
      }
    })
    .catch((e) => console.log('Search Error: ' + e))
  };
  componentDidMount(){
    this.search('');
  }
  render(){
    const { searchTerm } = this.props;
    const { searchBooks, noResult } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={searchTerm}
            onChange={(e) => this.search(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <Books books={searchBooks} />
          {noResult}
        </div>
      </div>
    )
  }
}

export default Search;
