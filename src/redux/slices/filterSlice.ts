import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../../@types/types';
import { RootStateType } from '../store';

type SetFiltersActionType = {
  cp: number
  cc: number
  at: SortType | undefined
}

interface FilterSliseState {
  categories: string[]
  currentCategory: number
  sortTypes: SortType[]
  activeType: SortType | undefined
  searchValue: string
  currentPage: number
}

const initialState: FilterSliseState = {
  categories: ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
  currentCategory: 0,
  sortTypes: [
    { name: 'популярности (Убыв.)', sortProperty: 'category&order=desc' },
    { name: 'популярности (Возр.)', sortProperty: 'category&order=asc' },
    { name: 'цене (Убыв.)', sortProperty: 'price&order=desc' },
    { name: 'цене (Возр.)', sortProperty: 'price&order=asc' },
    { name: 'алфавиту (Убыв.)', sortProperty: 'title&order=desc' },
    { name: 'алфавиту (Возр.)', sortProperty: 'price&order=asc' },
  ],
  activeType: {
    name: 'популярности (Убыв.)',
    sortProperty: 'category&order=desc',
  },
  searchValue: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload;
    },
    setActiveSortType: (state, action: PayloadAction<SortType>) => {
      state.activeType = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload + 1;
    },
    setFilters: (state, action: PayloadAction<SetFiltersActionType>) => {
      state.currentCategory = action.payload.cc;
      state.activeType = action.payload.at;
      state.currentPage = action.payload.cp;
    },
  },
});

export const getFilterSelector = (state: RootStateType) => state.filter;

export const { setCurrentCategory, setActiveSortType, setFilters, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
