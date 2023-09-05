import React from 'react'
import { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Input from '@mui/material/Input'
import styled from '@emotion/styled'
import { Answer, QAFormat, Question, QuestionCheckBoxOption, AnswerCheckBox } from '../../data/types'

interface Props {
  question: Question
  focus?: boolean
  onClick: Function
}

const QuestionCard: FC<Props> = (props) => {
  const [inputText, setInputText] = useState('')
  const [inputCheckBoxList, setInputCheckBoxList] = useState<AnswerCheckBox[]>()
  const [commentDisable, setCommentDisable] = useState(true) // ディフォルト入力不可
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (props.question.qaFormat === QAFormat.CHECKBOX) {
      let optionCount = props.question.options ? props.question.options.length : 0
      let answerCheckBoxList = new Array(optionCount)
      props.question.options?.forEach((element, index) => {
        let answerCheckBox: AnswerCheckBox = {
          id: element.id,
          checked: false,
        }
        answerCheckBoxList[index] = answerCheckBox
      })
      setInputCheckBoxList(answerCheckBoxList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const ans: Answer = { questionId: props.question.id }
    if (props.question.qaFormat === QAFormat.TEXT) {
      ans.textFormat = inputText
    }
    if (props.question.qaFormat === QAFormat.CHECKBOX) {
      ans.checkFormat = inputCheckBoxList
    }
    props.question.answer = ans
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, inputCheckBoxList])

  const Counter = () => {
    return (
      <Box
        sx={{
          height: 20,
          marginTop: '-20px',
          marginRight: '14px',
          textAlign: 'right',
          color: validateInputText() ? '#d32f2f' : '#00000099',
        }}
      >
        {`${inputText.length}/2000文字`}
      </Box>
    )
  }

  function validateInputText(): boolean {
    return inputText.length > 2000
  }

  const LinkButton = styled(Button)({
    boxShadow: 'none',
    border: '0',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      boxShadow: 'none',
      border: '0',
    },
    color: '#35836D',
    fontWeight: '700',
    fontSize: '13px',
  })

  // Checkbox Group
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputCheckBoxList) return
    inputCheckBoxList.forEach((item) => {
      if (event.target.name === item.id) {
        item.checked = !item.checked
      }
    })

    setInputCheckBoxList(inputCheckBoxList)
  }

  const handleCommentActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentDisable(!event.target.checked)
    if (!event.target.checked) {
      setComment('')
      if (!inputCheckBoxList) return
      inputCheckBoxList.forEach((item) => {
        if (event.target.name === item.id) {
          item.comment = ''
        }
      })
      setInputCheckBoxList(inputCheckBoxList)
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputCheckBoxList) return
    inputCheckBoxList.forEach((item) => {
      if (event.target.name === item.id) {
        item.comment = event.target.value
      }
    })

    setComment(event.target.value)
    setInputCheckBoxList(inputCheckBoxList)
  }

  const showOptions = (questionId: string, options: QuestionCheckBoxOption[] | undefined) => {
    if (!options) return
    return options?.map((option) =>
      option.label ? (
        <Box
          key={option.id}
          sx={{
            display: 'flex',
            textAlign: 'left',
            margin: 0,
            paddingLeft: '11px',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  '&.Mui-checked': {
                    color: '#35836D',
                  },
                }}
                inputProps={{ 'aria-label': `${option.id}` }}
                name={`${option.id}`}
                onChange={(e) => handleCheckChange(e)}
              />
            }
            label={option.label}
          />
        </Box>
      ) : (
        <Box
          key={option.id}
          sx={{
            display: 'flex',
            textAlign: 'left',
            margin: 0,
            padding: 0,
          }}
        >
          <Checkbox
            sx={{
              '&.Mui-checked': {
                color: '#35836D',
              },
            }}
            inputProps={{ 'aria-label': `${option.id}` }}
            name={`${option.id}`}
            onChange={(e) => {
              handleCheckChange(e)
              handleCommentActiveChange(e)
            }}
          />
          <Input
            sx={{
              width: '100%',
            }}
            disabled={commentDisable}
            placeholder='そのた'
            name={`${option.id}`}
            value={comment}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleCommentChange(event)
            }}
          />
        </Box>
      )
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '1040px',
        minHeight: '259px',
        border: props.focus ? '1px solid #63B19B' : 0,
        borderRadius: '8px',
        opacity: props.focus ? '1' : '0.6',
        boxShadow: props.focus
          ? '0px 1px 14px 0px #0000001F, 0px 5px 8px 0px #00000024, 0px 3px 5px -1px #00000033'
          : '0px 1px 3px 0px #0000001f, 0px 1px 1px 0px #00000024, 0px 2px 1px -1px #00000033',
        background: '#FFFFFF',
        p: '24px',
        gap: '24px',
      }}
      onClick={() => props.onClick(props.question.id)}
    >
      {props.focus && (
        <Box
          sx={{
            width: '1040px',
            marginTop: '-24px',
            marginLeft: '-24px',
            textAlign: 'left',
            boxShadow: '0px -1px 0px 0px #0000001F inset',
            p: '12px 16px 12px 16px',
          }}
        >
          <LinkButton variant='outlined' startIcon={<InsertLinkIcon />}>
            共有リンクを発行
          </LinkButton>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '8px',
        }}
      >
        <Typography
          variant='caption'
          textAlign={'left'}
        >{`${props.question.questionNumber} ${props.question.questionTitle}`}</Typography>
        <Typography variant='h6' textAlign={'left'}>
          {props.question.questionSentence}
        </Typography>
      </Box>

      <Box>
        {props.question.qaFormat === QAFormat.TEXT && (
          <>
            <TextField
              inputProps={{ 'aria-label': props.question.id }}
              error={validateInputText() ? true : false}
              multiline
              rows={3}
              id={props.question.id}
              name={props.question.id}
              label='回答を入力してください'
              helperText={inputText.length > 2000 ? '2000文字以下にしてください' : '　'}
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value)
              }}
              sx={{
                width: '100%',
              }}
            />
            <Counter />
          </>
        )}
        {props.question.qaFormat === QAFormat.CHECKBOX && (
          <div>
            <FormGroup>{showOptions(props.question.id, props.question.options)}</FormGroup>
          </div>
        )}
      </Box>
    </Box>
  )
}

export default QuestionCard
