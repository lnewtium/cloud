import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/reducers";

export const useAppDispatch = useDispatch.withTypes<DispatchType>();
export const useAppSelector = useSelector.withTypes<StateType>();
