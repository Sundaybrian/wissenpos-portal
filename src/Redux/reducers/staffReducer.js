import {
  ADD_STAFF,
  CLEAR_CURRENT,
  LOAD_STAFF,
  SET_CURRENT,
  SET_STAFF,
  DELETE_STAFF,
  STAFF_ERROR,
  UPDATE_STAFF,
} from '../types';

const initialState = {
  staff: [],

  currentStaff: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_STAFF:
      return {
        ...state,
        staff: action.payload,
        loading: true,
      };
    case SET_STAFF:
      return {
        ...state,
        staff: action.payload,
        loading: false,
      };
    case ADD_STAFF:
      return {
        ...state,
        staff: [action.payload, ...state.staff],
      };
    case UPDATE_STAFF:
      return {
        ...state,
        staff: state.staff.map(staff => (staff.id == action.payload.id ? action.payload : staff)),
        loading: false,
      };
    case DELETE_STAFF:
      return {
        ...state,
        // staff: [
        //     ...state.staff.filter(
        //         (staff) => staff.id !== action.payload
        //     ),
        // ],

        staff: [
          ...state.staff.filter(person => {
            return !action.payload.includes(person.id);
          }),
        ],
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        currentStaff: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        currentStaff: null,
      };
    case STAFF_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
