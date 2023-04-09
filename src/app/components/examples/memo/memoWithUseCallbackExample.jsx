import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const LogOutButton = ({ onLogOut }) => {
  useEffect(() => console.log('render button'))
  return (
    <button className='btn btn-warning me-2 shadow ' onClick={onLogOut}>
      LogOut
    </button>
  )
}

LogOutButton.propTypes = {
  onLogOut: PropTypes.func
}

function areEqual(prevState, nextState) {
  if (prevState.onLogOut !== nextState.onLogOut) {
    //только для примитивных типов данных или сериализуемых объектов - не для функций
    return false
  }
  return true
}

const MemoizedLogOutButton = React.memo(LogOutButton, areEqual)

const MemoWithUseCallbackExample = (props) => {
  const [state, setState] = useState(false)
  const handleLogOut = useCallback(() => {
    localStorage.removeItem('auth')
  }, [props])
  return (
    <>
      <button
        className='btn btn-warning me-2 shadow'
        onClick={() => setState(!state)}
      >
        Initiate rerender
      </button>
      <MemoizedLogOutButton onLogOut={handleLogOut} />
    </>
  )
}

export default MemoWithUseCallbackExample
