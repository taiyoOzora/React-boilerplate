import axios from 'axios';
const crypto = require('crypto');

import { auth, database } from 'firebase';
import * as rConst from "reduxConstants";

// Auth

export const login = (session) =>{
  return {
    type: rConst.ADD_SESSION,
    session
  }
}

export const logout = () => {
  return {
    type: rConst.DELETE_SESSION
  }
}