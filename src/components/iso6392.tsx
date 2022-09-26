import React from 'react';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import Table from '../common/table'
import { client } from '../common/graphql'

import { StyledWrap, StyledH3 } from '../common/styles';
import { iso6392Query } from '../common/query'
import { IonContent } from '@ionic/react';

type Iso6392Entry = {
  id: number
  iso_639_2: string
  entry_type: 'B' | 'T'
  iso_639_1: string
  english_name: string
  french_name: string
  german_name: string
};

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

const remoteData = (query: { page: number; search: string; }) => {
  console.log(query.search)
  return client.query({
    query: iso6392Query,
    variables: {
      offset: query.page * 25,
      limit: 25,
      search: query.search + "%"
    }
  }).then((res) => {
    console.log(res)
    return {
      data: res.data.iso_639_2,
      page: query.page,
      totalCount: res.data.iso_639_2_aggregate.aggregate.count
    }
  })
}

export function Iso6392() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Iso6392Entry[]>([])

  const columns = React.useMemo(
    () => [
      {
        title: 'ID',
        field: 'id',
      },
      {
        title: 'ISO 639 2',
        field: 'iso_639_2',
      },
      {
        title: 'ISO 639 1',
        field: 'iso_639_1',
      },
      {
        title: 'German Name',
        field: 'german_name',
      },
      {
        title: 'French Name',
        field: 'french_name',
      },
      {
        title: 'English Name',
        field: 'english_name',
      },
      {
        title: 'Entry Type',
        field: 'entry_type',
      }
    ],
    []
  )

  async function handle_submit(event: FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    console.log(`fetching data: ISO 639-2: ${term}`)

    // const result = await fetchAs<{}, ListResponse>('GET', 8302, `/api/iso-639-2/find-by-iso-639-2/${term}`)

    // if (result?.error === 'NoError' && Array.isArray(result?.items)) {
    //   console.log(result.items)
    //   setResults(result.items)
    //   return
    // } else {
    //   console.error(result?.error)
    // }
    console.error(`Unknown Error`)
  }

  return (

    <IonContent>
      <StyledWrap>
        <StyledH3>ISO 639 2</StyledH3>
        {/* <StyledH4>Search by 639-2 Identifier</StyledH4> */}
        <form onSubmit={event => handle_submit(event)}>
          <label htmlFor="language-identifier">ISO 639-2 Identifier</label><br />
          <input type="text" id="language-identifier" onChange={event => setTerm(event.target.value)}></input><br />
          <button type="submit" value="Search">Search</button>
        </form>
        {
          results.map(value => {
            return <DataTable key={value.id}>
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

        <div style={{ maxWidth: "100%" }}>
          
          <Table title="ISO 639 2" columns={columns} remoteData={remoteData} ></Table>
          
        </div>
      </StyledWrap>
    </IonContent>
  );
}