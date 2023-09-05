import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const ESGPrimeButton = styled(Button)({
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '24px',
  letterSpacing: '0.4px',
  textAlign: 'left',
  border: 0,
  width: '104px',
  height: '40px',
  padding: '8px 16px',
  color: '#FFFFFF',
  backgroundColor: '#35836D',
  boxShadow: '0px 1px 5px 0px #0000001F, 0px 2px 2px 0px #00000024, 0px 3px 1px -2px #00000033',
  '&:hover': {
    backgroundColor: '#35836D',
  },
  '&:active': {
    backgroundColor: '#35836D',
  },
})
