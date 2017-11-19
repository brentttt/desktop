import React from 'react';

const AddNote = (props) => (
  <button className="add-note" onClick={props.handleAddNote}>+</button>
);

export default AddNote;
