import React, { Component } from 'react';

const SettingsModal = (props) => (
      <div className="settings__modal" style={{boxShadow: '1px 1px 8px 1px ' + props.backgroundColor}}>
        <div className="settings__modal__header">
          <h1>Settings</h1>
          <button
            onClick={props.handleHideSettingsModal}
            className="settings__modal__hide"
          ></button>
        </div>
        <p>Change background color:</p>
        <button
          className="settings__modal__color-settings"
          style={{background: props.backgroundColor}}
          onClick={(e) => {
            props.handleShowColorPicker('background');
          }}
        ></button>
      <p>Change note color options:</p>
        {props.colors.map((color) => {
          return (
            <button
              className="settings__modal__color-settings"
              key={color.color}
              style={{background: color.color}}
              onClick={(e) => {
                props.handleShowColorPicker(color.index);
              }}
            ></button>
          )
        })}
        <br />
          <br />
        <button
          className="settings__modal__restore"
          onClick={props.restoreDefaults}
        >Restore default color settings</button>
        <br />
        <button
          className="settings__modal__restore"
          onClick={props.deleteAllNotes}>Clear all notes...</button>
      </div>
    );

export default SettingsModal;
