import React, { useEffect, useRef, useState } from 'react'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'

const RenderCountExample = () => {
  const renderCount = useRef(0)
  const [otherState, setOtherState] = useState(false)
  useEffect(() => {
    renderCount.current++
  }, [otherState])
  const handleClick = () => {
    setOtherState((prevState) => !prevState)
  }
  return (
    <CardWrapper>
      <SmallTitle>Подсчет количества рендеров</SmallTitle>
      <Divider />
      <p>Ререндер: {renderCount.current}</p>
      <button className='btn btn-warning shadow-lg' onClick={handleClick}>
        Перерисуй страницу
      </button>
    </CardWrapper>
  )
}

export default RenderCountExample
