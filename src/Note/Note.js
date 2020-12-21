import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import './Note.css';

//creates a note item that acts a link

export default class Note extends React.Component {
  static default = {
    onDeleteNote: () => {},
  }

  static contextType = NoteContext;

    handleClickDelete = e => {
      e.preventDefault();
      const noteId = this.props.id
        this.props.history.push(`/`)
    fetch(`https://noteful-bfitz.herokuapp.com/api/notes/${noteId}`, {
      
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'},
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      
    })
    .then(() =>{
      console.log("noteID", noteId)
       this.context.deleteNote(noteId)
      }) 
    .catch((error) => {
      console.error({ error })
    })
}
    render(){
  return (
    <div className='Note'>
      <h2 className='NoteTitle'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button
       className='NoteDelete'
        type='button'
        onClick={this.handleClickDelete}>
        Remove
      </button>
      <div className='NoteDates'>
        <div className='NoteModified'>
          Modified: {''}
          <span className='Date'>
            {this.props.modified}
          </span>
        </div>
      </div>
    </div>
  )
  }
}
Note.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string,
  }
