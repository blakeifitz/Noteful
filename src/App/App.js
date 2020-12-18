import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteContext from "../NoteContext";
import FolderList from "../FolderList/FolderList";
import MainList from "../MainList/MainList";
import NotePage from "../NotePage/NotePage";
import AddNote from "../AddNote/AddNote";
import AddFolder from "../AddFolder/AddFolder";
import "./App.css";
import ErrorBoundary from "../AddNote/ErrorBoundary";

//TODO 'All Notes' button -- removeNote, removeFolder, addNote, addFolder.

class App extends Component {
  //State holds data from AJAX request
  state = {
    notes: [],
    folders: [],
  };
  componentDidMount() {
    Promise.all([
      fetch(`https://noteful-bfitz.herokuapp.com/api/notes`),
      fetch(`https://noteful-bfitz.herokuapp.com/api/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
         return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }
  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleDeleteFolder = (folderId) => {
    this.setState({
      folders: this.state.folders.filter((folder) => folder.id.toString() !== folderId),
    });
  };
  handleAddNote = (note) => [
    this.setState({
      notes: [...this.state.notes, note],
    }),
  ];
  handleAddFolder = (folder) => [
    this.setState({
      folders: [...this.state.folders, folder],
    }),
  ];

  renderFolderList() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={FolderList} />
        ))}
      </>
    );
  }

  renderMain() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={MainList} />
        ))}
        <Route path="/note/:noteId" component={NotePage} />
        <Route path="/add-note" component={AddNote} />
        <Route path="/add-folder" component={AddFolder} />
      </>
    );
  }

  render() {
    const context = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      deleteFolder: this.handleDeleteFolder,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
    };
    return (
      <NoteContext.Provider value={context}>
        <div className="App">
          <ErrorBoundary>
            <nav className="Folders">{this.renderFolderList()}</nav>
            <header className="Header">
              <h1>
                <Link to="/">Noteful</Link>
              </h1>
            </header>
            <main className="AppMain">{this.renderMain()}</main>
          </ErrorBoundary>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
