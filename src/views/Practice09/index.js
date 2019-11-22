import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import appModel from '@src/models/app'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Practice09 extends React.Component {
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
  // handleLogin = (values, { setSubmitting }) => {
  //   // setSubmitting(true)
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2))
  //     setSubmitting(false)
  //   }, 1000)
  // }

  handleLogin = async values => {
    // 1. 單獨呼叫 api => api (呼叫中await擋得住)
    // const resp = await api.getContacts({ contactId: 'wahaha' })
    // console.log('%c resp ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', resp)

    // 2. 共用呼叫 api + 資料整理 => async action  (呼叫中await擋得住)
    // const { payload: resp } = await this.props.loadContacts({ contactId: 'wahaha' })
    // console.log('%c resp ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', resp)

    // 3. 共用呼叫 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋得住)
    const { id, pcode } = values
    this.props.login({ id, pcode })

    // 4. 共用呼叫 action 觸發 saga 去處理 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋不住!!!)
    // await this.props.loadAndSetContactsComplex({ contactId: 'wahaha' })

    // await new Promise(resolve => setTimeout(resolve, 500))
    // alert(JSON.stringify(values, null, 2))
  }

  handleLogout = () => {
    this.props.logout()
  }

  render () {
    const { isLogin } = this.props
    return (
      <>
        <h1> 表單驗證 </h1>
        <p className='desc'>
          熟悉 FORMIK 操作方式，對目前的表單進行驗證，如驗證通過請將數值 alert 顯示。。
        </p>

        <TpSection>

          {isLogin
            // ==== 已登入 ====
            ? <button type='button' onClick={this.handleLogout}> Logout </button>
            // ==== 未登入 ====
            : (
              <Formik
                initialValues={{ id: 'CHRIS', pcode: '' }}
                validate={this.validate}
                onSubmit={this.handleLogin}
              >

                {({ isSubmitting }) => (
                  <Form>
                    <Field type='text' name='id' />
                    <ErrorMessage name='id' component='div' />
                    <Field type='password' name='pcode' />
                    <ErrorMessage name='pcode' component='div' />
                    {isSubmitting ? 'y' : 'n'}
                    <button type='submit' disabled={isSubmitting}> Submit </button>
                  </Form>
                )}

              </Formik>
            )}

        </TpSection>

      </>
    )
  }
}

Practice09.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  isLogin: PropTypes.bool
}

const mapStateToProps = state => ({
  isLogin: get(state, 'app.isLogin', 0)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: appModel.action.login,
  logout: appModel.action.logout
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice09)
