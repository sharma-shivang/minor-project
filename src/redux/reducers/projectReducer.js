const projectReducer = (state = null, action) =>{
    switch(action.type){
        case 'SET_PROJECTS':
            return{
                ...state,
                projects:action.projects
            }
        case 'SET_PROJECTS_NULL':
            return{
                ...state,
                Projects:null
            }
        default:
            return state;
    }
}

export default projectReducer