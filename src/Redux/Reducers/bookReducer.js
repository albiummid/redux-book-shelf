import booksData from '../../fakeData/books.json'

const initialState = {
    readingList: [],
    discoverList: booksData,
    finishedList: [],
    error: {}
}

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_READING_LIST': {
            let newState = {
                ...state,
                readingList: [...state.readingList, action.payload]
            }

            return newState;
        }

        case 'REMOVE_FROM_READING_LIST': {
            const newState = {
                ...state,
                readingList: [...state.readingList.filter(data => data !== action.payload)]

            }

            return newState;
        }
        case 'ADD_TO_FINISHED_LIST': {
            const newState = {
                ...state,
                finishedList: [...state.finishedList, action.payload],
                readingList: [...state.readingList.filter(data => data !== action.payload)]
            }
            return newState;
        }

        default: {
            return state
        }
    }





}