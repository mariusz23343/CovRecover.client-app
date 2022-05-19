import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import PostStore from "./postStore";

interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
}

export const store: Store = {
    postStore: new PostStore(),
    commonStore: new CommonStore()

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}