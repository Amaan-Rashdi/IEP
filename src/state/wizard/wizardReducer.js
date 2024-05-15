import { SET_SELECTION } from './action';

const initialState = {
  selectedRiasecIds: [],
  selectedAspiredIds: [],
  selectedFurtherIds: [],
  selectedPrefIds: [],
  selectedcollegetext: '',
  selectedStrengthIds: [],
  selectedDevelopmentIds: [],
  selectedHobbiesIds: [],
  selectedHnrs: [],
  selectedProf: [],
  selectedActivities: [],
  selectedStat: [],
  selectedRecom: [],
  selectedTeach: [],
};

const wizardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default wizardReducer;
