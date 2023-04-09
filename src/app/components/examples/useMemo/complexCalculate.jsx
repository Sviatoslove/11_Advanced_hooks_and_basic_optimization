import React, { useEffect, useMemo, useState } from 'react'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'

function myLoop(n) {
  console.time('Выполнялось: ')
  let i = 0
  do {
    i++
  } while (i !== n)
  console.timeEnd('Выполнялось: ')
  return i
}

function runMyLoop(n) {
  console.log('runMyLoop')
  return myLoop(n)
}

const ComplexCalculateExample = () => {
  const [value, setValue] = useState(100_000_000)
  const [otherState, setOtherState] = useState(false)

  const btnColor = otherState ? 'success' : 'danger'
  const fact = useMemo(() => runMyLoop(value), [value])

  useEffect(() => {
    console.log('render')
  })

  return (
    <>
      <CardWrapper>
        <SmallTitle>Кэширование сложных вычислений</SmallTitle>
        <Divider />
        <p>Value: {value}</p>

        <p>Result fact: {fact}</p>
        <button
          className='btn btn-warning ms-md-2'
          onClick={() => setValue((prevState) => prevState + 10_000_000)}
        >
          Increment
        </button>
        <button
          className='btn btn-info ms-md-2'
          onClick={() => setValue((prevState) => prevState - 10_000_000)}
        >
          Decrement
        </button>
      </CardWrapper>
      <CardWrapper>
        <SmallTitle>Зависимость от сторонних setState</SmallTitle>
        <Divider />
        <button
          className={'btn  ms-md-2 btn-' + btnColor}
          onClick={() => setOtherState((prevState) => !prevState)}
        >
          Change color btn
        </button>
      </CardWrapper>
    </>
  )
}

export default ComplexCalculateExample
