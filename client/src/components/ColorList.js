import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from './AxiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let color = colorToEdit.color;
    let code = colorToEdit.code;
    let id = colorToEdit.id;
    let headers = localStorage.getItem("authKey")

    let api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${headers}`,
      },
    });

    api.put(`http://localhost:5000/api/colors/${id}`,{color,code,id})
      .then((res) => {
        console.log(res);
        api.get(`http://localhost:5000/api/colors/`)
        .then((res) => {
          updateColors((res.data))
        })
        .catch()
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const deleteColor = color => {
    let headers = localStorage.getItem("authKey")

    let id = color.id;
    let api = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${headers}`,
      },
    });

    api.delete(`http://localhost:5000/api/colors/${id}`)
    .then(() => {
      api.get(`http://localhost:5000/api/colors/`)
        .then((res) => {
          updateColors((res.data))
        })
        .catch()
    })
    .catch()
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
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
    </div>
  );
};

export default ColorList;
