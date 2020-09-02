import baseConstant from './development'
let constant = baseConstant

// 僅調整與 development 有差別的部分就好，修改方式如下以 env 為例
constant = { ...constant, env: 'production' }

// 不同建置模式下可使用不同的常數
switch (process.env.MODE) {
  case 'uat':
    // UAT
    constant = { ...constant, apiUrl: 'https://xxx.uat/tw/api/' }
    break
  case 'prod':
    // PRODUCTION
    constant = { ...constant, apiUrl: 'https://react-lab-mock-api.herokuapp.com/api/' }

    break
}

export default constant
