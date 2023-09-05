import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { API } from './API'

test('回答保存ボタンを押して、回答を保存するためのパラメータが渡されること', () => {
  // setup
  const submit = jest.spyOn(API, 'submit').mockImplementation((args) => Promise.resolve())

  // when
  render(<App />)

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    const input0 = screen.getAllByRole('textbox', { name: '6a06a83d-7ff9-47bd-91d4-1173097f4e35' })
    input0.forEach((input0) => {
      userEvent.type(input0, 'aaaaa')
    })

    const input1 = screen.getAllByRole('textbox', { name: '3a2091c3-a649-48bf-99d3-09ed9ef8087f' })
    input1.forEach((input1) => {
      userEvent.type(input1, 'bbbbb')
    })

    const input3 = screen.getAllByRole('textbox', { name: '14cd0682-47a0-4da6-84bb-ef1c4e9e6641' })
    input3.forEach((input3) => {
      userEvent.type(input3, '日本語')
    })
  })

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    const checkboxa = screen.getAllByRole('checkbox', { name: 'a' })
    fireEvent.click(checkboxa[0])
    const checkboxb = screen.getAllByRole('checkbox', { name: 'b' })
    fireEvent.click(checkboxb[0])

    const checkboxc = screen.getAllByRole('checkbox', { name: 'c' })
    fireEvent.click(checkboxc[1])
    // fireEvent.click(checkboxa[1])
  })

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    const input0 = screen.getAllByRole('textbox')
    userEvent.type(input0[6], 'cccc')
  })

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    const button = screen.getByText(/回答を保存/i)
    userEvent.click(button)
    // then
    const expected = [
      { questionId: '6a06a83d-7ff9-47bd-91d4-1173097f4e35', textFormat: 'aaaaa' },
      { questionId: '3a2091c3-a649-48bf-99d3-09ed9ef8087f', textFormat: 'bbbbb' },
      { questionId: '387c4a7a-faf9-4626-b20c-0869fc10d754', textFormat: '' },
      { questionId: '14cd0682-47a0-4da6-84bb-ef1c4e9e6641', textFormat: '日本語' },
      { questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1342', textFormat: '' },
      {
        checkFormat: [
          { checked: true, id: 'a' },
          { checked: true, id: 'b' },
          { checked: false, id: 'c' },
        ],
        questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1343',
      },
      {
        checkFormat: [
          { checked: false, id: 'a' },
          { checked: false, id: 'b' },
          { checked: true, id: 'c', comment: 'cccc' },
        ],
        questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1344',
      },
    ] // TODO: 回答を保存するためのパラメータとして期待するオブジェクトを定義してください
    expect(submit).toBeCalledWith(expected)
  })
})

test('回答保存ボタンを押して、回答を保存するためのパラメータが渡されること（初期化のまま送信）', () => {
  // setup
  const submit = jest.spyOn(API, 'submit').mockImplementation((args) => Promise.resolve())

  // when
  render(<App />)
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    const button = screen.getByText(/回答を保存/i)
    userEvent.click(button)

    // then
    const expected = [
      { questionId: '6a06a83d-7ff9-47bd-91d4-1173097f4e35', textFormat: '' },
      { questionId: '3a2091c3-a649-48bf-99d3-09ed9ef8087f', textFormat: '' },
      { questionId: '387c4a7a-faf9-4626-b20c-0869fc10d754', textFormat: '' },
      { questionId: '14cd0682-47a0-4da6-84bb-ef1c4e9e6641', textFormat: '' },
      { questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1342', textFormat: '' },
      {
        checkFormat: [
          { checked: false, id: 'a' },
          { checked: false, id: 'b' },
          { checked: false, id: 'c' },
        ],
        questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1343',
      },
      {
        checkFormat: [
          { checked: false, id: 'a' },
          { checked: false, id: 'b' },
          { checked: false, id: 'c' },
        ],
        questionId: '060fbcc5-c8ee-4447-8cad-d598f05b1344',
      },
    ] // TODO: 回答を保存するためのパラメータとして期待するオブジェクトを定義してください
    expect(submit).toBeCalledWith(expected)
  })
})
