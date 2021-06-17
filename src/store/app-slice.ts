import { createSlice } from '@reduxjs/toolkit';
import { Project } from '../types';

const initialState: {
  selectedProject: string | null;
  projectData: Project | null;
} = {
  selectedProject: null,
  projectData: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectProject(state, action) {
      state.selectedProject = action.payload;
      state.projectData = null;
    },
    setProjectData(state, action) {
      state.projectData = action.payload;
    },
    updateSectionName(state, action) {
      state.projectData!.sections[action.payload.id].name = action.payload.name;
    },
    addSection(state, action) {
      state.projectData!.sections[action.payload.id] = action.payload;
      state.projectData!.sectionsOrder.push(action.payload.id);
    },
    deleteSection(state, action) {
      const sectionIndex = state.projectData!.sectionsOrder.findIndex(
        section => section === action.payload,
      )!;
      state.projectData!.sectionsOrder.splice(sectionIndex, 1);
      state.projectData!.sections[action.payload].cards.forEach(cardId => {
        delete state.projectData!.cards[cardId];
      });
      delete state.projectData!.sections[action.payload];
    },
    dragSection(state, action) {
      const [draggedEl] = state.projectData!.sectionsOrder.splice(
        action.payload.sourceIndex,
        1,
      );
      state.projectData!.sectionsOrder.splice(
        action.payload.destinationIndex,
        0,
        draggedEl,
      );
    },
    dragCard(state, action) {
      // splice the card from the source section
      const { source, destination } = action.payload;

      const [draggedEl] = state.projectData!.sections[
        source.droppableId
      ].cards.splice(source.index, 1);

      // insert it into the destination
      state.projectData!.sections[destination.droppableId].cards.splice(
        destination.index,
        0,
        draggedEl,
      );
    },
    deleteCard(state, action) {
      const section = state.projectData!.sections[action.payload.sectionId];
      section.cards.splice(section.cards.indexOf(action.payload.cardId), 1);
      delete state.projectData!.cards[action.payload.cardId];
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;

/* 
  action.payload.(destination | result): {
    droppableId: SectionId;
    index: number
  }
*/
