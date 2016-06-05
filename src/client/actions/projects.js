import {
  PROJECT_PATH, 
  FETCH_PROJECTS
} from '../constants';
import { axios } from '../utilities';
import { browserHistory } from 'react-router';

export function fetchProjects(params = {}) {
  const url =  params.tag ? `${PROJECT_PATH}?tag=${params.tag}` : PROJECT_PATH;

  const request = axios.get(url);
  return dispatch => {
    return (
      request
        .then(response => {
          dispatch(fetchProjectsSuccess(response.data))
        })
        .catch(error => {
          dispatch(fetchProjectsFailure(error))
        })
    );
  };
}

function fetchProjectsSuccess(response) {
  return {
    type: FETCH_PROJECTS.SUCCESS,
    payload: { projects: response.projects }
  };
}

function fetchProjectsFailure(error) {
  return {
    type: FETCH_PROJECTS.FAILURE,
    payload: error
  };
}
