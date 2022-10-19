import styled from 'styled-components';
import { css } from '@emotion/react' 

export const StyledWrap = styled.div`
padding: 60px 20px 60px 20px;
`

export const StyledH3 = styled.h3`
color: cornflowerblue;
`
export const styles = {
    formWrapper: css({
        marginTop: '200px',
        textAlign: 'center'
    }),
    formButton: css({
        width: '100px',
        fontSize: '16px',
        padding: '15px 10px',
        background: 'gray',
        color: '#fff',
        fontWeight: '600'
    }),
    detailsPanelWrapper: css({
        display: 'flex',
    }),
    detailsPanelBox: css({
        padding: '15px'
    })
}

export const StyledTable = styled.table`
  padding: 13px;
  margin: 15px;
  table, th, tr, td {
    border: 1px solid #000;
    color: #000;
  }
  td, th {
    padding: 10px;
  }
`;