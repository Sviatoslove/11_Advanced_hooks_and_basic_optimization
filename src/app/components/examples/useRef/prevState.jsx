import React, { useEffect, useRef, useState } from 'react'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'

const PrevStateExample = () => {
  const prevState = useRef('')
  const [state, setState] = useState('false')
  useEffect(() => {
    prevState.current = state
  }, [state])
  const handleClick = () => {
    setState((prevState) => (prevState === 'true' ? 'false' : 'true'))
  }
  return (
    <CardWrapper>
      <SmallTitle>Предыдущее состояние</SmallTitle>
      <Divider />
      <p>Предыдущее состояние: {prevState.current}</p>
      <p>Текущее состояние: {state}</p>
      <button className='btn btn-warning shadow-lg' onClick={handleClick}>
        Переключи состояние
      </button>
    </CardWrapper>
  )
}

export default PrevStateExample
