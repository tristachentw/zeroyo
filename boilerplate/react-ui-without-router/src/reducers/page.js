import * as types from '../constants/action-type';

const page = (state = '', action) => {
  switch (action.type) {
  case types.SHOW_PAGE:
    return action.payload;
  }
  return state;
};

export default page;
