import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import * as yup from 'yup'
import strAccountSchema from '@src/utils/validations/strAccountSchema'
// import PropTypes from 'prop-types'

class Practice09 extends React.Component {
  constructor (props) {
    super(props)
    this.formik = {}
    this.state = {
      isCheckAgeRange: false,
      // 初始表單資料
      formInitValues: {
        account: '',
        name: '',
        id: '',
        age: 0,
        pcode: '',
        pcodeConfirm: ''
      }
    }
  }

  componentDidMount () {
    // 模擬呼叫 api 等待資料回應
    this.getUserInfoToFillForm()
  }

  getUserInfoToFillForm = () => {
    setTimeout(() => {
      // 再次初始化表單資料
      this.setState({
        ...this.state,
        formInitValues: {
          account: 'CHRIS',
          name: '圓圈圈',
          id: 'A123456789',
          age: 0,
          pcode: '123',
          pcodeConfirm: '123'
        }
      })
    }, 1000)
  }

  // 表單檢核邏輯
  formSchema = () => yup.object().shape({
    // 複合性自定義檢核
    account: yup.string().required().concat(strAccountSchema({ title: '帳號' })),
    // 簡單檢核條件
    name: yup.string().required(),
    // 簡單檢核條件
    pcode: yup.string().required(),
    // 動態決定檢核條件
    age: this.getAgeSchema(),
    // 與表單內其他值有相依性
    pcodeConfirm: yup.string().when('pcode', (pcode, schema) => {
      return pcode ? schema.oneOf([pcode], '密碼需相同').required() : schema
    })
  });

  getAgeSchema = () => {
    const { isCheckAgeRange } = this.state
    const required = yup.number().required()
    const min = yup.number().min(18)
    return required.concat(isCheckAgeRange ? min : null)
  }

  handleSwitchAgeRangeChecker = () => {
    this.setState({ ...this.state, isCheckAgeRange: !this.state.isCheckAgeRange })
  }

  handleChangeAgeTo18 = setFieldValue => e => {
    setFieldValue('age', 18)
  }

  handleRegister = async values => {
    const formData = JSON.stringify(values, null, 2)
    console.log('%c formData ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', formData)
  }

  render () {
    return (
      <>
        <h1> 表單驗證 </h1>
        <p className='desc'>
          熟悉 FORMIK 操作方式，對目前的表單進行驗證，如驗證通過請將數值 alert 顯示。。
        </p>
        <ol>
          <li>動態初始表單資料：於 componentDidMount 模擬從api取的表單資料，Formik 加註 enableReinitialize 屬性允許初始資料異動時可自動初始表單，顯示新資料於表單中。</li>
          <li>異動資料內容：按下"設定年齡值為18"按鈕時，透過 setFieldValue 方法設定表單中 age 值為 18</li>

        </ol>
        <TpSection>
          <h3>會員註冊</h3>

          <Formik
            initialValues={this.state.formInitValues}
            validationSchema={this.formSchema()}
            onSubmit={this.handleRegister}
            enableReinitialize
          >

            {(formik) => {
              // Formik render methods and props
              // https://jaredpalmer.com/formik/docs/api/formik#formik-render-methods-and-props
              this.formik = formik // 如果需要在此組件外操作 formik 時可以使用
              const { isSubmitting, values, setFieldValue } = formik
              return (
                <Form className='tp-form'>

                  <div className='tp-form__row'>
                    <div className='tp-code'>
                      {values ? JSON.stringify(values, null, 2) : ''}
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 帳號 </div>
                    <div className='tp-form__field'>
                      <Field type='text' name='account' />
                      <ErrorMessage name='account' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 姓名 </div>
                    <div className='tp-form__field'>
                      <Field type='text' name='name' />
                      <ErrorMessage name='name' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 身分證號 </div>
                    <div className='tp-form__field'>
                      <Field type='text' name='id' />
                      <ErrorMessage name='id' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 年齡 </div>
                    <div className='tp-form__field'>
                      <Field type='number' name='age' />
                      <ErrorMessage name='age' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 密碼 </div>
                    <div className='tp-form__field'>
                      <Field type='password' name='pcode' />
                      <ErrorMessage name='pcode' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row'>
                    <div className='tp-form__label'> 確認密碼 </div>
                    <div className='tp-form__field'>
                      <Field type='password' name='pcodeConfirm' />
                      <ErrorMessage name='pcodeConfirm' component='div' className='tp-form__error' />
                    </div>
                  </div>

                  <div className='tp-form__row tp-form__row--right'>
                    <button type='button' onClick={this.handleChangeAgeTo18(setFieldValue)}> 設定年齡值為18 </button>
                    <button type='button' onClick={this.handleSwitchAgeRangeChecker}> 是否檢查年齡區間: {this.state.isCheckAgeRange ? 'Y' : 'N'}  </button>
                  </div>

                  <div className='tp-form__row tp-form__row--right'>
                    <button type='submit' disabled={isSubmitting}> 登入 </button>
                  </div>
                </Form>
              )
            }}

          </Formik>

        </TpSection>

      </>
    )
  }
}

Practice09.propTypes = {
  // setValues: PropTypes.func
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Practice09)
