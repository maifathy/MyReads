import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelvesContext from './ShelvesContext.js';

class ShelfChange extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  }
  state={
    shelf:this.props.book.shelf
  }
  handleChange = (event) => {
    const currentShelf = event.target.value === 'none' ? undefined : event.target.value;
    if(this.context.onShelfChange)
      this.context.onShelfChange(this.props.book, currentShelf)
      .then(res => {
        this.setState(()=> ({
          shelf: currentShelf
        }))
      })
  }
  render(){
    const { shelf } = this.state
    return(
      <div className="book-shelf-changer">
        <select value={shelf === '' || shelf === undefined ? 'none' : shelf} onChange={(event) => this.handleChange(event)}>
          <option value="move" disabled>Move to...</option>
          {this.context.shelves.map((myShelf) =>
            <option key={myShelf} value={myShelf}>{(myShelf.charAt(0).toUpperCase() + myShelf.slice(1))
              .match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</option>
            )
          }
          <option value="none">None</option>
        </select>
      </div>

    )
  }
}
ShelfChange.contextType = ShelvesContext;
export default ShelfChange;

// props comes here TODO
