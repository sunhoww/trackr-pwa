import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Public from './Public';
import Protected from './Protected';

function Index(props) {
  return (
    <Switch>
      <Route path="/auth" component={Public} />
      <Route exact component={Protected} />
    </Switch>
  );
}

export default Index;
