import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import api from '@src/services/api'
import demoModel from '@src/models/demo'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Practice08 extends React.Component {
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

  async componentDidMount () {
    // 1. 單獨呼叫 api => api (呼叫中await擋得住)
    const resp = await api.getContacts({ contactId: 'wahaha' })
    console.log('%c resp ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', resp)
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
    // 1. 單獨呼叫 api => api (呼叫中await擋得住)
    // const resp = await api.getContacts({ contactId: 'wahaha' })
    // console.log('%c resp ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', resp)

    // 2. 共用呼叫 api + 資料整理 => async action  (呼叫中await擋得住)
    // const { payload: resp } = await this.props.loadContacts({ contactId: 'wahaha' })
    // console.log('%c resp ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', resp)

    // 3. 共用呼叫 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋得住)
    await this.props.loadAndSetContacts({ contactId: 'wahaha' })

    // 4. 共用呼叫 action 觸發 saga 去處理 api + 資料整理 + 互動寫入 redux => async action  (呼叫中await擋不住!!!)
    // await this.props.loadAndSetContactsComplex({ contactId: 'wahaha' })

    // await new Promise(resolve => setTimeout(resolve, 500))
    // alert(JSON.stringify(values, null, 2))
  }

  render () {
    return (
      <>
        <h1> 使用 saga 完成登入流程 </h1>
        <p className='desc'>
          熟悉 saga 操作方式，成功登入時顯示用戶資訊於畫面中，並註記登入成功，切換畫面的狀態。
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

Practice08.propTypes = {
  // loadContacts: PropTypes.func,
  loadAndSetContacts: PropTypes.func
  // loadAndSetContactsComplex: PropTypes.func
}

const mapStateToProps = state => ({
  counter: get(state, 'demo.counter', 0)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadContacts: demoModel.action.loadContacts,
  loadAndSetContacts: demoModel.action.loadAndSetContacts,
  loadAndSetContactsComplex: demoModel.action.loadAndSetContactsComplex
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice08)
