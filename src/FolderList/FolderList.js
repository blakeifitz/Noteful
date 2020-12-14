import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import NoteContext from '../NoteContext';
import './FolderList.css';

//displays a list of folders with paths to display just items in those folders -- NavLink is Link with special properties for when selected 

export default class FolderList extends React.Component {
  static contextType = NoteContext


  render(){
    const {folders} = this.context;

  return (
    <div className='FolderDiv'>
      <ul className='FolderList'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='FolderLink'
              to={`/folder/${folder.id}`}
            >
              {folder.name}
            </NavLink>
          </li>
        )}
         <Link to='/add-folder'>
        <button className='add-folder-button'>Add New Folder</button>
        </Link>
      </ul>
    </div>
  )
 }
}

