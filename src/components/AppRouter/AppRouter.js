import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { publicRoutes } from '../../routes/publicRoutes';
import { MAIN_ROUTE } from '../../utils/constants';
import SearchResultView from '../SearchResult/SearchResultView';

const AppRouter = () => {
  return (
    <Switch> 
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact/>
      ))}
      <Route path='/en-US/#/:url' component={SearchResultView} exact/>
      <Redirect to={MAIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
