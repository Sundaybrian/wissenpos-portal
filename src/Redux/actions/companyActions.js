import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS, LOAD_COMPANY, ADD_COMPANY, EDIT_COMPANY, SET_SUCCESS } from '../types';
import axios from 'axios';
import { setErrors } from './staffManagementActions';

export const loadCompany = () => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .get('/company/mine')
    .then(res => {
      dispatch({ type: LOAD_COMPANY, payload: res.data });
      dispatch({
        type: SET_SUCCESS,
        payload: `company fetched successfully`,
      });
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

export const registerCompany = (companyData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post('/company', companyData)
    .then(res => {
      dispatch({ type: ADD_COMPANY, payload: res.data });
      dispatch({
        type: SET_SUCCESS,
        payload: `${companyData.name} created successfully`,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch(setErrors(err));
    });
};

export const updateCompany =
  ({ id, companyData }) =>
  dispatch => {
    dispatch({ type: LOADING_UI });
    console.log('hereeeeeeeeeeeeeee');

    axios
      .patch(`/company/${id}`, companyData)
      .then(res => {
        dispatch({ type: EDIT_COMPANY, payload: res.data });
        dispatch({
          type: SET_SUCCESS,
          payload: `${res.data.name} updated successfully`,
        });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch(err => {
        dispatch(setErrors(err));
      });
  };
// set current
// clear current
// delete company soon enough
