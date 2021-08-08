import axios from 'axios';
import {
  ADD_STAFF,
  CLEAR_CURRENT,
  LOAD_STAFF,
  SET_CURRENT,
  SET_STAFF,
  DELETE_STAFF,
  STAFF_ERROR,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_DATA,
  SET_SUCCESS,
  UPDATE_STAFF,
} from '../types';

//addstaff
export const addStaff =
  ({ staffData, closeModal }) =>
  dispatch => {
    console.log(staffData.company_id);
    dispatch({ type: LOADING_UI });

    const url = `/company/${staffData.company_id}/accounts`;

    axios
      .post(url, staffData)
      .then(res => {
        const staff = res.data;
        closeModal();
        dispatch({ type: ADD_STAFF, payload: staff });
        dispatch({
          type: SET_SUCCESS,
          payload: `${staffData.user.firstName} created successfully`,
        });
      })
      .catch(err => {
        console.log(err, 'Staff create error');
        dispatch(setErrors(err));
      });
  };

// fetch staff
export const fetchStaff = company_id => dispatch => {
  dispatch({ type: LOADING_DATA });

  const url = `/company/${company_id}/accounts`;

  axios
    .get(url)
    .then(res => {
      const payload = res.data;
      dispatch({ type: LOAD_STAFF, payload });
      dispatch({
        type: SET_SUCCESS,
        payload: `Accounts fetched successfully`,
      });
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

// edit staff
export const editStaff =
  ({ staff, handleClose, user_id }) =>
  (dispatch, getState) => {
    dispatch({ type: LOADING_DATA });

    const { id: company_id } = getState().company.company[0];
    const url = `/company/${company_id}/accounts/${user_id}`;

    axios
      .put(url, staff)
      .then(res => {
        dispatch({ type: UPDATE_STAFF, payload: res.data });
        dispatch({ type: SET_SUCCESS, payload: `${res.data.firstName} updated successfully` });
        handleClose();
      })
      .catch(err => {
        dispatch(setErrors(err));
      });
  };

// delete staff
export const deleteStaff =
  ({ id: user_id, closeModal }) =>
  (dispatch, getState) => {
    dispatch({ type: LOADING_UI });
    const { id: company_id } = getState().company.company[0];
    const url = `/company/${company_id}/accounts/${user_id}`;

    console.log(url);

    axios
      .delete(url)
      .then(res => {
        dispatch({ type: DELETE_STAFF, payload: res.data });
        dispatch({ type: SET_SUCCESS, payload: 'user deleted successfully' });
        closeModal();
      })
      .catch(err => {
        dispatch(setErrors(err));
      });
  };

// helper function
export const setErrors = err => dispatch => {
  if (err.response) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: err,
    });
  }
};
