import React from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { yellow } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Icon from "./Icon";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

const RunButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[800]),
    backgroundColor: yellow[800],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: yellow[900],
    },
  },
}))(Button);

function MidArea({ area_list }) {
  const classes = useStyles();
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  const handleClick = (arr, id) => {
    if (arr.length === 0) return;
    let i = 0;
    let str1 = `comp${arr[i]}-${id}-${i}`;
    eventFire(document.getElementById(str1), "click");
    i++;

    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }
      let str2 = `comp${arr[i]}-${id}-${i}`;
      eventFire(document.getElementById(str2), "click");
      i++;
    }, 2000);
  };

  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between">
        <div className="italic font-serif text-base">
          {"Drop the components below to run together!"}
        </div>
        <div className="text-center flex flex-column mb-5">
          <RunButton
            variant="contained"
            className={classes.button}
            onClick={() =>
              handleClick(
                area_list?.midAreaLists[0]?.comps,
                area_list?.midAreaLists[0]?.id
              )
            }
          >
            <div className="text-white">{"When "}</div>
            <Icon name="flag" size={15} className="text-green-600 mx-2" />
            <div className="text-white">{"Clicked"}</div>
          </RunButton>
        </div>
      </div>

      <div className="grid grid-flow-col" style={{ height: "88%" }}>
        {area_list?.midAreaLists?.map((l) => {
          return (
            <div className="w-100 h-full" key={l.id}>
              <Paper className="p-4 h-full">
                <div className="w-full h-full">
                  <Droppable droppableId={l.id} type="COMPONENTS">
                    {(provided) => {
                      return (
                        <ul
                          className={`${l.id} w-full h-full`}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {l.comps &&
                            l.comps.map((x, i) => {
                              let str = `${x}`;
                              let component_id = `comp${str}-${l.id}-${i}`;

                              return (
                                <Draggable
                                  key={`${str}-${l.id}-${i}`}
                                  draggableId={`${str}-${l.id}-${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {getComponent(str, component_id)}
                                      {provided.placeholder}
                                    </li>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </ul>
                      );
                    }}
                  </Droppable>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    area_list: state.list,
  };
};

export default connect(mapStateToProps)(MidArea);
