import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import SectionsList from '../components/Sections/SectionsList';
import { db } from '../firebase';
import { useAppSelector } from '../store/hooks';
import Overlay from '../UI/Overlay';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(900px - 900px * 3 / 10);
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Main: React.FC<{
  sidebarIsOpened: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}> = ({ sidebarIsOpened, openSidebar, closeSidebar }) => {
  const projectData = useAppSelector(state => state.app.projectData);
  const selectedProject = useAppSelector(state => state.app.selectedProject);

  useEffect(() => {
    if (projectData) {
      db.collection('projects').doc(selectedProject!).set(projectData);
    }
  }, [projectData]);

  return (
    <Container>
      <Overlay
        showIn={sidebarIsOpened}
        onClick={closeSidebar}
        zIndex={500}
        responsive={true}
      />
      <Header openSidebar={openSidebar} />
      <SectionsList
        sectionsOrder={projectData!.sectionsOrder}
        sections={projectData!.sections}
        cards={projectData!.cards}
      />
    </Container>
  );
};

export default Main;
