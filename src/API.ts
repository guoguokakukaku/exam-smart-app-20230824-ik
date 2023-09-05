import Questions from './data/questions1.json'
import { QAFormat, Question } from './data/types'

export const API = {
  /**
   * 回答送信処理を呼び出すダミーメソッドです
   * この課題ではサーバーとの通信を実装しません。
   * */
  submit: async (args: any /* 必要があれば型や変数名を変更してください */) => {
    // 内部の送信処理を書く必要はありません
  },
}

export function getQuestionsFromJson(): Question[] {
  const questions: Question[] = new Array(Questions.length)

  Questions.forEach((element, index) => {
    let q: Question = {
      id: element.id,
      questionNumber: element.questionNumber,
      questionTitle: element.questionTitle,
      questionSentence: element.questionSentence,
      qaFormat: translate(element.qaFormat),
      options: element.options,
      answer: null,
    }
    questions[index] = q
  })

  return questions
}

function translate(type: String) {
  switch (type) {
    case 'TEXT':
      return QAFormat.TEXT
    case 'CHECKBOX':
      return QAFormat.CHECKBOX
    default:
      return QAFormat.TEXT
  }
}
