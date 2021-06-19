import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { authActions } from '../store/auth-slice';
import LoadingPage from '../pages/LoadingPage';
import { setTimeout } from 'timers';

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

  return isLoading ? (
    <LoadingPage noQuote />
  ) : (
    <Switch>
      {/* default routes */}

      <Route path="/login">
        {!userId && !isLoading && <Login />}
        {userId && <Redirect to={`/project/${userInfo!.projects[0].id}`} />}
        {}
      </Route>
      <Route path="/project/:projectId">
        {userId && <Home />}
        {!userId && !isLoading && <Redirect to="/login" />}
      </Route>

      {/* unexpected routes */}

      <Route path="*">
        {userId && <Redirect to={`/project/${userInfo!.projects[0].id}`} />}
        {!userId && !isLoading && <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
