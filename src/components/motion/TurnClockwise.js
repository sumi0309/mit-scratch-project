import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import Paper from "@material-ui/core/Paper";
import Icon from "../Icon";

const TurnClockWise = ({ character, characterAngle, comp_id }) => {
  const [angle, setAngle] = useState(0);

  const handleClick = () => {
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + angle}deg)`;
      characterAngle(character_angle.angle + angle);
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-yellow-300 p-2 my-3">
        <div className="grid grid-cols-2">
          <div className="text-white">Clockwise angle:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
        </div>
        <div
          id={comp_id}
          className={`flex bg-yellow-500 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center`}
          onClick={() => handleClick()}
        >
          <div className="flex mx-auto">
            Turn
            <Icon name="redo" size={15} className="text-white mx-2" /> {angle}{" "}
            degrees
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnClockWise);
