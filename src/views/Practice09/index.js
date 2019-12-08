import React from 'react'
import TpSection from '@src/components/TpSection/index'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import strAccountSchema from '@src/utils/validations/strAccountSchema'

class Practice09 extends React.Component {
  constructor (props) {
    super(props)
    this.formik = {}
    this.state = {
      // 是否需要檢核成年年齡
      isCheckAgeRange: true,
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
      // ....
    }, 1000)
  }

  // 表單檢核邏輯
  formSchema = () => yup.object().shape({
    // [必填、小寫英文、不能為 admin 字串]
    account: yup.string().required().concat(strAccountSchema({ title: '帳號' })),
    // [必填]
    name: null,
    // [必填、身分證邏輯]
    id: null,
    // [必填、選擇性檢核需大於18歲邏輯] (相依狀態值)
    age: null,
    // [必填]
    pcode: null,
    // [密碼欄位輸入後才檢核。必填、需與密碼欄位輸入的資訊相同] (相依輸入值)
    pcodeConfirm: null
  });

  handleSwitchAgeRangeChecker = () => {
    this.setState({ ...this.state, isCheckAgeRange: !this.state.isCheckAgeRange })
  }

  handleRegister = async values => {
    const formData = JSON.stringify(values, null, 2)
    console.log('%c formData ', 'background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;', formData)
  }

  render () {
    return (
      <>
        <h1> 表單驗證 </h1>
        <p className='tp-desc'>
          熟悉 <a target='blank' href='https://jaredpalmer.com/formik/'>FORMIK</a>  操作方式，使用 <a target='blank' href='https://github.com/jquense/yup'>Yup</a> 對目前的表單進行驗證，如驗證通過請將數值 alert 顯示。
        </p>
        <ol>
          <li>動態初始表單資料：於 componentDidMount 模擬從 api 取的表單資料，Formik 加註 enableReinitialize 屬性允許初始資料異動時可自動初始表單，顯示新資料於表單中。</li>
          <li>異動資料內容：按下"設定年齡值為18"按鈕時，透過 setFieldValue 方法設定表單中 age 值為 18。</li>
          <li>[帳號]：必填、小寫英文、不能為 admin 字串。</li>
          <li>[姓名]：必填。</li>
          <li>[身分證號]：必填、身分證邏輯，請於 utils/validations/ 建立 strTwIdSchema.js 身分證檢核邏輯。</li>
          <li>[年齡]：必填、選擇性檢核需大於18歲邏輯，請依據 state.isCheckAgeRange 狀態決定是否進行18歲檢核。</li>
          <li>[密碼]：必填。</li>
          <li>[確認密碼]：密碼欄位輸入後才檢核。必填、需與密碼欄位輸入的資訊相同，請使用 yup.string().when() 實作。</li>
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
              const { isSubmitting, values } = formik
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
                    <button type='button'> 設定年齡值為18 </button>
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

export default Practice09
