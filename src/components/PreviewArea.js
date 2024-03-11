import React from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { setActive } from "../redux/character/actions";

function PreviewArea({ character }) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  function dragMouseDown(e, id) {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  return (
    <div
      className="w-full flex-none h-full overflow-y-auto p-3"
      id="preview_area"
    >
      <div className="flex justify-between mb-10">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Preview Area
        </div>
      </div>
      <div className="flex justify-around h-4/5">
        {character.characters.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
              style={{ top: "250px", left: "75px" }}
            >
              <div id={`${x.id}-div`} className="character">
                <div
                  className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-box1"}
                ></div>
                <CatSprite charac_id={x.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_active: (ch_id) => dispatch(setActive(ch_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
