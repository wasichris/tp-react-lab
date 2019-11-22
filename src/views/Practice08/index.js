import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import appModel from '@src/models/app'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Practice08 extends React.Component {
  validate = values => {
    const errors = {}
    if (!values.id) {
      errors.id = 'Required'
    }
    if (!values.pcode) {
      errors.pcode = 'Required'
    }
    return errors
  }

  handleLogin = async values => {
    const { id, pcode } = values
    this.props.login({ id, pcode })
  }

  handleLogout = () => {
    this.props.logout()
  }

  render () {
    const { isLogin } = this.props
    return (
      <>
        <h1> 使用 saga 完成登入流程 </h1>
        <p className='desc'>
          熟悉 saga 操作方式，成功登入時顯示用戶資訊於畫面中，並註記登入成功，切換畫面的狀態。
        </p>

        <TpSection>

          {isLogin
            // ==== 已登入 ====
            ? <button type='button' onClick={this.handleLogout}> 登出 </button>
            // ==== 未登入 ====
            : (
              <>
                <h3>請輸入帳號及密碼進行登入(密碼預設QOO)</h3>
                <Formik
                  initialValues={{ id: 'ThinkPower', pcode: '' }}
                  validate={this.validate}
                  onSubmit={this.handleLogin}
                >

                  {({ isSubmitting }) => (
                    <Form className='tp-form'>

                      <div className='tp-form__row'>
                        <div className='tp-form__label'> 帳號 </div>
                        <div className='tp-form__field'>
                          <Field type='text' name='id' />
                          <ErrorMessage name='id' component='div' className='tp-form__error' />
                        </div>
                      </div>

                      <div className='tp-form__row'>
                        <div className='tp-form__label'> 密碼 </div>
                        <div className='tp-form__field'>
                          <Field type='password' name='pcode' />
                          <ErrorMessage name='pcode' component='div' className='tp-form__error' />
                        </div>
                      </div>

                      <div className='tp-form__row tp-form__row--right'>
                        <button type='submit' disabled={isSubmitting}> 登入 </button>
                      </div>

                    </Form>
                  )}
                </Formik>
              </>
            )}

        </TpSection>

      </>
    )
  }
}

Practice08.propTypes = {
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
)(Practice08)
