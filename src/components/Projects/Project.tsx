import React from 'react';
import { useState } from 'react';
import {
  ThreeDotsVertical,
  Heart,
  PencilSquare,
  Trash,
  HeartFill,
} from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { authActions } from '../../store/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DropdownWithLabel from '../../UI/DropdownWithLabel';
import ProjectForm from './ProjectForm';
import IconButton from '@material-ui/core/IconButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
`;

const MainBody = styled.div<{
  isSelected: boolean;
  color: string;
  isDragging: boolean;
  inFavorite: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: ${props => {
    return props.isSelected ? 'var(--border-thick)' : 'var(--border-thin)';
  }};

  border-radius: 5px;
  transition: all 300ms;
  background-color: ${props => {
    if (props.inFavorite) return 'var(--color-yellow-transparent-3);';
    return 'var(--color-white)';
  }};

  ${props =>
    props.isDragging &&
    `
    transform: rotateZ(5deg);
    background-color: ${
      props.inFavorite
        ? 'var(--color-yellow-transparent-5)'
        : 'var(--color-grey-light)'
    };
  `}

  & .color {
    ${props => `background-color: var(--color-${props.color});`}
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    margin: 0 1rem;
  }

  & .content {
    flex: 1;
    margin: 0 auto 0 0;
  }

  & svg {
    font-size: 1.2rem;
    fill: var(--color-black);
  }

  &:hover {
    border: var(--border-thick);
  }
`;

const Drag = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.5rem);
  grid-template-rows: repeat(3, 0.5rem);
  row-gap: 0.1rem;
  column-gap: 0.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 300ms;

  & div {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-grey-dark);
  }

  &:hover {
    background-color: var(--color-grey-light);
  }

  &:active {
    background-color: var(--color-grey);
  }
`;

interface ProjectProps {
  id: string;
  isSelected: boolean;
  inFavorite: boolean;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
  name: string;
  isDefault?: boolean;
  draggableProps: object;
  dragHandleProps?: object;
  isDragging: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const Project = React.forwardRef<any, ProjectProps>(
  (
    {
      id,
      isSelected,
      inFavorite,
      color,
      name,
      isDefault,
      draggableProps,
      dragHandleProps,
      isDragging,
      openSidebar,
      closeSidebar,
    },
    ref,
  ) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const projects = useAppSelector(state => state.auth.userInfo!.projects);

    const onSelect = (e: React.MouseEvent) => {
      history.push(`/project/${id}`);
    };

    const toggleFavorite = () => {
      dispatch(authActions.toggleFavorite(id));
    };

    const deleteProject = () => {
      if (isSelected)
        history.push(
          `/project/${projects.find(project => project.isDefault)!.id}`,
        );
      dispatch(authActions.deleteProject(id));
    };

    const editProject = () => {
      closeSidebar();
      setIsEditing(true);
    };

    const listItems = [
      {
        Icon: inFavorite ? HeartFill : Heart,
        content: `${inFavorite ? 'Unfavourite' : 'Favourite'}`,
        onClick: toggleFavorite,
      },
      {
        Icon: PencilSquare,
        content: 'Edit project',
        onClick: editProject,
      },
    ];

    if (!isDefault) {
      listItems.push({
        Icon: Trash,
        content: 'Delete project',
        onClick: deleteProject,
      });
    }

    return (
      <>
        <Container {...draggableProps} ref={ref}>
          <Drag {...dragHandleProps}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Drag>
          <MainBody
            isSelected={isSelected}
            color={color}
            isDragging={isDragging}
            onClick={onSelect}
            inFavorite={inFavorite}
          >
            <div className="color"></div>
            <div className="content">{name}</div>
            <DropdownWithLabel listItems={listItems} responsive={true}>
              <IconButton>
                <ThreeDotsVertical color="inherit" />
              </IconButton>
            </DropdownWithLabel>
          </MainBody>
        </Container>
        <ProjectForm
          showIn={isEditing}
          onClose={() => {
            setIsEditing(false);
            openSidebar();
          }}
          type="edit"
          projectId={id}
        />
      </>
    );
  },
);

export default Project;
