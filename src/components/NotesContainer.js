import React, {Component} from 'react';
import {connect} from 'react-redux';

import Note from './note.js';

const NotesContainer = (props) => (
    <div className="notes-container" style={{background: props.backgroundColor}}>
      {props.notes.map((note, index) => {
        return (
          <Note
            key={note.id}
            note={note}
            backgroundColor={props.backgroundColor}
            handleDeleteNote={props.handleDeleteNote}
            handleUpdateTitle={props.handleUpdateTitle}
            handleUpdateText={props.handleUpdateText}
            handleMove={props.handleMove}
            handleNoteSelect={props.handleNoteSelect}
            handleResize={props.handleResize}
          />
        );
      })}
    </div>
);

export default NotesContainer;
