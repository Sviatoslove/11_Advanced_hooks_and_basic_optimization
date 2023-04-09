import React from 'react'
import CardWrapper from '../../../common/Card'

const withFunctions = (Component) => (props) => {
  const isAuth = localStorage.getItem('auth')
  const onLogin = () => {
    localStorage.setItem('auth', 'token')
  }
  const onLogOut = () => {
    localStorage.removeItem('auth', 'token')
  }
  return (
    <CardWrapper>
      <Component
        isAuth={isAuth}
        onLogOut={onLogOut}
        onLogin={onLogin}
        {...props}
      />
    </CardWrapper>
  )
}

export default withFunctions
