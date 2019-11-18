import { post } from '@src/utils/apiHelper'

export default {
  /** Five stars rate */
  getContacts: (payload) => {
    return post('/survey/getContacts', payload)
  }
}
