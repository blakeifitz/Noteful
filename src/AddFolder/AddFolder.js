import React from "react";
import NoteContext from "../NoteContext";
import PropTypes from "prop-types";

export default class AddFolder extends React.Component {
  static default = {
    history: {
      push: () => {},
    },
  };
  static contextType = NoteContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: e.target["folder-name"].value,
    };
    fetch(`http://localhost:8000/api/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Name: </label>
            <input
              type="text"
              id="folder-name-input"
              name="folder-name"
              required
            />
          </div>
          <div className="buttons">
            <button type="submit">Add folder</button>
          </div>
        </form>
        <button onClick={() => this.props.history.goBack()}>Cancel</button>
      </section>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
};
