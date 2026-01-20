import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigationType } from "react-router-dom";
import { startLoading, stopLoading } from "../store/loadingReducer";

export const useNavigationLoading = () => {
  const dispatch = useDispatch();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "REPLACE") {
      dispatch(startLoading("Loading..."));

      const timer = setTimeout(() => {
        dispatch(stopLoading());
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [navigationType, dispatch]);
};
