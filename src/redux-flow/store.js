import { createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//persist dùng để lưu state khi refresh trang
//nếu ko có persist khi refresh trang sẽ làm mất các state trong store
const persistConfig = {
  key: "root",
  storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnchanters = composeWithDevTools();

export const store = createStore(pReducer, composeEnchanters);
export const persistor = persistStore(store);

