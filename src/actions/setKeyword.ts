export const SET_KEYWORD = "SET_KEYWORD";

export const setKeyword = (keyword: string) => {
  return {
    type: SET_KEYWORD,
    keyword
  };
};
