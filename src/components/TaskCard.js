import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5px;
  border-radius: 5px;
`;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  marginTop: "15px",
  userSelect: "none",

  maxWidth: isDragging ? "370px" : "100%",
  // change background colour if dragging
  background: isDragging ? "#4095A8" : "#f3f3f3",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const TaskCard = ({ item, index, style }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <TaskInformation>
            <p>{item.Task}</p>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
