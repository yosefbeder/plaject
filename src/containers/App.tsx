import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Modal from '../UI/Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { authActions } from '../store/auth-slice';
import { UserInfo } from '../types';
import LoadingPage from '../pages/LoadingPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const userId = useAppSelector(state => state.auth.userId);
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const getUserData = async (uid: string) => {
    const doc = await db.collection('users').doc(uid).get();

    console.log(doc.data());
    return doc.data();
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setIsLoading(true);
      if (!user) {
        dispatch(authActions.signOut());
        setIsLoading(false);
        return;
      }

      (async () => {
        const userInfo = await getUserData(user.uid);

        dispatch(
          authActions.login({
            userId: user.uid,
            userInfo,
          }),
        );

        setIsLoading(false);
      })();
    });
  }, []);

  // return isLoading ? (
  //   <LoadingPage />
  // ) : (
  //   <Switch>
  //     {/* default routes */}

  //     <Route path="/login">
  //       {!userId && !isLoading && <Login />}
  //       {userId && <div>You're already logged in, {userInfo!.name}</div>}

  //       {}
  //     </Route>
  //     <Route path="/projects/:projectId">
  //       {userId && <Home />}
  //       {!userId && !isLoading && <div>You should login first</div>}
  //     </Route>

  //     {/* unexpected routes */}

  //     <Route path="*">
  //       {userId && <Redirect to={`/projects/${userInfo!.projects[0].id}`} />}
  //       {!userId && !isLoading && <Redirect to="/login" />}
  //     </Route>
  //   </Switch>
  // );
  return <LoadingPage />;
}

export default App;
