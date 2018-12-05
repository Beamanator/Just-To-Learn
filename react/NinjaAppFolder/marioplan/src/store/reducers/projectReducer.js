import * as actionTypes from '../actions/actionTypes';

const initState = {
    projects: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'},
    ]
}

export default projectReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_PROJECT:
            console.log('created project', action.project);
            return state;

        default:
            return state;
    }
}