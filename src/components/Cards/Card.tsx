import React from 'react';
import { ListCheck, JustifyLeft, Trash } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { appActions } from '../../store/app-slice';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background-color: var(--color-white);
  margin: 0.25rem 0;
  padding: 0.25rem;
  border-bottom: var(--border-thick);
  border-radius: 5px;

  cursor: pointer;

  & .title {
  }

  & .badges {
    display: flex;
    gap: 0.5rem;
  }

  & .checks {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 5px;
    padding: 0 0.25rem;

    &.finished {
      background-color: var(--color-primary-light);
      color: var(--color-white);
    }
  }

  & .btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

interface CardProps {
  id: string;
  sectionId: string;
  title: string;
  hasDescription: boolean;
  checklistInfo: { total: number; checked: number };
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const Card = React.forwardRef<any, CardProps>(
  (
    {
      id,
      sectionId,
      title,
      hasDescription,
      checklistInfo,
      draggableProps,
      dragHandleProps,
    },
    ref,
  ) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const selectedProject = useAppSelector(state => state.app.selectedProject);

    const deleteCard = () => {
      dispatch(appActions.deleteCard({ sectionId, cardId: id }));
    };

    return (
      <Container
        ref={ref}
        {...draggableProps}
        {...dragHandleProps}
        style={{
          ...draggableProps.style,
          cursor: 'pointer',
        }}
        onClick={e => history.push(`/project/${selectedProject}/card/${id}`)}
      >
        <div className="title">{title || 'Untitled'}</div>
        <div className="badges">
          {hasDescription && <JustifyLeft />}
          {checklistInfo.total > 0 && (
            <div
              className={`checks ${
                checklistInfo.total === checklistInfo.checked && 'finished'
              } `}
            >
              <ListCheck />
              <span>
                {checklistInfo.checked}/{checklistInfo.total}
              </span>
            </div>
          )}
        </div>
        <IconButton
          className="btn"
          onClick={e => {
            e.stopPropagation();
            deleteCard();
          }}
          size={hasDescription || checklistInfo.total > 0 ? 'medium' : 'small'}
        >
          <Trash size={20} />
        </IconButton>
      </Container>
    );
  },
);

export default Card;
