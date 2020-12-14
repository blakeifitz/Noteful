import React from "react";

export default class PageParse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      cards: {}
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    let notes = event.currentTarget["notes"].value.split(/\r?\n/);
    console.log("NOTESSPLIT", notes);

    notes = notes.filter((note) => note !== "");
    console.log("FILTERED", notes);

    notes = notes.map((note) => note.split(":"));
    console.log("COLON SPLIT", notes);

    let keywords = notes.map((note) =>
      note.slice(0, 1));
    console.log("KEYWORDS", keywords)

    let definitions = notes.map((note) =>
      note.slice(1, 2));

    console.log("DEFINITIONS", definitions);

    keywords = keywords.map( keyword => 
      keyword.pop())
console.log("POPPED keyword", keywords)
      
    definitions = definitions.map( definition => 
                definition.pop())
      console.log("POPPED DEFINITION", definitions)

     let card = [];
    for (var i = 0; i < keywords.length; i++){
      card = [
        {keyword: keywords[i]},
        {definition: definitions[i]}
      ]
      console.log('CARD', card);
  }}
  render() {
    return (
      <div>
        <h2>Page Parse</h2>


        <>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <textarea id="notes"></textarea>
            <button>Submit</button>
          </form>
        </>
      </div>
    );
  }
}
