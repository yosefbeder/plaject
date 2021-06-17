import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Section from './Section';
import NewSection from './NewSection';
import { useAppDispatch } from '../../store/hooks';
import { v4 } from 'uuid';
import { appActions } from '../../store/app-slice';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  padding: 1rem;
  overflow-x: scroll;
  scrollbar-width: thin;
`;

interface SectionsListProps {
  sectionsOrder?: string[];
  sections?: {
    [id: string]: {
      id: string;
      name: string;
      cards: string[];
    };
  };
  cards?: {
    [id: string]: {
      id: string;
      title: string;
      description: string;
      checklist: { id: string; isChecked: boolean; content: string }[];
    };
  };
}

const SectionsList: React.FC<SectionsListProps> = ({
  sectionsOrder,
  sections,
  cards,
}) => {
  const dispatch = useAppDispatch();

  const addProject = () => {
    const id = v4();
    dispatch(
      appActions.addSection({
        id,
        name: '',
        cards: [],
      }),
    );
  };

  return sectionsOrder && sections && cards ? (
    <DragDropContext
      onDragEnd={result => {
        const { source, destination } = result;
        if (
          !destination ||
          (destination.index === source.index &&
            destination.droppableId === source.droppableId)
        )
          return;

        if (result.type === 'section') {
          dispatch(
            appActions.dragSection({
              sourceIndex: source.index,
              destinationIndex: destination.index,
            }),
          );
        }
        if (result.type === 'card') {
          dispatch(appActions.dragCard({ source, destination }));
        }
      }}
    >
      <Droppable
        droppableId="sections-list"
        type="section"
        direction="horizontal"
      >
        {provided => (
          <>
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {sectionsOrder.map((sectionId, index) => {
                const section = sections[sectionId];
                return (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {provided => (
                      <Section
                        ref={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        name={section.name}
                        id={section.id}
                        cards={section.cards.map(cardId => cards[cardId])}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <NewSection onClick={addProject} />
            </Container>
          </>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <div></div>
  );
};

export default SectionsList;
