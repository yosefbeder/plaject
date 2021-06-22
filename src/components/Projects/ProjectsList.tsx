import React, { useEffect } from 'react';
import styled from 'styled-components';
import Project from './Project';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions } from '../../store/auth-slice';
import { db } from '../../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  width: 100%;
`;

const ProjectsList: React.FC<{
  openSidebar: () => void;
  closeSidebar: () => void;
}> = ({ openSidebar, closeSidebar }) => {
  const sidebarProps = { openSidebar, closeSidebar };
  const userId = useAppSelector(state => state.auth.userId);
  const projects = useAppSelector(state => state.auth.userInfo!.projects);
  const selectedProject = useAppSelector(state => state.app.selectedProject);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // now you just need to dispatch actions to the project array and it'll be sent to the db automatically.
    db.collection('users').doc(userId!).set(
      {
        projects,
      },
      { merge: true },
    );
  }, [projects]);

  return (
    <DragDropContext
      onDragEnd={result => {
        if (
          !result.destination ||
          result.destination!.index === result.source.index
        )
          return;

        dispatch(
          authActions.dragProject({
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index,
          }),
        );
      }}
    >
      <Droppable droppableId="project-list">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {projects.map((project, index) => (
              <Draggable
                key={project.id}
                draggableId={project.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <Project
                    isSelected={project.id === selectedProject}
                    {...project}
                    ref={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    {...sidebarProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProjectsList;
