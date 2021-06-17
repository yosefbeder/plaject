import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import SectionsList from '../components/Sections/SectionsList';
import { db } from '../firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Overlay from '../UI/Overlay';

// const DUMMY_PROJECT = {
//   id: 'p1',
//   name: 'Building muscles',
//   sectionsOrder: ['s1', 's2', 's3', 's4'],
//   sections: {
//     s1: { id: 's1', title: 'TODO', cards: ['c1', 'c2', 'c3'] },
//     s2: { id: 's2', title: 'DOING', cards: ['c4'] },
//     s3: { id: 's3', title: 'DONE', cards: [] },
//     s4: { id: 's4', title: 'BUG / NOT SURE', cards: [] },
//   },
//   cards: {
//     c1: {
//       id: 'c1',
//       title: 'Planning the app',
//       description:
//         'Consists of four steps:\n1. Define the app by asking some questions\n2. Determe the MVC of the app (The most important features)\n3. Determine other "nice to haves"\n4. Create a component tree for the app\n5. Plan the state',
//       checklist: [
//         {
//           id: 'cl1',
//           isChecked: false,
//           content:
//             'Finish what has been mentioned in the description of this card?',
//         },
//       ],
//     },
//     c2: {
//       id: 'c2',
//       title: 'Design the app',
//       description: "It's clear stop procrastination",
//       checklist: [{ id: 'cl1', isChecked: false, content: '...' }],
//     },
//     c3: {
//       id: 'c3',
//       title: 'Design the api of the app',
//       description: "It's clear stop procrastination",
//       checklist: [{ id: 'cl1', isChecked: false, content: 'Learn firebase' }],
//     },
//     c4: {
//       id: 'c4',
//       title: 'Finish that project',
//       description: '',
//       checklist: [],
//     },
//   },
// };

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
    if (projectData && selectedProject) {
      db.collection('projects').doc(selectedProject).set(projectData);
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
        sectionsOrder={projectData?.sectionsOrder}
        sections={projectData?.sections}
        cards={projectData?.cards}
      />
    </Container>
  );
};

export default Main;
