import { Checkbox, IconButton } from '@material-ui/core';
import React from 'react';
import { PlusLg, Trash } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Cards/Card';
import { useAppDispatch } from '../../store/hooks';
import { appActions } from '../../store/app-slice';
import Input from '../../UI/Input';

const Container = styled.div`
  flex: 0 0 max-content;
  display: flex;
  flex-direction: column;
  height: max-content;
  background-color: var(--color-grey-light);
  margin: 0 0.5rem;
  border-radius: 5px;

  & > .header {
    display: flex;
    align-items: center;
    height: 3.2rem;
    padding: 0 0.5rem;
    border-bottom: var(--border-thin);
  }

  & > .header > .title {
    width: 10rem;
  }

  & .cards-list {
    display: flex;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
  }
`;

interface SectionProps {
  id: string;
  name: string;
  cards: {
    id: string;
    title: string;
    description: string;
    checklist: { id: string; isChecked: boolean; content: string }[];
  }[];
  draggableProps: object;
  dragHandleProps?: object;
}

const Section = React.forwardRef<any, SectionProps>(
  ({ id, name, cards, draggableProps, dragHandleProps }, ref) => {
    const dispatch = useAppDispatch();

    return (
      <Container {...draggableProps} ref={ref}>
        <div className="header" {...dragHandleProps}>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // dispatch the action
              dispatch(appActions.setSectionName({ id, name: e.target.value }));
            }}
            variant="h3"
            className="title"
          />
          <IconButton
            style={{ marginLeft: 'auto', marginRight: '.25rem' }}
            onClick={() => {
              dispatch(appActions.deleteSection(id));
            }}
          >
            <Trash size={20} />
          </IconButton>
          <IconButton onClick={() => dispatch(appActions.addCard(id))}>
            <PlusLg size={18} />
          </IconButton>
        </div>

        <Droppable droppableId={id} type="card" direction="vertical">
          {provided => (
            <div
              className="cards-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((card, index) => {
                return (
                  <Draggable draggableId={card.id} index={index} key={card.id}>
                    {provided => (
                      <Card
                        id={card.id}
                        sectionId={id}
                        title={card.title}
                        hasDescription={card.description.trim().length > 0}
                        checklistInfo={{
                          total: card.checklist.length,
                          checked: card.checklist.filter(
                            check => check.isChecked,
                          ).length,
                        }}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        ref={provided.innerRef}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    );
  },
);

export default Section;
