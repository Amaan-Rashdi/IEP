import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';  // Import persistStore
import persistedReducer from './reducers';    // This should be your persisted reducer

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
});

// Create the persistor which is used by PersistGate
const persistor = persistStore(store);

export { store, persistor };
