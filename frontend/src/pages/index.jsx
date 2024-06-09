/** @format */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignInPage from './SignInPage';
import BlogListPage from './BlogListPage';
import BlogDetailPage from './BlogDetailPage';
import BlogFormPage from './BlogFormPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/list" exact component={BlogListPage} />
        <Route path="/detail" component={BlogDetailPage} />
        <Route path="/form" component={BlogFormPage} />
      </Switch>
    </Router>
  );
};

export default App;
