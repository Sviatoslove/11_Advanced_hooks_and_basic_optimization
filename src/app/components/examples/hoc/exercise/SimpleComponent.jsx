import React from 'react'
import PropTypes from 'prop-types'

const SimpleComponent = ({ isAuth, onLogin, onLogOut, ...props }) => {
  const useBtn = isAuth
    ? { label: 'Выйти из системы', onClick: onLogOut, color: 'warning' }
    : { label: 'Войти', onClick: onLogin, color: 'success' }
  return (
    <button
      type='button'
      className={'btn shadow-lg btn-' + useBtn.color}
      onClick={useBtn.onClick}
      style={{ color: 'white', fontWeight: 'bold' }}
    >
      {useBtn.label}
    </button>
  )
}

SimpleComponent.propTypes = {
  isAuth: PropTypes.string,
  onLogin: PropTypes.func,
  onLogOut: PropTypes.func
}

export default SimpleComponent
