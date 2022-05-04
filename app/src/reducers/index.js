

const inintialState = {
    auth: false,
    loading: true,
    error: false,
    iframe: {},
    isChange: false,
    imageLoading: false,
    imageLoaded: false,
    virtualDom: [],
    changePanelShow: false,
    favoriteIframes: [],
    changeSectionName: '',
    themes: [{name: 'normal', ru: 'нормальная', en: 'normal'},
        {name: 'dark', ru: 'темная', en: 'dark'},
        {name: 'light', ru: 'светлая', en: 'light'},
        {name: 'any', ru: 'любая', en: 'any'}],
    currentTheme: {name: 'normal', ru: 'нормальная', en: 'normal'},
    currentFontStyle: {},
    siteStyles: [{name: 'all', ru: 'все стили', en: 'all styles'},
        {name: 'minimalism', ru: 'минимализм', en: 'minimalism'},
        {name: 'classic', ru: 'классический', en: 'classic'},
        {name: 'corporate', ru: 'корпоративный', en: 'corporate'},
        {name: 'hi tech', ru: 'хай тек', en: 'hi tech'}
    ],
    currentSiteStyle: {name: 'classic', ru: 'классический', en: 'classic'},
    currentRubric: -1,
    currentSiteType: '',
    defaultLang: 'ENGLISH',
    currentLang: 'ENGLISH',
    languages: [
        {name: 'en', code: 'ENGLISH'},
        {name: 'ru', code: 'RUSSIAN'},
    ],
    //libs: []

};

const reducer = (state = inintialState, action) => {
    switch (action.type) {

        case 'IS_CHANGE_PANEL_SHOW':
            return{
                ...state,
                changePanelShow: !state.changePanelShow
            }


        case 'IFRAME_LOADED':

            return {
                ...state,
                iframe: action.payload,
                loading: false,
                error: false
            };
        case 'IFRAME_REQUESTED':
            return {
                ...state,
                iframe: state.iframe,
                loading: true,
                error: false
            };
        case 'IFRAME_ERROR':
            return {
                ...state,
                iframe: state.iframe,
                loading: false,
                error: true
            };
        case 'IMAGE_LOADING':
            return {
                ...state,
                imageLoading: true,
                imageLoaded: false
            };
        case 'IMAGE_LOADED':
            return {
                ...state,
                imageLoading: false,
                imageLoaded: true
            };
        case 'VIRTUAL_DOM_LOADED':
            let newVirtualDom = [...state.virtualDom, action.payload];
            return {
                ...state,
                virtualDom: newVirtualDom
            };
        case 'VIRTUAL_DOM_CHANGED':
            return {
                ...state,
                virtualDom: action.payload
            };
        case 'IFRAME_IS_CHANGE':
            return {
                ...state,
                isChange: true
            };
        case 'IFRAME_IS_NEW':
            return {
                ...state,
                isChange: false,
                virtualDom: ''
            };
        case 'FAVORITE_IRFAME_ADD':
            let newFavoriteIframes = [...state.favoriteIframes, action.payload];
            return {
                ...state,
                favoriteIframes: newFavoriteIframes
            };
        case 'FAVORITE_IRFAME_DELETE':
            let indexIframe = state.favoriteIframes.findIndex(iframe => iframe.name === action.payload);

            return {
                ...state,
                favoriteIframes: [
                    ...state.favoriteIframes.slice(0, indexIframe),
                    ...state.favoriteIframes.slice(indexIframe + 1)
                ]
            };
        case 'CHOOSE_CURRENT_THEME':
            let currentTheme = state.themes.filter(theme => theme.name === action.payload);

            return {
                ...state,
                currentTheme: currentTheme[0]
            };

        case 'CHOOSE_CURRENT_FONT_STYLE':

            return {
                ...state,
                currentFontStyle: action.payload
            };
        case 'CURRENT_RUBRIC_CHOOSE':
            return {
                ...state,
                currentRubric: action.payload
            };
        case 'CURRENT_SITE_TYPE_CHOOSE':

            return {
                ...state,
                currentSiteType: action.payload
            };
        case 'CURRENT_SITE_STYLE_CHOOSE':

            return {
                ...state,
                currentSiteStyle: action.payload
            };
        case 'CHOOSE_CHANGE_SECTION_NAME':

            return {
                ...state,
                changeSectionName: action.payload
            };
        case 'IS_CHANGE_CURRENT_LANG':

            return {
                ...state,
                currentLang: action.payload
            };
        // case 'LIBS_SET':
        //     let newLibs = [...state.libs, ...action.payload];
        //     return {
        //         ...state,
        //         libs: newLibs
        //     };
        default:
            return state;

    }
};
export default reducer;