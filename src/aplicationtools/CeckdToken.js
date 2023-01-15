import { decode } from 'punycode'
import React from 'react'

export const CeckdToken = (token) => {
    const newdata = decode(token).exp;
    const isExpired = newdata *1000 < new data().getTime();
  return  isExpired;
}
