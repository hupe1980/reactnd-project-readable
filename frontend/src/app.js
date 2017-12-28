import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';

function App() {
  return (
    <Switch>
      { /* Default view */ }
      <Route
        exact
        path="/"
        render={() => (
          <PostList />
            )}
      />
      { /* 404 Error page */ }
      {/* <Route
            exact
            path="/notfound"
            component={NotFound}
          /> */}
      { /* Category view */ }
      <Route
        exact
        path="/:category"
        render={props => (
          <PostList category={props.match.params.category} />
            )}
      />
      { /* Post details view */ }
      <Route
        exact
        path="/:category/:post_id"
        render={props => (
          <PostDetails postId={props.match.params.post_id} />
            )}
      />
    </Switch>
  );
}

export default App;
