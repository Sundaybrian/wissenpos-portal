import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Content from '../../Layout/Content/Content';
import { logoutUser } from '../../../Redux/actions/authActions';
import store from '../../../Redux/store';

export class Main extends Component {
  constructor(props) {
    super(props);
  }

  goHome = () => {
    console.log(`${this.props.location.pathname}/${this.props.routes[2].path}`);

    // /dashboard/menus
    this.props.history.push({
      pathname: `${this.props.matchPath}/${this.props.routes[1].path}`,
    });
  };

  componentDidMount() {
    this.goHome();
  }

  render() {
    const { matchPath, routes, location, authenticated } = this.props;
    return (
      <Content>
        <Route
          path={`${matchPath}/:id`} // equivalent /dashboard/menu menu is the dynamic part
          render={props => {
            if (!authenticated) {
              store.dispatch(logoutUser());
              return;
            }

            let page = routes.find(p => {
              return p.text === props.match.params.id;
            });

            return <page.component routes={page.routes !== null ? page.routes : []} {...props} />;
          }}
        />
      </Content>
    );
  }
}

export default Main;
