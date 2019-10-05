import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './../containers/Home/Home';
import Members from './../containers/Members/Members';
import Lists from './../containers/Lists/Lists';

const Routes = props => {
  return (
    <Switch>
      <Route path='/home' component={Home} />
      <Route path='/members' component={Members} />
      <Route path='/lists' component={Lists} />
      <Route path='/' component={Home} />
      <Redirect from='/' exact to='home' />
    </Switch>
  );
};

export default Routes;
