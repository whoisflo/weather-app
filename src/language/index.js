import React, { useReducer } from "react";

import DE from "./de.json";
import EN from "./en.json";


// TRANSLATION OBJECTS
const translations = {
    de: DE,
    en: EN
};

const defaultLanguageCode = 'en';


// FUNCTIONS
const isValidLanguage = langCode => typeof langCode === 'string' && Object.keys(translations).includes(langCode.toLowerCase());

const getLanguageInitial = () => {
    const urlSearchParams = new URLSearchParams(window.location.search || `?${window.location.hash.split('?')[1]}`),
        urlLanguage = urlSearchParams.get('locale'),
        sessionLanguage = sessionStorage.getItem('sessionUserLanguage'),
        navigatorLanguage = (navigator.language || navigator.userLanguage)?.split('-')[0];

    return isValidLanguage(sessionLanguage) && sessionLanguage ||
        isValidLanguage(urlLanguage) && urlLanguage ||
        isValidLanguage(navigatorLanguage) && navigatorLanguage ||
        defaultLanguageCode;
};

const getTranslate = langCode => key => isValidLanguage(langCode) && (translations[langCode][key] || key) || (translations[defaultLanguageCode][key] || key);


// get initial language
const sessionUserLanguage = getLanguageInitial();

const initialState = {
    langCode: sessionUserLanguage,
    translate: getTranslate(sessionUserLanguage)
};

export const Translation = React.createContext(initialState);

export const TranslationProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "setLanguage":
            return {
                langCode: action.payload,
                translate: getTranslate(action.payload)
            };
            default:
            return { ...initialState };
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Translation.Provider value={{ ...state, dispatch }}>
            {children}
        </Translation.Provider>
    );
};

