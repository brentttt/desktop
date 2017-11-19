import React from 'react';

const Note = (props) => (
    <div className="note"
      id={props.note.id}
      style={{
        left: props.note.xPos + "px",
        top: props.note.yPos + "px",
        boxShadow: "1px 1px 8px 1px " + props.backgroundColor,
        width: props.note.width + "px",
        height: props.note.height + "px",
      }}
      onMouseDown={(e) => {
        if(e.target.classList.value !== 'note__tab__delete' && e.target.classList.value !== 'note__body') {
          document.querySelector(".notes-container").append(e.currentTarget);
        }
      }}
    >
      <div
        className="note__tab"
        style={{background: props.note.color}}
        onClick={() => {
          props.handleNoteSelect(props.note.id);
        }}
      >
        <input
          className="note__tab__title"
          value={props.note.title}
          placeholder="..."
          onChange={(e) => {
            const updates = {
              id: props.note.id,
              title: e.target.value
            }
            props.handleUpdateTitle(updates);
          }}
        />
      <div className="note__tab__controls">
          <button
            className="note__tab__move-button"
            onMouseDown={(e) => {
              const initialNotePos = e.target.parentElement.parentElement.getBoundingClientRect();

              const relativePos = {
                x: initialNotePos.left - e.clientX,
                y: initialNotePos.top - e.clientY
              }

              const dragging = (e) => {
                props.handleMove({
                  id: props.note.id,
                  newPos: {
                    x: e.clientX + relativePos.x,
                    y: e.clientY + relativePos.y
                  }
                })
              };

              document.addEventListener('mousemove', dragging);
              document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', dragging);
              });

            }}
          ></button>
          <button
            className="note__tab__delete"
            onClick={(e) => {
              props.handleDeleteNote(props.note.id)
            }}
          ></button>
        </div>
      </div>
      <textarea
        className="note__body"
        value={props.note.text}
        onChange={(e) => {
          const updates = {
            id: props.note.id,
            text: e.target.value
          }
          props.handleUpdateText(updates);
        }}
      >
      </textarea>
      <div className="note__resize"
        onMouseDown={(e) => {
          const elem = e.currentTarget.parentElement;
          const elemPosition = elem.getBoundingClientRect();

          const resizing = (e) => {
            const newWidth = e.clientX - elemPosition.x;
            const newHeight = e.clientY - elemPosition.y;

            if(newWidth < 250) {
              return;
            }
            if(newHeight < 150) {
              return;
            }

            elem.style.width = newWidth + 'px';
            elem.style.height = newHeight + 'px';

            props.handleResize({
              id: props.note.id,
              newSize: {
                width: newWidth,
                height: newHeight
              }
            })


          };

          document.addEventListener('mousemove', resizing);
          document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', resizing);
          });
        }}></div>
    </div>
);

export default Note;
