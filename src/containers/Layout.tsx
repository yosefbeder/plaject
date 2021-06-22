import React, { useState } from 'react';
import Card from '../UI/Card';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import Main from './Main';

const Container = styled(Card)`
  position: relative;
  height: 900px;
  display: block;

  @media (max-width: 900px) {
    display: block;
    height: 100%;
  }
`;

export default function Layout() {
  const [sidebarIsOpened, setSidebarIsOpened] = useState(false);

  const openSidebar = () => setSidebarIsOpened(true);
  const closeSidebar = () => setSidebarIsOpened(false);

  return (
    <Container width={900}>
      <Sidebar
        isOpened={sidebarIsOpened}
        close={closeSidebar}
        open={openSidebar}
      />
      <Main
        sidebarIsOpened={sidebarIsOpened}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
      />
    </Container>
  );
}
