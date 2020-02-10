---
title: "React Hooks로 Form 핸들링 하기"
date: 2019-07-27T21:12:00.000Z
tags: ["react", "hooks", "useForm"]
category: blog
open: true
---

<br />

React Hooks를 GatsbyJS 프로젝트에 사용하면서 관련 코드들을 많이 찾아보다가, Form 핸들링에 매우 용이한 소스코드를 참조하게 되었다. Hooks를 적절히 이용하여 사용자의 input 값을 가져와 validation 하고, form submit을 하여 그 다음 액션을 유도하는 것까지 일련의 프로세스들을 구조화하여, 한 번에 이 모든 것들을 처리하는 동시에 높은 재사용성으로 다양한 용도의 Form을 핸들링할 수 있도록 Custom Hook을 만드는 것이다.

> ### Custom Hook - useForm

Form과 관련된 Custom Hook은 Hooks의 네이밍 컨벤션을 따라 Form 앞에 use를 붙인 `useForm.js` 이라는 새로운 파일에 동일한 이름의 함수를 생성한다.  
useForm은 Form submit 이후 실행될 액션인 `callback` 함수와 `validate` 함수를 인자로 받고, Form에 사용할 이벤트 핸들러 함수들과 함께 form으로부터 입력받은 input 값이 저장된 `values` 객체와 validation 에러 메시지가 저장된 `errors` 객체를 모두 한꺼번에 리턴해 줌으로써, Form이 렌더링되는 페이지에서 한 번에 핸들링이 가능하다.  
Custom Hook 내부에서도 `useState` Hook을 사용하여 사용자 input 값이나 validation 결과값을 트랙킹하고, `useEffect` Hook으로는 form submit과 validation 결과를 모두 통과한 경우에만 callback 함수를 호출하도록 한다.

```js
import { useState, useEffect } from "react"

const useForm = (callback, validate) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clicked, setClicked] = useState("")

  useEffect(() => {
    // form submit이 되었고, validation이 모두 통과되었다면
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback() // 다음 액션(로그인, 회원가입 등) 유도
    }
  }, [errors]) // errors가 변경된 경우에만 update 될 수 있도록 두 번째 파라미터 전달

  // 사용자의 input 값을 가져와 values에 저장
  const handleChange = event => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
  }

  // 재사용성을 높이기 위해 어떠한 submit button을 클릭하였는지 구분
  const handleClick = event => {
    setClicked(event.target.value)
  }

  // form submit 확인 및 input 값을 validate하여 유효하지 않은 경우에는 error 메시지 저장
  const handleSubmit = event => {
    if (event) event.preventDefault()
    setIsSubmitting(true)
    setErrors(validate(values, clicked))
  }

  return {
    handleChange,
    handleSubmit,
    handleClick,
    values,
    errors,
  }
}

export default useForm
```

> ### validate 함수

사용자의 input 값인 `values`와 어떠한 submit을 하였는지 구분해주는 `clicked`를 인자로 받아, 각 값을 validate 한 다음, 에러 메시지가 담긴 `errors` 객체를 리턴함으로써, useForm 함수의 errors state에 저장된다.

```js
const validate = (values, clicked) => {
  const errors = {}
  const emailRegex = /\S+@\S+\.\S+/
  const phoneRegex = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g

  switch (clicked) {
    case "로그인":
      if (!values.email) {
        errors.email = "이메일을 반드시 입력해주세요"
      } else if (!emailRegex.test(values.email)) {
        errors.email = "이메일 형식에 맞게 입력해주세요"
      }
      if (!values.password) {
        errors.password = "패스워드를 반드시 입력해주세요"
      }
      return errors

    case "회원가입":
    // ...생략

    default:
      return errors
  }
}

export default validate
```

> ### Login 페이지

마지막으로 Form이 포함된 페이지 컴포넌트에서 이 모두를 한 번에 사용할 수 있다. 이는 로그인 또는 회원가입 등 입력양식이 있는 페이지라면 어디서든지 재사용이 가능하다.

```js
import React, { useState } from "react"
import * as auth from "../../services/auth"
import validate from "../../services/validate"
import useForm from "../../components/hooks/useForm"
// ...생략

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState([])

  // Form submit & validation 이후 실행될 로그인 프로세스
  const formLogin = async () => {
    setLoading(true)

    try {
      const response = await auth.handleLogin({
        email: values.email,
        password: values.password,
      })
      const token = response.headers["x-auth-token"]
      auth.saveTokenAndMoveToRoot(token)
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response
        setApiError(data)
      }
    }
  }

  // useForm에 callback & validate 함수를 넘기고 리턴받은 state와 이벤트 핸들러
  const { values, errors, handleChange, handleSubmit, handleClick } = useForm(
    formLogin,
    validate
  )

  return (
    // ...생략
    <StyledForm
      onSubmit={event => handleSubmit(event)} {/* Form submit 핸들링 */}
      loading={loading}
      error={apiError.length !== 0 || Object.entries(errors).length !== 0}
    >
      {apiError && <Message>{apiError}</Message>}
      <FormInput
        id="email"
        name="email"
        type="text"
        autoFocus
        value={values.email || ""} {/* state에 저장된 input 값 가져오기 */}
        onChange={handleChange} {/* 사용자로 받은 input 값을 state에 저장 */}
        placeholder="이메일을 입력하세요"
      />
      {errors.email && <Message>{errors.email}</Message>}{" "}
      {/* 유효하지 않은 input 값을 받은 경우 에러메시지 출력 */}
      <FormInput
        id="password"
        name="password"
        type="password"
        value={values.password || ""}
        onChange={handleChange}
        placeholder="패스워드를 입력하세요"
      />
      {errors.password && <Message>{errors.password}</Message>}
      <FormButton
        type="submit"
        background={blue}
        color="#fff"
        onClick={handleClick} {/* 어떤 Form을 submit하였는지 구분 */}
        value="로그인"
      >
        로그인
      </FormButton>
    </StyledForm>
    // ...생략
  )
}
```
