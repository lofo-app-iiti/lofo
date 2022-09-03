const initialState = {
    user: {
        _id: '',
        name: '',
        imageUrl: '',
        email: '',
        mobile: 0,
        program: '',
        department: '',
        graduationYear: 0,
        notifications: [],
        orders: [],
        ads: [],
        wishlist: [],
    },
    lofoItems: [],
    items: [],
    authorised: localStorage.getItem('accessToken') ? true : false,
    authLoading: false,
    accessToken: localStorage.getItem('accessToken')
}

const Reducers = (state =  {
        user: {
            _id: '',
            name: '',
            imageUrl: '',
            email: '',
            mobile: 0,
            program: '',
            department: '',
            graduationYear: 0,
            notifications: [],
            orders: [],
            ads: [],
            wishlist: [],
        },
        lofoItems: [],
        items: [],
        authorised: localStorage.getItem('accessToken') ? true : false,
        authLoading: false,
        accessToken: localStorage.getItem('accessToken')
    }, action) => {
    switch (action.type) {

        // user Reducer ----------------------------------------------->
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload.user,
                authorised: true,
                authLoading: false,
                accessToken: action.payload.accessToken
            };
        
        case 'SET_USER':
            return{
                ...state,
                user : action.payload.user
            };

        case 'CLEAR_USER':
            return {
                ...state,
                user: { ...initialState.user },
                authorised: false,
                accessToken: null
            };

        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
                authorised: true
            };

        // item Reducer ------------------------------------------------------->
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
            };
        case 'CLEAR_ITEMS':
            return {
                ...state,
                items: [],
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(i => i._id !== action.payload),
            };

        case 'UPDATE_ITEM':
            return {
                ...state,
                items: [...state.items, state.items[state.items.findIndex((o => o._id === action.payload._id))] = action.payload.doc],
            };
        case 'CREATE_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload],
            };


        // lofo items Reducer ----------------------------------------------------->
        case 'SET_LOFOITEMS':
            return {
                ...state,
                lofoItems: action.payload,
            };
        case 'CLEAR_LOFOITEMS':
            return {
                ...state,
                lofoItems: [],
            };

        case 'DELETE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.filter(i => i._id !== action.payload),
            };

        case 'UPDATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems[state.lofoItems.findIndex((o => o._id === action.payload._id))]
                    = action.payload,
            };
        case 'CREATE_LOFOITEM':
            return {
                ...state,
                lofoItems: state.lofoItems.push(action.payload),
            };

        default: return state;
    }

}


export default Reducers;