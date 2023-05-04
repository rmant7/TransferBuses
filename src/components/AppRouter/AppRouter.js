import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRoutes } from '../../routes/publicRoutes';
import { MAIN_ROUTE } from '../../utils/constants';

const AppRouter = () => {
  return (
    //if delete switch we can try to add other rotes for components
    <Switch> 
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact/>
      ))}
      <Redirect to={MAIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
