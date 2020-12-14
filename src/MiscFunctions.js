
//takes in an array of all the notes and a noteId to find the correct note
export const grabNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

// if there is no folderId display all the notes, else return the notes in the folder with that Id
export const grabNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)
