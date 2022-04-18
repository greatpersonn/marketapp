import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
    const [isAddModal, setAddModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [isInfoModal, setInfoModal] = useState(false);

    return(
        <ModalContext.Provider value={{isAddModal, setAddModal, isEditModal, setEditModal, isInfoModal, setInfoModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}