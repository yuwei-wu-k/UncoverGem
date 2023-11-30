import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('bandung') && JSON.parse(localStorage.getItem('bandung')).sessionToken ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);
