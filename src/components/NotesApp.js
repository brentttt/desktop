import React, {Component} from 'react';
import { PhotoshopPicker } from 'react-color';

import NoteContainer from './NotesContainer';
import AddNote from './AddNote';
import ChooseColor from './ChooseColor';
import Settings from './Settings';

const uuid = require('uuid/v1');

export default class NotesApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      currentNote: undefined,
      colors: ['#adadad', '#3365ee', '#ff4500', '#8f006c', '#FFD700'],
      backgroundColor: '#319550',
      revealSettings: false,
      changingDefaults: {
        active: false,
        elementToChange: undefined
      },
      currentColor: '#fff'
    }
  }
  handleAddNote = () => {
    const note = {
      title: '',
      text: '',
      id: uuid(),
      xPos: Math.abs(Math.random() * window.innerWidth - 200),
      yPos: Math.abs(Math.random() * window.innerHeight - 200),
      color: this.state.colors[0]
    }
    this.setState((prevState) => ({
      notes: [...prevState.notes, note]
    }));
  }
  handleDeleteNote = (noteToDelete) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== noteToDelete)
    }))
  }
  handleUpdateTitle = (noteToUpdate) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if(note.id === noteToUpdate.id) {
          return {
            ...note,
            title: noteToUpdate.title
          }
        } else {
          return note
        }
      })
    }));
  }
  handleUpdateText = (noteToUpdate) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if(note.id === noteToUpdate.id) {
          return {
            ...note,
            text: noteToUpdate.text
          }
        } else {
          return note
        }
      })
    }));
  }
  handleMove = (noteToUpdate) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if(note.id === noteToUpdate.id) {
          return {
            ...note,
            xPos: noteToUpdate.newPos.x,
            yPos: noteToUpdate.newPos.y
          }
        } else {
          return note
        }
      })
    }));
  }
  handleChangeColor = (color) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if(note.id === this.state.currentNote) {
            return {
              ...note,
              color
          }
        } else {
            return note;
          }
        })
    }));
  }
  handleNoteSelect = (noteToSelect) => {
    this.setState((prevState) => ({
      currentNote: noteToSelect
    }));
  }
  handleResize = (noteToUpdate) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) => {
        if(note.id === noteToUpdate.id) {
          return {
            ...note,
            width: noteToUpdate.newSize.width,
            height: noteToUpdate.newSize.height
          }
        } else {
          return note
        }
      })
    }));
  }
  handleRevealSettings = () => {
    this.setState((prevState) => ({
      revealSettings: !prevState.revealSettings
    }));
  }
  handleShowColorPicker = (elementToChange) => {
    this.setState((prevState) => ({
      changingDefaults: {
        active: true,
        elementToChange
      }
    }));
  }
  handleHideColorPicker = () => {
    this.setState(() => ({
      changingDefaults: {
        active: false,
        elementToChange: undefined
      }
    }))
  }
  handleHideSettingsModal = () => {
    this.setState(() => ({
      revealSettings: false
    }))
  }
  handleChangeDefaultNoteColors = (color, event) => {
    if(this.state.changingDefaults.elementToChange === 'background') {
      this.setState((prevState) => ({
        currentColor: color,
        backgroundColor: color.hex
      }));
    } else {
      this.setState((prevState) => ({
        currentColor: color,
        colors: prevState.colors.map((curColors, index) => {
          if(index === this.state.changingDefaults.elementToChange) {
            return color.hex;
          } else {
            return curColors;
          }
        })
      }));
    }
  }
  deleteAllNotes = () => {
    this.setState({
      notes: []
    });
  }
  componentDidMount() {
    try {
      const notes = JSON.parse(localStorage.getItem('notes'));

      if(notes) {
        this.setState(() => ({ notes }));
      }
    } catch(e) {
      // do nothing
    }

    try {
      const backgroundColor = JSON.parse(localStorage.getItem('backgroundColor'));

      if(backgroundColor) {
        this.setState(() => ({ backgroundColor }));
      }
    } catch(e) {
      // do nothing
    }

    try {
      const colors = JSON.parse(localStorage.getItem('colors'));

      if(colors) {
        this.setState(() => ({ colors }));
      }
    } catch(e) {
      // do nothing
    }

  }
  restoreDefaults = () => {
    this.setState((prevState) => ({
      ...prevState,
      colors: ['#adadad', '#3365ee', '#ff4500', '#8f006c', '#FFD700'],
      backgroundColor: '#319550'
    }))
  }
  componentDidUpdate(prevProps, prevState) {
    const notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);

    const backgroundColor = JSON.stringify(this.state.backgroundColor);
    localStorage.setItem('backgroundColor', backgroundColor);

    const colors = JSON.stringify(this.state.colors);
    localStorage.setItem('colors', colors);
  }
  render() {
    return (
      <div>
        <AddNote handleAddNote={this.handleAddNote} />
        <NoteContainer
          notes={this.state.notes}
          backgroundColor={this.state.backgroundColor}
          handleDeleteNote={this.handleDeleteNote}
          handleUpdateTitle={this.handleUpdateTitle}
          handleUpdateText={this.handleUpdateText}
          handleMove={this.handleMove}
          handleNoteSelect={this.handleNoteSelect}
          handleResize={this.handleResize}
        />
        <ChooseColor
          colors={this.state.colors.map((color) => color)}
          handleChangeColor={this.handleChangeColor}
        />
        <Settings
          handleRevealSettings={this.handleRevealSettings}
          handleHideSettingsModal={this.handleHideSettingsModal}
          revealSettings={this.state.revealSettings}
          colors={this.state.colors.map((color, index) => ({color, index}))}
          backgroundColor={this.state.backgroundColor}
          handleShowColorPicker={this.handleShowColorPicker}
          restoreDefaults={this.restoreDefaults}
          deleteAllNotes={this.deleteAllNotes}
        />
      {this.state.changingDefaults.active &&
        <PhotoshopPicker
            color={this.state.currentColor}
            onChangeComplete={this.handleChangeDefaultNoteColors}
            onAccept={this.handleHideColorPicker}
            onCancel={this.handleHideColorPicker}
          />
        }

      </div>
    );
  }
}
