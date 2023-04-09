import React, { useEffect, useRef } from 'react'
import CollapseWrapper from '../common/collapse'
import Divider from '../common/divider'

const UseRefExercise = () => {
  const smallRef = useRef()
  const divRef = useRef()
  const prevStateRefDivRef = useRef({})

  const handleClickSmall = () => {
    if (divRef.current.style.height !== '150px') {
      divRef.current.style.height = 150 + 'px'
      divRef.current.style.width = 80 + 'px'
      smallRef.current.textContent = 'text'
    } else {
      divRef.current.style.height = prevStateRefDivRef.current.height
      divRef.current.style.width = prevStateRefDivRef.current.width
      smallRef.current.textContent = prevStateRefDivRef.current.text
    }
  }

  useEffect(() => {
    prevStateRefDivRef.current = {
      height: divRef.current.style.height,
      width: divRef.current.style.width,
      text: smallRef.current.textContent
    }
  }, [smallRef.current])

  return (
    <CollapseWrapper title='Упражнение'>
      <p className='mt-3'>
        У вас есть блок, у которого заданы ширина и высота. Добавьте кнопку, при
        нажатии которой изменятся следующие свойства:
      </p>
      <ul>
        <li>Изменится содержимое блока на &quot;text&quot;</li>
        <li>высота и ширина станут равны 150 и 80 соответственно</li>
      </ul>
      <Divider />
      <div
        ref={divRef}
        className='bg-primary d-flex flex-row justify-content-center align-items-center rounded mb-3'
        style={{
          height: 40,
          width: 60,
          color: 'white'
        }}
      >
        <small ref={smallRef}>Блок</small>
      </div>
      <button className='btn btn-warning shadow-lg' onClick={handleClickSmall}>
        Измени блок
      </button>
    </CollapseWrapper>
  )
}

export default UseRefExercise
