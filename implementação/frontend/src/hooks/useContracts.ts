import { useContext } from "react";
import { ContractContext } from "../provider/ContractProvider";

function useContracts() {
    return useContext(ContractContext);
}

export default useContracts;