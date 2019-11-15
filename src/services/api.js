import { post } from '@src/utils/apiHelper'

export default {
  /** Five stars rate */
  survey: (payload) => {
    return post('/survey', payload)
  }
}
