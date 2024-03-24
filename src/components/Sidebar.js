import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { motionComponents, looksComponents } from "./SidebarConstants";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200 items-center">
      <div> {"Motion"} </div>
      <Droppable droppableId="sideArea-motion" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-motion my-3 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {motionComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <div> {"Looks"} </div>
      <Droppable droppableId="sideArea-looks" type="COMPONENTS">
        {(provided) => (
          <ul
            className="sideArea-looks my-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {looksComponents.map((x, i) => {
              return (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
