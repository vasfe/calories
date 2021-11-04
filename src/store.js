import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { searchFood } from './API/data'

const ADD_ENTRY = "ADD_ENTRY"
const DELETE_ENTRY = "DELETE_ENTRY"
const SET_SEARCHING = "SET_SEARCHING"
const SET_MESSAGE = "SET_MESSAGE"

export function setMessage(payload) {
  return { type: "SET_MESSAGE", payload }
};

export function addEntry(payload) {
  return { type: "ADD_ENTRY", payload }
};

export function deleteEntry(payload) {
  return { type: "DELETE_ENTRY", payload }
};

export function setSearching(payload) {
  return { type: "SET_SEARCHING", payload }
};

const initialState = {
  entries: [],
  total: 0,
  searching: false,
  message: null
}

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload.toString() }
    case SET_SEARCHING:
      return { ...state, searching: action.payload }
    case ADD_ENTRY:
      if (state.entries.some(e => e.text === action.payload.text)) {
        const entryToUpdate = state.entries.filter((entry) => entry.text === action.payload.text)[0]
        return {
          ...state,
          entries: [...state.entries.filter((entry) =>
            entry.text !== action.payload.text),
          {
            text: entryToUpdate.text,
            grams: entryToUpdate.grams + action.payload.grams,
            calories: parseFloat((entryToUpdate.calories + action.payload.calories).toFixed(1))
          }],
          total: parseFloat((state.total + action.payload.calories).toFixed(1)),
          message: null
        }
      }
      else {
        return {
          ...state,
          entries: [...state.entries, action.payload],
          total: parseFloat((state.total + action.payload.calories).toFixed(1)),
          message: null
        }
      }
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry !== action.payload),
        total: parseFloat((state.total - action.payload.calories).toFixed(1))
      }
    default:
      return state
  }
};

export const searchFoodItem = (item, quantity = "") => async (dispatch, getState) => {
  dispatch(setSearching(true))
  try {
    const searchResult = await searchFood(item, quantity)
    dispatch(addEntry(searchResult))
  }
  catch (error) {
    dispatch(setMessage(error.toString()))
  }
  dispatch(setSearching(false))
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(mainReducer, composeEnhancers(
  applyMiddleware(thunk)
));