import React from 'react';
 
 const NoteContext = React.createContext({
    notes:[],
    folders:[],
    addNote: () => {},
    deleteNote: () => {},
    addFolder: () => {},
    deleteFolder: () => {},
})

export default NoteContext