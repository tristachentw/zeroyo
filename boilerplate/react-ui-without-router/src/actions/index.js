import * as types from '../constants/action-type';

export const showPage = title => {
  return {
    type: types.SHOW_PAGE,
    payload: title
  };
};
