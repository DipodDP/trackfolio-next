import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { trackfolioActions } from "@/store/api/trackfolio.slice";

const actions = {
  ...trackfolioActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
