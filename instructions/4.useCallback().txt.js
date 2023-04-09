/*
----------------------------Хук useCallback()----------------------------------------
*/

//Хук useCallback() весьма похож на useMemo(). Он принимает функцию и список зависимостей. Также, как и useMemo(), он возвращает мемоизированное значение, только в отличие от useMemo(), мы должны сделать так, чтобы он вернул функцию.

//Прежде чем воспользоваться useCallback() , давай посмотрим, как получить функцию с помощью useMemo():

//const handleSome = useMemo(()=>{
//    return (args) => { /* ... */ }
//}, [deps]);

// handleSome() - мемоизированная функция

//Как мы видим, у нас нет никаких препятствия для создания мемоизированной функции. Теперь посмотрим на useCallback():

const handleSome = useCallback(
  (args) => {
    /* ... */
  },
  [deps]
)

// handleSome() - мемоизированная функция

//В отличие от useMemo(), хук useCallback() сразу принимает callback-функцию, которую нужно мемоизировать, а не анонимную функцию, из которой нужно вернуть необходимое значение. Использовать хук useCallback() для создания функций удобнее, и, таким образом, нам легче ориентироваться в коде. Стоит понимать, что useCallback() в следующем виде является эквивалентом useMemo():

useCallback(fn, deps)
// это то же самое, что и
useMemo(() => fn, deps)

//Хук useCallback() возвращает мемоизированную callback-функцию. Для нас это значит, что он сохранит ссылку на функцию, пока массив зависимостей не изменится.

//Принципиально можно определить, что useCallback() используют для сохранения ссылки на несериализуемые объекты (функции), а useMemo() для сериализуемых. Такое разделение нам необходимо, так как мы можем выполнять “поверхностную сверку” сериализуемых объектов и не можем у несериализуемых. Это влияет на использование способов оптимизации. Один из таких способов мы рассмотрим в части по React.memo().

//Когда мы определились с тем, что представляет из себя хук useCallback(), мы можем перейти к примеру. Вспомним пример с запросом к API из части по useMemo(), и сделаем его, используя новый хук (ссылка на готовый пример):

import React, { useEffect, useCallback, useState } from 'react'

// ...

export const Parent = () => {
  const [childProps, setChildProps] = useState(mockParam1)
  const handleSwitchChildProps = () => {
    if (childProps === mockParam1) {
      setChildProps(mockParam2)
    } else {
      setChildProps(mockParam1)
    }
  }

  return (
    <div>
      <button onClick={handleSwitchChildProps}>Обновить</button>
      <hr />
      <Child {...childProps} />
    </div>
  )
}

// Дочений компонент

const Childa = ({ id, param }) => {
  const [values, setValues] = useState(null)

  const handleRequest = useCallback(() => {
    const requestParams = {
      id,
      param
    }

    myFakeApi(requestParams).then((r) => setValues(r))
  }, [id, param])

  useEffect(() => {
    console.log('Request')
    handleRequest()
  }, [handleRequest])

  return (
    <div>
      {values ? (
        <pre>{JSON.stringify(values, null, 2)}</pre>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

//Мы убрали useMemo() и вместо него использовали useCallback(). Теперь мы сразу внутри него создаём параметры запроса и вызываем API. Хуку useEffect() мы передаём наш мемоизированный handleRequest() в зависимости и вызываем в теле. Когда в компонент Child придут новые props, мы получим новое значение handleRequest(), у него обновится ссылка и useEffect() будет вызван вновь.

//Давай с помощью handleRequest() улучшим наш UI. Сейчас у нас в момент загрузки при втором и последующих запросах нет соответствующей надписи. Давай это исправим:

const Child = ({ id, param }) => {
  const [values, setValues] = useState(null)

  const handleRequest = useCallback(() => {
    setValues(null)

    const requestParams = {
      id,
      param
    }

    myFakeApi(requestParams).then((r) => setValues(r))
  }, [id, param])

  useEffect(() => {
    console.log('Request')
    handleRequest()
  }, [handleRequest])

  return (
    <div>
      {values ? (
        <pre>{JSON.stringify(values, null, 2)}</pre>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  )
}

//В начале выполнения handleRequest() мы очищаем значение в состоянии, а так как пока у нас его нет, то мы увидим надпись “Загрузка….”.

//Обрати внимание, что setValues() не указана в зависимостях useCallback(). Функцию, полученную из useState(), не нужно передавать в зависимость, так как React гарантирует нам, что она не изменится в течении всего жизненного цикла компонента, а следовательно, нам не нужно отслеживать её изменение.
