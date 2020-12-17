import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import {grabNote} from '../MiscFunctions';

import './NotePage.css';

//returns NOTE and gives  -- formats note content and returns p elements content with index as key -- Back button uses history prop to go back to last path

export default class NotePage extends React.Component {
  static contextType = NoteContext;

  static default = {
    notes: [],
  }
  

  render(){
    const {notes} = this.context;
    const {noteId} = this.props.match.params;

    const note = grabNote(notes, noteId) || { content: '' }
    return(
    <section className='NotePage'>
      <Note
        id={note.id}
        name={note.name}
        
        modified={note.modified}
        history={this.props.history}
      />
      <div className='NotePageContent'>
        {note.content.split(/\n \r/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
      <div className='BackButton'>
      <button
        onClick={() => (this.props.history.goBack())}
      >
        <br />
        Back
      </button>
    </div>
    </section>
      ) 
        }
}

NotePage.propTypes ={
 content: PropTypes.objectOf(PropTypes.string),
 history: PropTypes.object.isRequired,
 match: PropTypes.object.isRequired,
}

