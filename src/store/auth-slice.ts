import { createSlice } from '@reduxjs/toolkit';
import Project from '../components/Projects/Project';
import { UserInfo } from '../types';

const initialState: {
  userId: null | string;
  userInfo: UserInfo | null;
} = { userId: null, userInfo: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.userId = action.payload.userId;
      state.userInfo = action.payload.userInfo;
    },
    signOut(state) {
      state.userId = null;
      state.userInfo = null;
    },
    dragProject(state, action) {
      const projects = state.userInfo!.projects;

      const [draggedEl] = projects.splice(action.payload.sourceIndex, 1);

      projects.splice(action.payload.destinationIndex, 0, draggedEl);
    },
    toggleFavorite(state, action) {
      const project = state.userInfo!.projects.find(
        project => project.id === action.payload,
      );
      project!.inFavorite = !project!.inFavorite;
    },
    editProject(state, action) {
      const project = state.userInfo!.projects.find(
        project => project.id === action.payload.id,
      );

      project!.name = action.payload.name;
      project!.color = action.payload.color;
    },
    deleteProject(state, action) {
      const projectIndex = state.userInfo!.projects.findIndex(
        project => project.id === action.payload,
      );
      state.userInfo!.projects.splice(projectIndex, 1);
    },
    addProject(state, action) {
      state.userInfo!.projects.push(action.payload);
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
