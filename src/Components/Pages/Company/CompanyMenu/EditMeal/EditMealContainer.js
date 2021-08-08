import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editMealCategory, addMealCategory } from '../../../../../Redux/actions/menuActions';
import MenuSidebar from '../MenuSidebar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MealPreview from '../MealPreview';
import MealForm from './MealForm';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  dualPanel: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
  },
  mealForm: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function EditMealContainer(props) {
  const classes = useStyles();

  const [addMeal, setAddMeal] = useState(null);

  const {
    companyID,
    menuID,
    addMealCategory,
    editMealCategory,
    toggleMenuView,
    setToogleMenuView,
    menu: { currentMeal },
    title,
  } = props;
  const { pathname } = useLocation();
  const [categoryID] = pathname.split('/').slice(-1);

  // check if we are in edit mode
  useEffect(() => {
    if (currentMeal !== null) {
      setAddMeal(currentMeal);
    } else {
      setAddMeal(null);
    }
  }, [currentMeal]);

  // image upload related
  // TODO use imagechangehandler
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null); //once we have an image, we will duplicate it here
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const imageChangeHandler = e => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      console.log(selected);

      // clearError
    } else {
      setFile(null);
      // setALertError e,g select an image file (png or jpeg)
    }
  };

  const handleMealSubmit = (values, action) => {
    const mealData = {
      ...values,
      image_url: imageUrl ? imageUrl : '', // get from state
      category_id: parseInt(categoryID),
    };

    addMealCategory(companyID, menuID, parseInt(categoryID), mealData);
    setToogleMenuView(false);
    setImageUrl(null); //clear state
    // handleClose();
  };

  const handleMealEdit = (values, action) => {
    console.log('clicked');
    const mealData = {
      ...values,
      image_url: imageUrl ? imageUrl : values.image_url,
      category_id: currentMeal.category_id,
    };

    editMealCategory(companyID, menuID, currentMeal.category_id, currentMeal.id, mealData);
    setAddMeal(null);
    setImageUrl(null);
    setToogleMenuView(false);
  };

  return (
    <>
      <MenuSidebar title={title}>
        <div className={classes.mealForm}>
          <MealForm
            handleMealSubmit={handleMealSubmit}
            handleMealEdit={handleMealEdit}
            setAddMeal={setAddMeal}
            currentMeal={currentMeal}
            setToogleMenuView={setToogleMenuView}
            file={file}
            setFile={setFile}
            imageChangeHandler={imageChangeHandler}
            setImageUrl={setImageUrl}
          />
        </div>
      </MenuSidebar>

      <div className={classes.content}>
        {/* for add meal & meal edit preview */}
        <div>
          {addMeal && (
            <MealPreview
              meal={addMeal}
              toggleMenuView={toggleMenuView}
              setAddMeal={setAddMeal}
              // setMeal={setMeal}
              setToogleMenuView={setToogleMenuView}
            />
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  ui: state.ui,
  menu: state.menu,
});

const mapActionsToProps = {
  editMealCategory,
  addMealCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(EditMealContainer);
