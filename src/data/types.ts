export type QuestionCheckBoxOption = {
  id: string // 選択肢ID
  label?: string | null // 選択肢ラベル
}

export type AnswerCheckBox = {
  id: string // 選択肢ID
  checked: boolean // 選択肢チェック結果
  comment?: string // 自由入力結果
}

export type Question = {
  id: string
  questionNumber?: string | null // 質問番号
  questionTitle?: string | null // 質問タイトル
  questionSentence: string // 質問文
  qaFormat: QAFormat // 質問フォーマット
  options?: QuestionCheckBoxOption[]
  answer?: Answer | null // 回答
}

export enum QAFormat {
  TEXT = 'TEXT', // フリーテキスト
  DATE = 'DATE', // 日付(yyyyMMdd)
  DATE_YYYY_MM = 'DATE_YYYY_MM', // 月(yyyyMM)
  DATE_YYYY = 'DATE_YYYY', // 年(yyyy)
  NUMBER = 'NUMBER', // 数値
  RADIO = 'RADIO', // ラジオボタン
  CHECKBOX = 'CHECKBOX', // チェックボックス
  GRID = 'GRID', // グリッド
  FILE = 'FILE', // ファイル
}

export type Answer = {
  questionId: string
  textFormat?: string | null // テキストフォーマットの回答
  checkFormat?: AnswerCheckBox[] | null// チェックボックスフォーマットの回答
}