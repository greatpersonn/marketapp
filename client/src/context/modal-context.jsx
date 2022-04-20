import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
    const [isAddModal, setAddModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [isInfoModal, setInfoModal] = useState(false);
    const [isOrderModal, setOrderModal] = useState(false);

    return(
        <ModalContext.Provider value={{isAddModal, setAddModal, isEditModal, setEditModal, isInfoModal, setInfoModal, isOrderModal, setOrderModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}