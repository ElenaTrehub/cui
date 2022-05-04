const iframeLoaded = (newIframe) => {
    return {
        type: 'IFRAME_LOADED',
        payload: newIframe
    }
};
const iframeRequested = () => {
    return {
        type: 'IFRAME_REQUESTED'
    }
};
const iframeError = () => {
    return {
        type: 'IFRAME_ERROR'
    }
};
const imageLoading = () => {
    return {
        type: 'IMAGE_LOADING'
    }
};
const imageLoaded = () => {
    return {
        type: 'IMAGE_LOADED'
    }
};
const virtualDomLoaded = (newDom) => {
    return {
        type: 'VIRTUAL_DOM_LOADED',
        payload: newDom
    }
};
const virtualDomChanged = (newDom) => {
    return {
        type: 'VIRTUAL_DOM_CHANGED',
        payload: newDom
    }
};
const iframeIsChange = () => {
    return {
        type: 'IFRAME_IS_CHANGE'
    }
};
const favoriteIframeAdd = (newIframe) => {
    return {
        type: 'FAVORITE_IRFAME_ADD',
        payload: newIframe
    }
};
const deleteFavoriteIframe = (name) => {
    return {
        type: 'FAVORITE_IRFAME_DELETE',
        payload: name
    }
};
const chooseCurrentTheme = (nameTheme) => {
    return {
        type: 'CHOOSE_CURRENT_THEME',
        payload: nameTheme
    }
};
const chooseCurrentFontStyle = (fontsObj) => {
    return {
        type: 'CHOOSE_CURRENT_FONT_STYLE',
        payload: fontsObj
    }
};
const isChangePanelShow = () => {
    return {
        type: 'IS_CHANGE_PANEL_SHOW'
    }
}


const chooseCurrentRubric = (rubricId) => {
    return {
        type: 'CURRENT_RUBRIC_CHOOSE',
        payload: rubricId
    }
};
const chooseCurrentSiteType = (siteType) => {
    return {
        type: 'CURRENT_SITE_TYPE_CHOOSE',
        payload: siteType
    }
};
const chooseCurrentSiteStyle = (siteStyle) => {
    return {
        type: 'CURRENT_SITE_STYLE_CHOOSE',
        payload: siteStyle
    }
};
const chooseChangeSectionName = (newSectionName) => {
    return {
        type: 'CHOOSE_CHANGE_SECTION_NAME',
        payload: newSectionName
    }
};
const changeCurrentLang = (newLang) => {
    return {
        type: 'IS_CHANGE_CURRENT_LANG',
        payload: newLang
    }
};
export {
    iframeLoaded,
    iframeRequested,
    iframeError,
    imageLoading,
    imageLoaded,
    virtualDomLoaded,
    iframeIsChange,
    favoriteIframeAdd,
    deleteFavoriteIframe,
    chooseCurrentTheme,
    chooseCurrentFontStyle,
    isChangePanelShow,
    chooseCurrentRubric,
    chooseCurrentSiteType,
    chooseCurrentSiteStyle,
    virtualDomChanged,
    chooseChangeSectionName,
    changeCurrentLang

};