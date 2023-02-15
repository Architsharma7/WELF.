import React, { createContext, useState } from "react";

const ProposalContext = createContext();

export const ProposalContextProvider = ({children}) => {
    const [proposalForm, setProposalForm] = useState({
        title: "",
        desc: "",
        donation: "",
    })

    return <ProposalContextProvider value={{proposalForm, setProposalForm}}>
        {children}
    </ProposalContextProvider>
}

export default ProposalContext;