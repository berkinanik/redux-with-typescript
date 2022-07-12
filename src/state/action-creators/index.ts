import axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionType } from '../action-types';

export const searchRepositories =
  (term: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const {
        data,
      }: {
        data: {
          objects: {
            package: {
              name: string;
            };
          }[];
        };
      } = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term,
        },
      });

      const names = data.objects.map((result) => result.package.name);
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      const { message } = err as Error;
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: message,
      });
    }
  };
