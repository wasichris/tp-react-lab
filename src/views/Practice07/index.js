import React from 'react'
import TpSection from '@src/components/TpSection/index'
import TpLoader from '@src/components/TpLoader//index'
import { Formik, Form, Field, ErrorMessage } from 'formik'

class Practice07 extends React.Component {
  validate = values => {
    const errors = {}
    // if (!values.email) {
    //   errors.email = 'Required'
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    // ) {
    //   errors.email = 'Invalid email address'
    // }
    return errors
  }

  // setSubmitting not working
  // https://github.com/jaredpalmer/formik/issues/195
  // https://github.com/jaredpalmer/formik/pull/1987
  // handleSubmit = (values, { setSubmitting }) => {
  //   // setSubmitting(true)
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2))
  //     setSubmitting(false)
  //   }, 1000)
  // }

  handleSubmit = async values => {
    await new Promise(resolve => setTimeout(resolve, 500))
    alert(JSON.stringify(values, null, 2))
  }

  render () {
    return (
      <>
        <h1> 呼叫 API 取得資訊 </h1>
        <TpLoader />
        <p className='desc'>
          熟悉 API 呼叫方式，登入成功時顯示用戶資訊於畫面中。
        </p>

        <TpSection>

          <Formik
            initialValues={{ email: '', password: '' }}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          >

            {({ isSubmitting }) => (
              <Form>
                <Field type='email' name='email' />
                <ErrorMessage name='email' component='div' />
                <Field type='password' name='password' />
                <ErrorMessage name='password' component='div' />
                {isSubmitting ? 'y' : 'n'}
                <button type='submit' disabled={isSubmitting}> Submit </button>
              </Form>
            )}

          </Formik>

        </TpSection>

      </>
    )
  }
}

export default Practice07
