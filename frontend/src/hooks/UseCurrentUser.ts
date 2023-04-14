import {UserStoreContext} from "../providers/user/UserStoreContext";
import {useContext} from "react";
import {CurrentUser} from "../dataClasses/classes";

export const useCurrentUser: () => CurrentUser | null = () => useContext(UserStoreContext)