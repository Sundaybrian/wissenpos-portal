import React, { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
// redux

import { connect } from 'react-redux';

function Alert(props) {
  const {
    ui: { errors, severity },
  } = props;

  const [snackOpen, setSnackOpen] = React.useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  /* eslint-disable no-unused-vars */
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSnackOpen({
      ...state,
      isOpen: true,
      message: errors !== null ? errors.message : '',
      type: severity || 'success',
    });
  }, [errors, severity]);

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen({
      ...state,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={snackOpen.isOpen}
      autoHideDuration={6000}
      onClose={snackClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={state.Transition}
    >
      <MuiAlert onClose={snackClose} severity={snackOpen.type}>
        {snackOpen.message}
      </MuiAlert>
    </Snackbar>
  );
  // return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Alert.propTypes = {
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(Alert);
