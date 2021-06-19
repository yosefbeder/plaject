import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../containers/Layout';
import { auth, db } from '../firebase';
import { appActions } from '../store/app-slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Project } from '../types';
import LoadingPage from './LoadingPage';
import { Route } from 'react-router-dom';
import CardDetails from '../components/Cards/CardDetails';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { projectId } = useParams<{ projectId: string }>();
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const fetchProjectData = async (id: string): Promise<Project> => {
    const doc = await db.collection('projects').doc(id).get();
    return doc.data() as Project;
  };

  useEffect(() => {
    // run if the projectId changes
    // check whether the project exists in the userInfo projects
    setIsLoading(true);
    if (userInfo!.projects.some(project => project.id === projectId)) {
      dispatch(appActions.selectProject(projectId));
      (async () => {
        const projectData = await fetchProjectData(projectId);
        dispatch(appActions.setProjectData(projectData));
        setIsLoading(false);
      })();
    }
    // dispatch the data to the app slice
  }, [projectId]);

  return isLoading ? <LoadingPage noQuote={true} /> : <Layout />;
}
