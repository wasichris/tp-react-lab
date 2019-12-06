import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import appModel from '@src/models/app'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import * as yup from 'yup'

class Practice08 extends React.Component {
  formSchema = () => yup.object().shape({
    id: yup.string().required(),
    pcode: yup.string().required()
  });

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
        <p className='tp-desc'>
          熟悉 <a target='blank' href='https://redux-saga.js.org/'>saga</a> 操作方式，請配合 appModel (/models/app.js) 中的 authFlowSaga 身分驗證流程實作以下功能，
          登入時透過 /services/api.js 中 login 方法呼叫外部 API 來進行登入。
        </p>
        <ol>
          <li>請先於 appModel 中建立 login action</li>
          <li>呼叫 login action 觸發 loginSaga 執行登入行為 (takeEvery)</li>
          <li>需於 loginSaga 中 call login api 將回應訊息 alert 顯示</li>
          <li>成功登入時，隱藏登入介面，只顯示登出鍵</li>
          <li>點選登出鍵後，隱藏登出鍵，只顯示登入介面</li>
        </ol>

        <TpSection>

          {isLogin
            // ==== 已登入 ====
            ? <button type='button' onClick={this.handleLogout}> 登出 </button>
            // ==== 未登入 ====
            : (
              <>
                <h3>請輸入帳號及密碼進行登入(密碼為111)</h3>
                <Formik
                  initialValues={{ id: 'ThinkPower', pcode: '' }}
                  validationSchema={this.formSchema()}
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
