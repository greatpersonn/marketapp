import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
    const [isAddModal, setAddModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [isInfoModal, setInfoModal] = useState(false);
    const [isOrderModal, setOrderModal] = useState(false);
    const [isFeedback, setFeedbackModal] = useState(false);
    const [isProfile, setProfileModal] = useState(false);
    const [isNews, setNewsModal] = useState(false);

    return(
        <ModalContext.Provider value={{isAddModal, setAddModal, isEditModal, setEditModal, isInfoModal, setInfoModal, isOrderModal, setOrderModal, isFeedback, setFeedbackModal, isNews, setNewsModal, isProfile, setProfileModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}