import React from 'react'
import Redirect from './Redirect'
import { useSelector } from 'react-redux'
const PrivateRoute = ({children}) => {
    const {user} = useSelector((state) => ({...state.auth}))
  return user ? children : <Redirect/>
}

export default PrivateRoute