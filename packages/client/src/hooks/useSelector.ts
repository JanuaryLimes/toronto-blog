import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux';
import { RootState } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
