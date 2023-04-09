/*
----------------------------Хук useRef()----------------------------------------
*/

//Хук useRef() возвращает изменяемый ref-объект. В его свойстве current будет находится заданное значение:

const ref = useRef({ name: 'John' })
useEffect(() => {
  console.log(ref.current) // { name: "John" }
})

//Важная особенность useRef() – ссылка на ref-объект неизменна, и поэтому сам он не может быть передан в useEffect() в качестве зависимости (так как useEffect() попросту не будет вызываться вновь). Но можно передать его свойство current и его изменение будет влиять на вызов useEffect().

//Давай рассмотрим, в каких случаях используют хук useRef().

//Доступ к потомку

//Самый распространенный способ использования – получение доступа к потомку в компоненте (ссылка на пример):

import React, { useRef, useState } from 'react'

export const ExampleFileInput = () => {
  const inputRef = useRef(null)
  const [isValueSet, setIsValueSet] = useState(false)

  const handleSend = () => {
    const file = inputRef.current.files
    console.log(file)
  }

  return (
    <div>
      <h2>Получения доступа к потомку</h2>
      <label htmlFor='file'>Выберите файл</label>
      <input ref={inputRef} type='file' onChange={() => setIsValueSet(true)} />
      <button onClick={handleSend} disabled={!isValueSet}>
        Отправить файл
      </button>
    </div>
  )
}

//В примере, выше при нажатии на кнопку “Отправить файл”, будет вызываться handleSend(), в котором мы получаем доступ к <input type="file"> через inputRef.current и его свойство files. Для того чтобы так сделать, мы создали inputRef с помощью хука useRef()  и передали его в атрибут ref у <input>.

//Таким же образом можно совершать действия с DOM-элементами. Например сделать focus на каком-то элементе (ссылка на готовый пример):

export const ExampleFocusInput = () => {
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.focus()
  }

  return (
    <div>
      <h2>Действия c DOM-элементом</h2>
      <input ref={inputRef} type='text' />
      <button onClick={handleClick}>Фокус</button>
    </div>
  )
}

//При нажатии на кнопку “Фокус” будет вызвана функция handleClick(), в которой будет получен HTML-элемент <input> и вызван его метод focus().

//Получение предыдущего значения состояния

//Иногда мы хотим сравнить предыдущее значение состояния и новое. С помощью хука useRef() это также можно реализовать:

import React, { useState, useEffect, useRef } from 'react'

export const ExampleFefUsePrev = () => {
  // Состояние
  const [count, setCount] = useState(0)
  // Ref, начальное значение равно состоянию
  const prevRef = useRef(count)

  // При изменении count меняем значение в Ref
  useEffect(() => {
    prevRef.current = count
  }, [count])

  // Получаем предыдущее значение
  const prevCount = prevRef.current
  return (
    <div>
      <h1>
        Текщее значение: {count}, Предыдущее: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

//При нажатии на кнопку “Increment” состояние count изменится, это изменение вызовет useEffect(), в котором будет присвоено новое значение prevRef.current. Изменение prevRef не вызывает рендер, мы видим его предыдущее значение до следующего рендера (не зависимо по какой причине произошел рендер).

//Подсчет количества рендеров

//Когда мы ищем способ оптимизировать наше приложение, можно посмотреть, как часто вызывается рендер компонента. С помощью хука useEffect() и useRef() это также можно реализовать. Если мы не указываем никаких зависимостей для useEffect(), то он срабатывает при каждом рендеринге. В нём мы будем обновлять наш ref (ссылка на пример):

export const ExampleRefRerender = () => {
  const renderCount = useRef(0)
  const [state, toggleState] = useState(true)
  // Изменение состояния для вызова рендера
  const toggle = () => {
    toggleState(!state)
  }

  useEffect(() => {
    // При каждом рендере будет вызвана
    // функция и счетчик будет увеличен
    renderCount.current += 1
  })

  return (
    <div>
      <h2>Количество рендеров</h2>
      <p>Было рендеров: {renderCount.current}</p>
      <p>
        <button onClick={toggle}>Update state</button>
      </p>
    </div>
  )
}

//Благодаря тому, что изменение renderCount не влияет на рендер, мы можем подсчитать количество ререндеров.
