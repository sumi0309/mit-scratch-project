import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

const Size = ({ character, comp_id }) => {
  const [state, setState] = useState({
    scale: 1,
  });

  const changeSize = () => {
    if (state.scale > 0) {
      const el = document.getElementById(character.active);
      el.style.transform = `scale(${state.scale})`;
    } else {
      const el = document.getElementById(character.active);
      el.style.transform = `scale(1)`;
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Size:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="range"
            min="1"
            max="15"
            value={state.scale}
            onChange={(e) =>
              setState({ ...state, scale: parseInt(e.target.value) })
            }
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize()}
        >
          Size {state.scale}
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(Size);
