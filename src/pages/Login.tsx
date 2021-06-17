import React, { useState } from 'react';
import Logo from '../UI/Logo';
import Card from '../UI/Card';
import Button from '../UI/Button';
import styled from 'styled-components';
import LoginCover from '../assets/login-cover.png';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

// icons
import { Google as GoogleIcon } from 'react-bootstrap-icons';
import { auth, db, GoogleProvider } from '../firebase';
import { useAppDispatch } from '../store/hooks';
import { authActions } from '../store/auth-slice';
import {
  collapseTextChangeRangesAcrossMultipleVersions,
  StringMappingType,
} from 'typescript';
import { Color, Project, UserInfo } from '../types';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  padding: 1rem;
`;

const Cover = styled.div`
  position: relative;

  img {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary-transparent-3);
    z-index: -1;
    border-top-right-radius: 60%;
    border-top-left-radius: 70%;
    border-bottom-right-radius: 60%;
    border-bottom-left-radius: 60%;
  }
`;

const stateUpdateDuration = 600;

const State = styled.div<{ state: 'error' | 'loading' | 'intial' }>`
  font-size: 1rem;
  width: 100%;
  text-align: center;
  padding: 0.2rem 0;
  background-color: ${props =>
    props.state === 'intial'
      ? 'var(--color-primary)'
      : props.state === 'loading'
      ? 'var(--color-blue)'
      : 'var(--color-red)'};
  color: var(--color-white);
  margin-bottom: var(--gap);
  transition: all ${stateUpdateDuration}ms;

  & p.fade-enter {
    opacity: 0;
    transform: translateX(-10rem);
  }
  & p.fade-exit {
    opacity: 1;
    transform: translateX(0);
  }
  & p.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
  }
  & p.fade-exit-active {
    opacity: 0;
    transform: translateX(10rem);
  }
  & p.fade-enter-active,
  & p.fade-exit-active {
    transition: all ${stateUpdateDuration / 2}ms;
  }
`;

const getRandomColor = (): Color => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple'];
  return colors[Math.round(Math.random() * colors.length)] as Color;
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const state =
    !isLoading && !hasError ? 'intial' : isLoading ? 'loading' : 'error';

  const stateMessage =
    state === 'intial'
      ? 'Please, start authenticating with your google account.'
      : state === 'loading'
      ? 'Loading...'
      : 'Something went wrong.';

  const login = async () => {
    try {
      setIsLoading(true);
      const result = await auth.signInWithPopup(GoogleProvider);
      const userId = result.user!.uid;
      const isNewUser = result.additionalUserInfo!.isNewUser;

      // check if the user is new or not and add the entry in the db depending on that
      if (isNewUser) {
        const email = result.user!.email as string;
        const name = result.user!.displayName as string;
        const thumbnail = result.user!.photoURL as string;

        // adding the default project for that user
        const defaultProject: Project = {
          sectionsOrder: ['s1', 's2', 's3', 's4'],
          sections: {
            s1: { id: 's1', name: 'TODO', cards: ['c1', 'c2', 'c3'] },
            s2: { id: 's2', name: 'DOING', cards: ['c4'] },
            s3: { id: 's3', name: 'DONE', cards: [] },
            s4: { id: 's4', name: 'BUG / NOT SURE', cards: [] },
          },
          cards: {
            c1: {
              id: 'c1',
              title: 'Planning the app',
              description:
                'Consists of four steps:\n1. Define the app by asking some questions\n2. Determe the MVC of the app (The most important features)\n3. Determine other "nice to haves"\n4. Create a component tree for the app\n5. Plan the state',
              checklist: [
                {
                  id: 'cl1',
                  isChecked: false,
                  content:
                    'Finish what has been mentioned in the description of this card?',
                },
              ],
            },
            c2: {
              id: 'c2',
              title: 'Design the app',
              description: "It's clear stop procrastination",
              checklist: [{ id: 'cl1', isChecked: false, content: '...' }],
            },
            c3: {
              id: 'c3',
              title: 'Design the api of the app',
              description: "It's clear stop procrastination",
              checklist: [
                { id: 'cl1', isChecked: false, content: 'Learn firebase' },
              ],
            },
            c4: {
              id: 'c4',
              title: 'Finish that project',
              description: '',
              checklist: [],
            },
          },
        };
        const project_1Id = db.collection('projects').doc().id;
        db.collection('projects').doc(project_1Id).set(defaultProject);
        const project_2Id = db.collection('projects').doc().id;
        db.collection('projects').doc(project_2Id).set(defaultProject);

        // adding the user entry

        const userInfo: UserInfo = {
          email,
          name,
          thumbnail,
          projects: [
            {
              id: project_1Id,
              name: 'Default Project',
              color: getRandomColor(),
              isDefault: true,
              inFavorite: false,
            },
            {
              id: project_2Id,
              name: 'Experamental Project',
              color: getRandomColor(),
              inFavorite: false,
            },
          ],
        };
        db.collection('users').doc(userId).set(userInfo);
      }
    } catch (err) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <Card width={600}>
      <State state={state}>
        <SwitchTransition>
          <CSSTransition
            timeout={stateUpdateDuration / 2}
            classNames="fade"
            key={stateMessage}
          >
            <p>{stateMessage}</p>
          </CSSTransition>
        </SwitchTransition>
      </State>
      <Container>
        <Logo />
        <p>
          Please enter your google account here to be able to save your
          projects.
        </p>
        <Cover>
          <img src={LoginCover} />
        </Cover>
        <Button variant="outlined" IconLabel={GoogleIcon} onClick={login}>
          Login with google
        </Button>
      </Container>
    </Card>
  );
}
