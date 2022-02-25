import React, { useState } from "react";
import styled from "styled-components";
import initialColumns from "../../utils/mockData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "../../components/TaskCard.js";
import Grid from "@mui/material/Grid";
import TitleIcon from "../../components/TitleIcon";
import Modal from "../../components/Modal";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 80%;
  display: flex;
  flex-direction: column;
  background: white;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Message = styled.p`
  color: #e8e8e8;
  padding: 2px 10px;
  font-size: 18;
`;

const Dashboard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = React.useState(false);
  const currentColumn = React.useRef();
  const handleAddNewItem = ({ title, desc }) => {
    const column = columns[currentColumn.current];
    const id = `${Math.floor(Math.random() * 100 + 1)}`;

    column.items = [...column.items, { id, Task: title, desc }];
    // if()
    console.log({
      title,
      desc,
      currentColumn: currentColumn.current,
      columns,
      column,
    });

    setColumns({ ...columns, [currentColumn.current]: column });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const strategieCell = Object.keys(columns).filter(
        (item) => columns[item].title === "Strategie"
      )[0];
      const extraStrategieCell = Object.keys(columns).filter(
        (item) => columns[item].title === undefined
      )[0];
      const isExtraStrategieCell =
        destination.droppableId === extraStrategieCell;
      if (isExtraStrategieCell && source.droppableId === strategieCell) return;
      const sourceColumn = columns[source.droppableId];
      const destColumn = isExtraStrategieCell
        ? columns[strategieCell]
        : columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [isExtraStrategieCell ? strategieCell : destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container>
          <TaskColumnStyles>
            <Grid container justifyContent="flex-end">
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Grid item sm={column.size} key={columnId}>
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided, snapshot) => (
                        <TaskList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          key={columnId}
                        >
                          {column.title && (
                            <TitleIcon
                              title={column.title}
                              action={() => {
                                currentColumn.current = columnId;
                                handleClickOpen();
                              }}
                            />
                          )}

                          {column.items.length === 0 ? (
                            <Message>{column.message}</Message>
                          ) : (
                            column.items.map((item, index) => (
                              <TaskCard
                                key={uuid()}
                                item={item}
                                index={index}
                              />
                            ))
                          )}
                          {provided.placeholder}
                        </TaskList>
                      )}
                    </Droppable>
                  </Grid>
                );
              })}
            </Grid>
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
      <Modal
        handleClose={handleClose}
        open={open}
        handleAddNewItem={handleAddNewItem}
      />
    </>
  );
};

export default Dashboard;
