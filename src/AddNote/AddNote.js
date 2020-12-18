import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

export default class AddNote extends React.Component{
static default ={
    history: {
        push: () => {}
    },
}

static contextType = NoteContext;

handleSubmit = e => { 
    e.preventDefault();
    const newNote ={
        name: e.target['note-name'].value,
        content: e.target['note-content'].value,
        folder: e.target['note-folder-id'].value,
        modified: new Date(),
    }


fetch(`https://noteful-bfitz.herokuapp.com/api/notes`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
    .then(res => {
      if (!res.ok)
        return res.json().then((e) => Promise.reject(e))
      return res.json();
    })
    .then((note) =>{
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folder}`);
      }) 
      .catch((error) => {
        console.error({ error })
      })
    }

render(){
    const { folders=[] } = this.context
    return(
        <section className='AddNote'>
        <h2>Create a note</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name:{' '}
            </label>
            <input type='text' id='note-name-input' name='note-name' required/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content:{' '}
            </label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
              <label htmlFor='note-folder-select'>Folder:{' '}</label>
               <select id='name-folder-select' name='note-folder-id'>
               <option value={null}>...</option>
               {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
               </select>   
          </div>
          <div className='buttons'>
            <button type='submit'>
              Submit
            </button>
          </div>
        </form>
        <button onClick={() => (this.props.history.goBack())}>Cancel</button>
      </section>
    )
}
}
AddNote.propTypes = {
  history: PropTypes.object.isRequired,
  }