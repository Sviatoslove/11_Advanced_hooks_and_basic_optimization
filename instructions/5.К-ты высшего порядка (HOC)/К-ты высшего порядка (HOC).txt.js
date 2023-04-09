/*
----------------------------Компоненты высшего порядка (HOC)----------------------------------------
*/

//Компоненты высшего порядка (Higher-Order Components или HOC) – это один из продвинутых способов для повторного использования логики. HOC является одним из способов композиции компонентов.

//Higher-Order Component представляет собой функцию, которая принимает компонент (и возможно какие-то параметры) и возвращает новый компонент. Готовые HOC можно встретить во многих популярных библиотеках. Например в библиотеке React Redux функция connect() или в Formik функция withFormik().

//Также HOC не только хорошо подходят для создания переиспользуемой логики, но и приводят к тому, что их дочерние компоненты легче тестировать. Но для понимания этого нужно быть знакомым с Unit-тестированием.

//Давай рассмотрим следующий Higher-Order Component:

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fakeApiGetUser } from '../api/fake-api-users'

// Просто компонент
const UserMeta = (props) => {
  const { name, phone, email } = props
  return (
    <div>
      <h3>{name}</h3>
      <p>
        Tel.: {phone}, email: {email}
      </p>
      <div></div>
      <hr />
    </div>
  )
}

UserMeta.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

// Наш Higher-Order Component
const withQuerya = (Component) => {
  return ({ userGuid }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
      fakeApiGetUser(userGuid).then((r) => {
        setUser(r)
      })
    }, [userGuid])

    return user ? <Component {...user} /> : <div>Загрузка...</div>
  }
}

//export default withQuery(UserMeta);

//Наш HOC называется withQuery(). Ты часто можете встретить, что название HOC начинаются с префикса with. Мы будем именовать наши HOC, начиная с этого префикса, так как фактически такое именование стало стандартом индустрии (хотя не все ему придерживаются).

//Наш HOC принимает на вход один компонент, а возвращает другой. Компонент, который он возвращает анонимный (в данном случае), и принимает в себя параметр userGuid, который нужен нам для запроса. При монтаже компонента он показывает “Загрузка…” и начинает запрос за получением user. Когда он получит данные, то отобразит изначально переданный в HOC компонент (в нашем случае UserMeta).

//Теперь воспользуемся withQuery():

import React from 'react'
/**
 * Так как экспорт дефолтный,
 * мы можем импортировать наш HOC просто под именем UserMeta
 */
import UserMeta from '../components/userMeta'

const SomeComponent = () => {
  return (
    <div>
      <h1>SomeComponent</h1>
      {/** Вызываем компонент и передаём ему guid пользователя */}
      <UserMeta userGuid='AF8B35D3-AF7B-D696-DD95-CFD9EE754F9B' />
    </div>
  )
}

//export default SomeComponent;

//смотреть Screenshot_6.png

//Мы можем улучшить наш withQuery() и добавить в него обработку ошибок:

// Наш Higher-Order Component
const withQuery = (Component) => {
  return ({ userGuid }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
      fakeApiGetUser(userGuid)
        .then((r) => {
          setUser(r)
        })
        .catch((e) => setError(e))
    }, [userGuid])

    if (error) return <div>{error}</div>

    return user ? <Component {...user} /> : <div>Загрузка...</div>
  }
}

//export default withQuery(UserMeta);

//Теперь, если мы не получим данных или передадим некорректный userGuid, то получим ошибку, которую нам вернёт сервер и выведем её на экран: смотреть Screenshot_7.png

//Давай рассмотрим ещё один HOC для UserMeta. Сделаем UserMeta немного красивее, прежде чем делать новый HOC:

const UserMeta = (props) => {
  const { name, phone, email } = props
  return (
    <div className='card'>
      <div className='card-body'>
        <h3 className='card-title'>{name}</h3>
        <div className='card-text'>
          Tel.: {phone}, email: {email}
        </div>
      </div>
    </div>
  )
}

//Теперь он выглядит вот так: смотреть Screenshot_8.png

//Вернёмся к HOC. Он будет принимать пользователя и давать нам кнопку для редактирования его поля. Пусть это будет телефон:

import React, { useEffect, useState } from 'react'

/**
 * Компонент поля редактирования телефона.
 * Просто управляемый <input> и кнопка сохранить.
 */
export const EditUserPhone = ({ value, onChange, onSuccess }) => {
  return (
    <div className='alert alert-success mt-2'>
      <h4>Введите новый телефон</h4>
      <div className='d-flex justify-content-between'>
        <input
          value={value}
          onChange={onChange}
          className='w-100 me-2 form-control'
        />{' '}
        <button className='btn btn-primary' onClick={onSuccess}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

/**
 * Кнопка для перехода в режим редактирования, когда появляется поле
 */
export const UserEditBtn = ({ onClick }) => {
  return (
    <div className='d-flex justify-content-end mt-2'>
      <button className='btn btn-primary' onClick={onClick}>
        Редактировать телефон
      </button>
    </div>
  )
}

/**
 * Новый HOC для редактирования телефона.
 * Принимает Component и возвращает новый, которому
 * нужно передать props как у UserMeta.
 */
export const withEditUserPhone = (Component) => {
  return (props) => {
    // В режиме редактирования или нет
    const [isEdit, setIsEdit] = useState(false)
    // Сохраненный телефон
    const [phone, setPhone] = useState(props.phone)
    // Значение для редктирования <input> в EditUserPhone
    const [fieldValue, setFieldValue] = useState(props.phone)

    // Если придут новые данные то установить их
    useEffect(() => {
      setPhone(props.phone)
      setFieldValue(props.phone)
    }, [props.phone])

    // Переключение режима редактирования
    const handleToggleEdit = () => {
      setIsEdit((prevEdit) => !prevEdit)
    }

    // Для кнопки "сохранить" в EditUserPhone
    const handleSuccess = () => {
      handleToggleEdit()
      // Сохранить значение в phone
      setPhone(fieldValue)
    }

    // Обработчик события onChange у <input>
    const handleInputChange = (event) => {
      const { value } = event.target
      setFieldValue(value)
    }

    return (
      <>
        <Component {...props} phone={phone} />
        {/**
         * Если в режиме редактирования, то
         * вернёт форму редактирования,
         * иначе - кнопку "редактировать телефон"
         */}
        {isEdit ? (
          <EditUserPhone
            value={fieldValue}
            onChange={handleInputChange}
            onSuccess={handleSuccess}
          />
        ) : (
          <UserEditBtn onClick={handleToggleEdit} />
        )}
      </>
    )
  }
}

//Теперь воспользуемся нашим новым HOC. Мы могли бы скопировать для примера данные пользователя и просто вызвать его, но мы уже получаем данные по API и нам нет необходимости копировать одно и тоже. Мы просто воспользуемся нашими withEditUserPhone() и withQuery() одновременно:

/**
 * Просто нужно обернуть UserMeta в withEditUserPhone(), а потом
 * получившееся обернуть в withQuery(),
 * так как в withQuery() мы получаем пользователя
 */
export default withQuery(withEditUserPhone(UserMeta))

//И теперь посмотрим, что получилось: смотреть Screenshot_9.png

//Появилась кнопка, при её нажатии появляется форма: смотреть Screenshot_10.png

//В форме мы можем редактировать телефон: смотреть Screenshot_11.png

//В идеале можно ещё отправить новое значение на сервер. Но в этот раз не станем этого делать. У нас получилось 2 HOC: смотреть Screenshot_12.png

//Сейчас наши примеры довольно частные, но HOC можно и нужно делать для более общих случаев. Используй HOC для выделения часто повторяемой логики, и они дадут тебе наибольшую полезность.
