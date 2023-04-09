import React, { useRef } from 'react'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'

const ProgrammableActionsExample = () => {
  const inputRef = useRef()

  const handleClickFocus = () => {
    inputRef.current.focus()
    inputRef.current.value = ''
    inputRef.current.onfocus = function () {
      inputRef.current.value = ''
    }
  }
  const handleClickWidth = () => {
    inputRef.current.style.width = inputRef.current.value
      ? inputRef.current.value + 'px'
      : 100 + 'px'
    inputRef.current.value = +inputRef.current.style.width.replace(
      /[a-zA-Z]/g,
      ''
    )
  }
  return (
    <CardWrapper>
      <SmallTitle className='card-title'>
        Программируемые действия и свойства
      </SmallTitle>
      <Divider />
      <label htmlFor='anything' className='form-label'>
        Введи что-нибудь:
      </label>
      <input
        ref={inputRef}
        type='number'
        id='anything'
        className='form-control mb-3'
      ></input>
      <button
        className='btn btn-warning shadow-lg me-2'
        onClick={handleClickFocus}
      >
        Наведи фокус на инпут
      </button>
      <button className='btn btn-info shadow-lg' onClick={handleClickWidth}>
        Измени длину инпута
      </button>
    </CardWrapper>
  )
}

export default ProgrammableActionsExample
