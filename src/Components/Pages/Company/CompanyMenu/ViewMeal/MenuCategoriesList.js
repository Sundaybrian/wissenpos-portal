import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Route } from 'react-router-dom';
import CategoryModal from './CategoryModal';
import MenuCategory from './MenuCategory';
import MealsList from './MealList';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper,
  },

  categoriesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    flex: 'auto',
    borderRight: '3px solid rgb(221, 227, 227)',
  },
  mealList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '15px',
    overflowY: 'auto',
    flex: 'auto',
  },
}));

//002
// holds a single category

// 001 container for the menu categories and their meals
function MenuCategoriesList(props) {
  const classes = useStyles();
  const {
    categories,
    menuID,
    companyID,
    setMeal,
    setToogleMenuView, // used to trigger add/edit meal sidebar
    url,
    addCategoryMenu,
    meal,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.categoriesList}>
        {/************** category list **************/}
        <List component="nav" aria-label="secondary mailbox folders">
          {categories.map((category, index) => (
            <MenuCategory category={category} key={index} meal={meal} to={`${url}/category/${category.id}`} />
          ))}
        </List>

        {/* ******************category modal**************** */}
        <CategoryModal
          title="Add Category"
          addCategoryMenu={addCategoryMenu}
          companyID={companyID}
          menuID={menuID}
          render={open => (
            <ListItem button onClick={open}>
              <ListItemText primary="Add Category" />
            </ListItem>
          )}
        />
      </div>

      {/* ******************meal list *********************/}
      <div className={classes.mealList}>
        <Route
          path={`${url}/category/:catId`}
          render={({ match }) => {
            const item = categories.find(r => r.id == match.params.catId);

            return <MealsList category={item} setMeal={setMeal} setToogleMenuView={setToogleMenuView} />;
          }}
        />
      </div>
    </div>
  );
}

export default MenuCategoriesList;
