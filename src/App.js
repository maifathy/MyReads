import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf.js';
import Search from './Search.js';
import ShelvesContext from './ShelvesContext.js';

class BooksApp extends React.Component {
  state = {
     books: [],
     shelves: []
  }
  getAllBooks = () => {
    BooksAPI.getAll()
    .then((books) => {
      if(books.length > 0)
      {
        const shelves = [];
        books.map((book) => {
          return shelves.push(book.shelf)
        })
        const uniqueShelves =
         shelves.filter((v,i) => shelves.indexOf(v) === i)

        this.setState(()=> ({
          shelves: uniqueShelves,
          books: books
        }))
      }
    })
  }
  onShelfChange = (book, shelf) => {
    return BooksAPI.update(book, shelf)
    .then(res => {
      this.getAllBooks();
    })
  }
  onShelfChangeBySearch = (book, shelf) => {
    return BooksAPI.update(book, shelf)
    .then(res => {
      this.getAllBooks();
    });
  }
  //life-cycle event
  componentDidMount(){
    this.getAllBooks();
  }

  render() {
    const { books, shelves } = this.state
    return (
        <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
              <ShelvesContext.Provider value={{ shelves: shelves, onShelfChange: this.onShelfChange }} >
                {shelves.map((shelf) =>
                  <BookShelf key={shelf} shelf={shelf} books={books.filter((book) => {
                      return book.shelf === shelf
                    }
                  )}/>
                )}
              </ShelvesContext.Provider>
              </div>
            </div>
          )} />
          <Route path='/search' render={() => (
            <ShelvesContext.Provider value={{ shelves: shelves, onShelfChange: this.onShelfChangeBySearch }} >
              <Search books={books}/>
            </ShelvesContext.Provider>
          )} />
        </div>
    )
  }
}

export default BooksApp
