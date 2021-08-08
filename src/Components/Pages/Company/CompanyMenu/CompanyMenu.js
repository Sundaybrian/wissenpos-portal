import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadMenu, editMealCategory, addMealCategory } from '../../../../Redux/actions/menuActions';
import Loader from '../../../Base/Loader';
import ViewMenuContainer from './ViewMeal/ViewMenuContainer';
import EditMenuContainer from './EditMeal/EditMealContainer';
import SummaryCard from '../../../Base/SummaryCard';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { first } from 'lodash';
import Content from '../../../Layout/Content/Content';

const useStyles = makeStyles(theme => ({
  dualPanel: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
  },
  menuContainer: {
    height: '100vh',
    display: 'flex',
    // position: "fixed",
    // [theme.breakpoints.up("sm")]: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    // },
    // paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    position: 'relative',
  },
}));

function CompanyMenu(props) {
  const classes = useStyles();
  const [toggleMenuView, setToogleMenuView] = useState(false);

  const {
    ui: { loading },
    loadMenu,
    Menu: { menu: companyMenu },
    company,
  } = props;

  const { url } = useRouteMatch();

  /* eslint-disable eqeqeq */
  useEffect(() => {
    if (isEmpty(companyMenu) && !isEmpty(company)) {
      loadMenu(company.id);
    } else {
      return;
    }
  }, [companyMenu, company]);

  console.log(company, '---------------------------');

  if (!isLoaded(company) || loading) {
    return (
      <Content>
        <SummaryCard component={<Loader />} />;
      </Content>
    );
  }

  return (
    <div className={classes.menuContainer}>
      {toggleMenuView == true ? (
        <EditMenuContainer
          title={company.name}
          companyID={company.id}
          menuID={companyMenu.id}
          setToogleMenuView={setToogleMenuView}
        />
      ) : (
        <ViewMenuContainer
          company={company}
          companyMenu={companyMenu}
          url={url}
          toggleMenuView={toggleMenuView}
          setToogleMenuView={setToogleMenuView}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
  company: first(state.company.company),
  Menu: state.menu,
});

const mapActionsToProps = {
  loadMenu,
  addMealCategory,
  editMealCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(CompanyMenu);
