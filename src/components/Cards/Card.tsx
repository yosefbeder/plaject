import React from 'react';
import {
  ListCheck,
  PencilSquare,
  TextLeft,
  ThreeDots,
  Trash,
} from 'react-bootstrap-icons';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import DropdownWithLabel from '../../UI/DropdownWithLabel';
import { useAppDispatch } from '../../store/hooks';
import { appActions } from '../../store/app-slice';

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
  draggableProps: object;
  dragHandleProps?: object;
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

    const deleteCard = () => {
      dispatch(appActions.deleteCard({ sectionId, cardId: id }));
    };

    return (
      <Container ref={ref} {...draggableProps} {...dragHandleProps}>
        <div className="title">{title}</div>
        <div className="badges">
          {hasDescription && <TextLeft />}
          {checklistInfo.total > 0 && (
            <div className="checks">
              <ListCheck />
              <span>
                {checklistInfo.checked}/{checklistInfo.total}
              </span>
            </div>
          )}
        </div>
        <IconButton className="btn" onClick={deleteCard}>
          <Trash size={20} />
        </IconButton>
      </Container>
    );
  },
);

export default Card;
