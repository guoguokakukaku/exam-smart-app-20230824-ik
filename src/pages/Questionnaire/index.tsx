import { FC, useEffect, useState } from 'react'
import ESGHeader from '../../components/basic/ESGHeader'
import { ESGPrimeButton } from '../../components/basic/ESGButtons'
import Box from '@mui/material/Box'
import QuestionCard from '../../components/views/QuestionCard'
import { Question } from '../../data/types'
import { API, getQuestionsFromJson } from '../../API'

const Questionnaire: FC = () => {
  const [focusQuestionId, setFocusQuestionId] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    setQuestions(getQuestionsFromJson())
  }, [])

  function submit() {
    const editedAnswer = questions.map((item) => (
      item.answer
    ))

    console.log(JSON.stringify(editedAnswer));

    API.submit(editedAnswer)
  }

  const showQuestionList = () => {
    return questions.map((question, index) => (
      <QuestionCard
        key={index}
        question={question}
        focus={question.id === focusQuestionId}
        onClick={(id: string) => setFocusQuestionId(id)}
      />
    ))
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        minHeight: '100vh',
        pt: '72px',
        bgcolor: '#EEEEEE',
      }}
    >
      <ESGHeader>
        <ESGPrimeButton onClick={() => submit()}>回答を保存</ESGPrimeButton>
      </ESGHeader>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '40px 120px',
          gap: '24px',
        }}
      >
        {showQuestionList()}
      </Box>
    </Box>
  )
}

export default Questionnaire
