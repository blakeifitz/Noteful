import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
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
      const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'},
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(() =>{
      this.context.deleteNote(noteId)
      }) 
      .catch(error => {
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
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
  }
}
Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
  }
