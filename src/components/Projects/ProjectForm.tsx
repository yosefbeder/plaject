import React from 'react';
import Modal from '../../UI/Modal';
import styled from 'styled-components';
import {
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';

import { X } from 'react-bootstrap-icons';
import { useState } from 'react';
import Button from '../../UI/Button';
import { Color, Project } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions } from '../../store/auth-slice';
import { useEffect } from 'react';
import { db } from '../../firebase';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2bae66',
    },
  },
});

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-thin);
  & .close-btn {
  }

  & h3 {
    width: max-content;
    margin-left: 1rem;
  }
`;

const Main = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .btn-group {
    display: flex;
    gap: 1rem;

    & button {
      flex: 1;
    }
  }
`;

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink'];

const ProjectForm: React.FC<{
  showIn: boolean;
  onClose: () => void;
  type: 'add' | 'edit';
  projectId?: string;
}> = ({ showIn, onClose, type, projectId }) => {
  const projects = useAppSelector(state => state.auth.userInfo!.projects);
  const userId = useAppSelector(state => state.auth.userId) as string;
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const formIsValid = name.length > 6 && color.length > 0;

  useEffect(() => {
    if (type === 'edit' && projectId) {
      const project = projects.find(project => project.id === projectId)!;
      setName(project.name);
      setColor(project.color);
    }
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (formIsValid) {
      if (type === 'edit' && projectId) {
        dispatch(authActions.editProject({ id: projectId, name, color }));
        onClose();
      }
      if (type === 'add') {
        // adding the project the database
        const project: Project = {
          ownerUid: userId,
          sectionsOrder: ['s1', 's2', 's3'],
          sections: {
            s1: { id: 's1', name: 'TODO', cards: [] },
            s2: { id: 's2', name: 'DOING', cards: [] },
            s3: { id: 's3', name: 'DONE', cards: [] },
          },
          cards: {},
        };
        const projectId = db.collection('projects').doc().id;
        db.collection('projects').doc(projectId).set(project);
        // adding the project to the auth slice (the ref of it)
        dispatch(
          authActions.addProject({
            id: projectId,
            name,
            color,
            inFavorite: false,
          }),
        );
        onClose();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal width={400} onClickAway={onClose} showIn={showIn}>
        <Header>
          <h3>
            {type === 'add' ? 'ADD A NEW PROJECT' : 'EDIT AN EXISTED PROJECT'}
          </h3>
          <IconButton onClick={onClose} className="close-btn">
            <X size={32} />
          </IconButton>
        </Header>
        <Main onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            size="small"
            label="Project Name"
            value={name}
            onChange={e => {
              const value = e.target.value;
              if (value.length < 24) {
                setName(e.target.value);
              }
            }}
          />
          <FormControl size="small" variant="outlined">
            <InputLabel id="select-label">Project Color</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              label="Project Color"
              value={color}
              onChange={e => setColor(e.target.value as Color)}
            >
              {colors.map((color, index) => (
                <MenuItem
                  key={index}
                  value={color.toLowerCase()}
                  className="option"
                >
                  <span className={`color color-${color.toLowerCase()}`}></span>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="btn-group">
            <Button
              variant="outlined"
              type="reset"
              fullWidth={true}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" fullWidth={true}>
              Confirm
            </Button>
          </div>
        </Main>
      </Modal>
    </ThemeProvider>
  );
};

export default ProjectForm;
