/*
----------------------------Хук useCallback() (HOC)----------------------------------------
*/

//В этой части мы разберёмся с тем, что такое React.memo(), чем он отличается от useMemo(), и в каких случаях его следует использовать.

//React.memo() — это Higher-Order Component. Он служит для прерывавания лишних рендеров. Если твой компонент всегда рендерит одно и то же с теми же props, ты можешь обернуть твой компонент в React.memo(), тем самым мемоизируя результат рендера.

//То есть React.memo() принимает компонент и возвращает его мемоизированное значение. Это и позволяет избавиться от лишних ререндеров.

//Когда рекомендуется использовать React.memo():

//Если компонент часто ререндериться
//Компоненту передаются одинаковые параметры при одинаковых ререндерах
//Компонент не имеет собственного состояния
//Если функциональный компонент обёрнут в React.memo() и используют useState(), useReduсer() или useContext() (разберем в следующих уроках), он будет повторно рендериться при изменении состояния или контекста. Это просто необходимо, ведь мы хотим, чтобы наш контент менялся, если мы изменим, например, состояние.

//Перейдём к примерам (ссылка на готовый пример):

import React, { useEffect, useState } from 'react'

const Parenta = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Count: {count}</h2>
      <button
        className='btn btn-primary'
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
      <div>
        <Children />
      </div>
    </div>
  )
}

const Childrena = () => {
  useEffect(() => {
    console.log('render')
  })

  return <div>Children</div>
}

//У нас есть родительский компонент и потомок. В родительском есть кнопка, которая изменяет некоторое состояние. В потомке useEffect(), который при каждом рендере компонента выводит сообщение в консоль.

//Когда мы будем нажимать кнопку для изменения состояния, мы увидим, что каждый раз будет вызываться рендер потомка. Нам это не нужно, так как от этого ничего не меняется. Давай воспользуемся React.memo() для избежания лишних ренеров:

const Childrenaa = React.memo(() => {
  useEffect(() => {
    console.log('render')
  })

  return <div>Children</div>
})

//Мы обернули наш компонент в функцию React.memo(), и теперь у нас нет повторных рендеров при изменении состояния.

//Это самый простой пример использования React.memo(), давай немного усложним. Будем передавать в потомок некоторую сущность, пусть это будет user:

import React, { useEffect, useState } from 'react'

const Parentaa = () => {
  const [count, setCount] = useState(0)

  const user = {
    name: 'Sarah Sullivan',
    phone: '1-976-631-1449',
    email: 'fringilla.purus.mauris@protonmail.com',
    address: '2660 Fringilla Av.'
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button
        className='btn btn-primary'
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
      <div>
        <Children user={user} />
      </div>
    </div>
  )
}

const Childrenb = React.memo(({ user }) => {
  useEffect(() => {
    console.log('render')
  })

  return <div>{user.name}</div>
})

//export default Parentaa

//Мы видим, что у нас объявлен объект user, и он передаётся в дочерний компонент. Теперь, при нажатии на кнопку в родителе, опять повторно ренедерится дочерний компонент. Как это можно исправить:

//Вариант 1

//Мы видим, что в дочернем компоненте используется только поле name. Мы можем сравнить, равно ли новое значение name к предыдущему. Для этого вторым аргументом в React.memo() нужно передать специальную функцию areEqual(). Она принимает два аргумента: предыдущие props и новые. Внутри нужно провести сравнение. Если мы не хотим, чтобы компонент ререндерился, то нужно вернуть true, иначе false:

function areEqual(prevProps, nextProps) {
  // Изменилось ли свойство name у новых props
  return prevProps.user.name === nextProps.user.name
}

//И теперь используем:

const Childrenc = React.memo(({ user }) => {
  useEffect(() => {
    console.log('render')
  })

  return <div>{user.name}</div>
}, areEqual)

//Схематически можно представить запись так:

// fn - код компонента
const Component = React.memo(fn, areEqual)

//Такой способ сработает только для примитивных типов данных или сериализуемых объектов (для них можно, например, использовать isEqual из библиотеки lodash).

//Вариант 2

//Наш user – ссылочный тип данных, и мы можем его мемоизировать. В React.memo() есть “поверхностная сверка” для ссылочных типов данных, и если ссылка всегда будет одна и та же, то повторного рендера не случится:

import React, { useEffect, useState, useMemo } from 'react'

const Parentc = () => {
  const [count, setCount] = useState(0)

  const user = useMemo(
    () => ({
      name: 'Sarah Sullivan',
      phone: '1-976-631-1449',
      email: 'fringilla.purus.mauris@protonmail.com',
      address: '2660 Fringilla Av.'
    }),
    []
  )

  return (
    <div>
      <h2>Count: {count}</h2>
      <button
        className='btn btn-primary'
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
      <div>
        <Children user={user} />
      </div>
    </div>
  )
}

const Childrencc = React.memo(({ user }) => {
  useEffect(() => {
    console.log('render')
  })

  return <div>{user.name}</div>
})

//После того, как мы обернули в useMemo(), лишние рендеры прекратились.

//Также мы можем поступить с функциями. Функции нельзя сравнить с помощью areEqual(), можно только использовать “поверхностное сравнение” по ссылке. Поэтому нужно обернуть функцию в useCallback():

import React, { useEffect, useState, useMemo, useCallback } from 'react'

const Parent = () => {
  const [count, setCount] = useState(0)

  const handleCount = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  const user = useMemo(
    () => ({
      name: 'Sarah Sullivan',
      phone: '1-976-631-1449',
      email: 'fringilla.purus.mauris@protonmail.com',
      address: '2660 Fringilla Av.'
    }),
    []
  )

  return (
    <div>
      <h2>Count: {count}</h2>

      <div>
        <Children onIncrement={handleCount} user={user} />
      </div>
    </div>
  )
}

const Children = React.memo(({ user, onIncrement }) => {
  useEffect(() => {
    console.log('render')
  })

  return (
    <div>
      {user.name}
      <div>
        <button className='btn btn-primary' onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  )
})

export default Parent

//В данном примере мы перенесли кнопку из родителя в потомок, создали функцию handleCount() и передали её в Children. Так как handleCount() использует useCallback(), у нас также не будет лишних рендеров.

//Перед тем, как перейти к итогам, давай порассуждаем: знаем ли мы, когда в нашем коде появится React.memo()?! Или когда в дочернем компоненте будет вызван useEffect() зависящий от props?! Наш проект может иметь сложную композицию компонентов c многими потомками. Если не сохранять ссылки на объекты, то это может вызывать утечки памяти или свести на нет использование React.memo(). В коммерческой разработке можно нередко увидеть следование правилу — все объекты, передаваемые в потомки, должны быть мемоизированы. Ты тоже можешь следовать ему, это избавит от некоторых проблем с производительностью.

//Подведем промежуточные итоги. React.memo() нужен для оптимизации рендеров. Если мы передаём в него объекты, то обязательно нужно их мемоизировать или создавать функцию для сравнения данных – areEqual().
