const inintialState = {
    rubrics: [],
    auth: false,
    loading: true,
    error: false,
    iframe: {},
    isChange: false,
    imageLoading: false,
    imageLoaded: false,
    virtualDom: '',
    favoriteIframes: [],
    themes: [{name: 'initial', color: 'grey'},{name: 'ocean', color: 'blue'}, {name: 'rose', color: 'red'}],
    currentTheme: {name: 'initial', color: 'grey'}

};

const reducer = (state = inintialState, action) => {
    switch (action.type) {
        case 'RUBRICS_LOADED':
            return {
                ...state,
                rubrics: action.payload,
                loading: false,
                error: false
            };
        case 'RUBRICS_REQUESTED':
            return {
                ...state,
                rubrics: state.rubrics,
                loading: true,
                error: false
            };
        case 'RUBRICS_ERROR':
            return {
                ...state,
                rubrics: state.rubrics,
                loading: false,
                error: true
            };
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
        default:
            return state;

    }
};
export default reducer;