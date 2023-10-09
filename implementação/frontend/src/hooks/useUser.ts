import { useContext } from "react";
import { UserContext } from "../provider/UserProvider";

function useUser() {
    return useContext(UserContext);
}

export default useUser;