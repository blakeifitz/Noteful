
//takes in an array of all the notes and a noteId to find the correct note
export const grabNote = (notes=[], noteId) =>{
 return notes.find(note => note.id.toString() === noteId)
}

// if there is no folderId display all the notes, else return the notes in the folder with that Id
export const grabNotesForFolder = (notes=[], folderId) =>{
  return (
  !folderId
    ?  notes
    : notes.filter(note => note.folder.toString() === folderId))}
