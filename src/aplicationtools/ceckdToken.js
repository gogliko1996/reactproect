// import { decode } from 'punycode'
import decode from 'jwt-decode'


export const ceckdToken = (token) => {
    const newdata = decode(token).exp;
    const isExpired = newdata * 1000 < new Date().getTime();
  return  isExpired;
}
