import {
  LOGIN_USER,
} from '../constants.js';

export function login(user){
  return {
    type: LOGIN_USER,
    user: user,
  }
}