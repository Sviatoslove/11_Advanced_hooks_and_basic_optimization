import React, { useCallback, useEffect, useRef, useState } from 'react'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'

const UseCallBackExample = () => {
  const [data, setData] = useState({})
  const withCallback = useRef(0)
  const withOutCallback = useRef(0)

  const validateWithCallback = useCallback((data) => console.log(data), [])

  useEffect(() => {
    withCallback.current++
  }, [validateWithCallback])

  const validateWithOutCallback = (data) => {
    console.log(data)
  }

  useEffect(() => {
    withOutCallback.current++
  }, [validateWithOutCallback])

  const handleChange = ({ target }) => {
    setData((state) => ({ ...state, [target.name]: target.value }))
  }

  useEffect(() => {
    validateWithOutCallback(data)
    validateWithCallback(data)
  }, [data])

  return (
    <CardWrapper>
      <SmallTitle>Example</SmallTitle>
      <Divider />
      <p>Render withCallback: {withCallback.current}</p>
      <p>Render withOutCallback: {withOutCallback.current}</p>
      <label htmlFor='email' className='form-label'>
        Введи что-нибудь:
      </label>
      <input
        type='email'
        name='email'
        id='email'
        className='form-control mb-3'
        onChange={handleChange}
      ></input>
    </CardWrapper>
  )
}

export default UseCallBackExample
