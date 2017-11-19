import React from 'react';

const ChooseColor = (props) => (
  <div className="color-option__container">
      {props.colors.map((color, index) => {
        return (
          <div
            key={index}
            className="color-option__choice"
            style={{background: color}}
            onClick={() => {
              props.handleChangeColor(color)
            }}
          ></div>
        );
      })}
  </div>
);

export default ChooseColor;
