/*
----------------------------Children.txt----------------------------------------
*/

//В этом уроке мы разберёмся, что такое children. Ранее мы их уже использовали, но теперь рассмотрим их подробнее.

//props.children — это объект, содержащий описание детей. Это ненастоящие потомки, не компоненты, а всего лишь описание. Мы не можем изменить какие-либо параметры или редактировать какие-либо функции у них. Мы имеем доступ к чтению.

//React нам предоставляет несколько API-методов для работы с непрозрачной структурой данных props.children. Она называется непрозрачной, так как мы заранее не знаем, что придёт к нам в children.

//Рассмотрим, какие методы есть у React.Children.

React.Children.map()

React.Children.map(children, (child) => {
  /* ... */
})

//Вызывает функцию для каждого непосредственного потомка в children, передавая их по очереди в child. Возвращаемое значение из функции — обновленный потомок (аналогично методу map() у обычных массивов в JS). Если children — это массив, он будет пройден, функция будет вызвана для каждого потомка в массиве, и вернется обновленный массив. Если children равен null или undefined, этот метод вернёт null или undefined, а не массив.

//Важно! Если children — это Fragment, он будет рассматриваться как целый потомок, а элементы внутри не будут пройдены.

React.Children.forEach()

//React.Children.forEach(children, (child) => { /* ... */ });
//Похож на React.Children.map(), но не возвращает обновленный массив. Также можно сравнить с методом массивов forEach() в обычном JS. Проходит по каждому элементу и вызывает callback-функцию.

React.Children.count()

React.Children.count(children)

//Возвращает общее количество компонентов в children, равное числу раз, сколько была бы вызвана callback-функция, переданная в map() или forEach().

//Есть ещё другие методы React.Children, но они используются реже. Давай перейдем к практике.

//Для примера мы создадим такой компонент Statusbar : смотреть Screenshot_1.png

//Создадим некоторый компонент, в котором будем вызывать наш Statusbar:

const SomeComponenta = () => {
  return (
    <Statusbar value={1}>
      <SatutusItem value={1}>Шаг 1</SatutusItem>
      <SatutusItem value={2}>Шаг 2</SatutusItem>
      <SatutusItem value={3}>Шаг 3</SatutusItem>
      <SatutusItem value={4}>Шаг 4</SatutusItem>
      <SatutusItem value={5}>Шаг 5</SatutusItem>
    </Statusbar>
  )
}

//Компонент Statusbar будет принимать потомков (SatutusItem), которые имеют своё значение. Если значение потомка меньше либо равно значению value у Statusbar, то SatutusItem должен быть выделен как завершённый.

//Создадим папку для компонентов Statusbar и SatutusItem. Поместим туда стили:

/* styles.css
.wrapper {
    width: 330px;
    font-family: "Helvetica";
    font-size: 14px;
}
.step-progress {
    position: relative;
    padding-left: 45px;
    list-style: none;
}
.step-progress::before {
    display: inline-block;
    content: "";
    position: absolute;
    top: 0;
    left: 15px;
    width: 10px;
    height: 100%;
}
.step-progress-item {
    position: relative;
    counter-increment: list;
}
.step-progress-item:not(:last-child) {
    padding-bottom: 20px;
}
.step-progress-item::before {
    display: inline-block;
    content: "";
    position: absolute;
    left: -30px;
    height: 100%;
    width: 10px;
}
.step-progress-item::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: -37px;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 50%;
    background-color: #fff;
}
.step-progress-item.is-done::before {
    border-left: 2px solid green;
}
.step-progress-item.is-done::after {
    content: "✔";
    font-size: 13px;
    color: #fff;
    text-align: center;
    border: 2px solid green;
    background-color: green;
}
.step-progress-item.current::before {
    border-left: 2px solid green;
}
.step-progress-item.current::after {
    content: counter(list);
    padding-top: 1px;
    width: 25px;
    height: 25px;
    top: -4px;
    left: -40px;
    font-size: 14px;
    text-align: center;
    color: green;
    border: 2px solid green;
    background-color: white;
}
.step-progress strong {
    display: block;
}
*/

//Создадим в той же папке файл statusbar.jsx.

//Мы будем использовать готовую верстку, скопируем её в Statusbar:

import React from 'react'
import './styles.css'

const Statusbara = () => {
  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'>
          <div className='step-progress-item is-done'>
            <strong>Шаг 1</strong>
          </div>
          <div className='step-progress-item is-done'>
            <strong>Шаг 2</strong>
          </div>
          <div className='step-progress-item is-done'>
            <strong>Шаг 3</strong>
          </div>
          <div className='step-progress-item is-done'>
            <strong>Шаг 4</strong>
          </div>
          <div className='step-progress-item current'>
            <strong>Шаг 5</strong>
          </div>
        </ul>
      </div>
    </div>
  )
}

//В верстке видно, что завершённые шаги должны иметь класс "is-done", а незавершённые "current".

//Создадим компонент SatutusItem:

// status-item.jsx
import React from 'react'
import './styles.css'

const SatutusItema = ({ children, isDone, value }) => {
  return (
    <div className='step-progress-item is-done'>
      <strong>{children}</strong>
    </div>
  )
}

//export default SatutusItema;

//И создадим функцию, которая сгенерирует className, и опишем типы:

import React from 'react'
import PropsTypes from 'prop-types'
import './styles.css'

const SatutusItem = ({ children, isDone }) => {
  const className = `step-progress-item ${isDone ? 'is-done' : 'current'}`
  return (
    <div className={className}>
      <strong>{children}</strong>
    </div>
  )
}

SatutusItem.propTypes = {
  children: PropsTypes.string.isRequired,
  isDone: PropsTypes.bool,
  value: PropsTypes.number.isRequired
}

export default SatutusItem

//Сделаем isDone опциональным параметром, не указывая для него isRequired. Его будет назначать Statusbar.

//Вернёмся в Statusbar и уберём все элементы внутри:

const Statusbaraa = () => {
  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'></ul>
      </div>
    </div>
  )
}

//Теперь воспользуемся React.Children.map() для вывода SatutusItem:

const Statusbaraaa = ({ children, value }) => {
  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'>
          {React.Children.map(children, (child) => {
            if (child.type === SatutusItem) {
              return child
            }
            return null
          })}
        </ul>
      </div>
    </div>
  )
}

//Внутри цикла мы проверяем, является ли наш child компонентом SatutusItem, и если нет, то мы возвращаем null. Так мы убеждаемся, что у нас будет нужный компонент с нужными props.

//Теперь мы можем склонировать наш child и добавить ему props-параметр isDone:

const Statusbarb = ({ children, value }) => {
  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'>
          {React.Children.map(children, (child) => {
            if (child.type === SatutusItem) {
              return React.cloneElement(child, {
                isDone: child.props.value <= value
              })
            }
            return null
          })}
        </ul>
      </div>
    </div>
  )
}

//Теперь корректно отображается галочка:смотреть Screenshot_2.png

//Давай сделаем некоторый интерактив, и будем назначать шаг, выполненным в момент нажатия:

const SomeComponent = () => {
  const [value, setValue] = useState(1)

  const handleChangeValue = (nextValue) => {
    setValue(nextValue)
  }

  return (
    <Statusbar value={value} onChange={handleChangeValue}>
      <SatutusItem value={1}>Шаг 1</SatutusItem>
      <SatutusItem value={2}>Шаг 2</SatutusItem>
      <SatutusItem value={3}>Шаг 3</SatutusItem>
      <SatutusItem value={4}>Шаг 4</SatutusItem>
      <SatutusItem value={5}>Шаг 5</SatutusItem>
    </Statusbar>
  )
}

//В этом случае мы видим удобство такого подхода. Мы передаём onChange только один раз, вместо передачи каждому элементу. В самом элементе необходимо добавить:

const SatutusItem = ({ children, isDone, onClick, value }) => {
  const className = `step-progress-item ${isDone ? 'is-done' : 'current'}`
  const handleClick = () => {
    onClick && onClick(value)
  }

  return (
    <div className={className} onClick={handleClick}>
      <strong>{children}</strong>
    </div>
  )
}

SatutusItem.propTypes = {
  children: PropsTypes.string.isRequired,
  isDone: PropsTypes.bool,
  value: PropsTypes.number.isRequired,
  onClick: PropsTypes.func
}

//Так как функция onClick() не обязательна, мы проверили её наличие в handleClick() перед вызовом.

//И теперь осталось передать пропс onClick из Statusbar в SatusItem:

const Statusbarс = ({ children, value, onChange }) => {
  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'>
          {React.Children.map(children, (child) => {
            if (child.type === SatutusItem) {
              return React.cloneElement(child, {
                isDone: child.props.value <= value,
                onClick: onChange
              })
            }
            return null
          })}
        </ul>
      </div>
    </div>
  )
}

//Теперь мы можем нажимать на элементы и будет происходить смене значения: смотреть Screenshot_3.png

//Для практики используем ещё один метод Children. Проверим, что у нас есть элементы в props.children, а иначе выведем сообщение об ошибке:

const Statusbar = ({ children, value, onChange }) => {
  const countChildren = React.Children.count(children)

  if (!countChildren) {
    return <div>Нет элементов</div>
  }

  return (
    <div>
      <div className='wrapper'>
        <ul className='step-progress'>
          {React.Children.map(children, (child) => {
            if (child.type === SatutusItem) {
              return React.cloneElement(child, {
                isDone: child.props.value <= value,
                onClick: onChange
              })
            }
            return null
          })}
        </ul>
      </div>
    </div>
  )
}

//Здесь мы определили количество потомков с помощью React.Children.count(), и если у нас их нет, то выводим сообщение об ошибке. Если мы не передадим потомков, то увидим запись: смотреть Screenshot_4.png

//Мы с тобой рассмотрели, как работать с React.Children и React.cloneElement(). Теперь ты можешь использовать их в своём коде.

//Примеры из конспекта: https://codesandbox.io/s/11-rasshirennye-huki-i-bazovaya-optimizaciya-forked-slnl3e
