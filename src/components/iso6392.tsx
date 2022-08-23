import React, { FormEvent, useState } from 'react';
import { fetchAs } from '../common/utility';
import styled from 'styled-components';

type Iso6392Entry = {
  id: number
  iso_639_2: string
  entry_type: 'B' | 'T'
  iso_639_1: string
  english_name: string
  french_name: string
  german_name: string
};

type ListResponse = {
  error: string
  items: Iso6392Entry[]
};

const StyledWrap = styled.div`
  padding: 20px;
`

const StyledH3 = styled.h3`
  color: cornflowerblue;
`

// const StyledH4 = styled.h4`
//   color: lightcyan;
// `

const DataTable = styled.table`
  padding: 13px;
  margin: 15px;

  table, th, tr, td {
    border: 1px solid cornflowerblue;
    color: pink;
  }
  td {
    padding: 3px;
  }
`;

export function Iso6392() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Iso6392Entry[]>([])

  async function handle_submit(event: FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    const result = await fetchAs<{}, ListResponse>('GET', 8302, `/api/iso-639-2/find-by-iso-639-2/${term}`)

    if (result?.error === 'NoError' && Array.isArray(result?.items)) {
      setResults(result.items)
    } else {
      console.error(result?.error)
    }
  }

  return (
    <StyledWrap>
      <StyledH3>ISO 639-2</StyledH3>
      {/* <StyledH4>Search by 639-2 Identifier</StyledH4> */}
      <form onSubmit={event => handle_submit(event)}>
        <label htmlFor="language-identifier">ISO 639-2 Identifier</label><br/>
        <input type="text" id="language-identifier" onChange={event => setTerm(event.target.value)}></input><br/>
        <button type="submit" value="Search">Search</button>
      </form>
      {
        results.map(value => {
          return <DataTable key={value.id}>
            {/* <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead> */}
            <tbody>
              {
                Object.keys(value).map(key => {
                  return <tr key={key}><td>{key}</td><td>{value[key as keyof typeof value]}</td></tr>
                })
              }
            </tbody>
          </DataTable>
        })
      }
    </StyledWrap>
  );
}