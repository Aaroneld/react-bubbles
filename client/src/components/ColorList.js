import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from '../axiosAuth';
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [color, setColor] = useState({});

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    

    axiosWithAuth()({ url: `http://localhost:5000/api/colors/${colorToEdit.id}`, 
                      method: 'PUT',
                      data: colorToEdit,
                      id: colorToEdit.id})
    .then(reponse => {
        console.log(reponse);
        window.location.assign('bubblepage');
    })
    .catch( error => {
        console.log(error);
    });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()({ url: `http://localhost:5000/api/colors/${color.id}`, 
                      method: 'DELETE',
                     })
    .then(reponse => {
      console.log(reponse);
      window.location.assign('bubblepage');
    })
    .catch( error => {
      console.log(error);
    });
  };

  const handleChange = e => {

    e.target.name === "code" ? 
      setColor({...color,
      code: {hex: e.target.value},
      }) 
      :
      setColor({...color,
      [e.target.name]: e.target.value})

    console.log(color);
  }

  const handleSubmit = e => {

    e.preventDefault();

    axiosWithAuth()({ url: `http://localhost:5000/api/colors`, 
                      method: 'POST',
                      data: color           
    })
    .then(reponse => {
    console.log(reponse);
    document.querySelector('.add-color').requestFullscreen();
    window.location.assign('bubblepage');
    })
    .catch( error => {
    console.log(error);
    });
  };
  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form className="add-color" onSubmit={handleSubmit}> 
        <input
        onChange={handleChange}
        placeholder="Add Color Name"
        name="color" /> 
           <input
        onChange={handleChange}
        placeholder="Add Color Code"
        name="code" /> 
        <input
        onChange={handleChange}
        placeholder="Add an ID"
        name="id" /> 
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
