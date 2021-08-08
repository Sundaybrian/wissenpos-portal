import React from 'react';
import { Route } from 'react-router-dom';

function CompanyMenuContainer(props) {
  const { url } = props.match;
  const { routes } = props;

  return (
    <div>
      {routes.map(({ path, component, text }, index) => (
        <Route path={`${url}/${path}`} component={component} key={index} />
      ))}
    </div>
  );
}

export default CompanyMenuContainer;
