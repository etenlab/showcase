import { styled } from '@mui/material/styles';

export const EmojiWrapper = styled('span')({
  padding: '0px 12px',
  border: '1px solid #fff',
  borderRadius: '12px',
  height: "24px",
  lineHeight: '27px',
  '&:hover': {
    borderColor: '#ccc'
  }
});