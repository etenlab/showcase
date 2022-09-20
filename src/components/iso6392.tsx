import React from 'react';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import Table from '../common/table'
import { client } from '../common/graphql'

// import { useIso6392Query } from '../generated/graphql';

type Iso6392Entry = {
  id: number
  iso_639_2: string
  entry_type: 'B' | 'T'
  iso_639_1: string
  english_name: string
  french_name: string
  german_name: string
};


const StyledWrap = styled.div`
  padding: 20px;
`

const StyledH3 = styled.h3`
  color: cornflowerblue;
`


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


const GET_ISO_639_1_DATA = gql`
  query MyQuery ($limit: Int, $offset: Int, $search: String) {
    iso_639_3_aggregate (where: {
      _or: [
        {comment: {_ilike: $search}},
        {ref_name: {_ilike: $search}}
      ]
    }) {
      aggregate {
        count
      }
    }
    iso_639_3(limit: $limit, offset: $offset, where: {
        _or: [
          {comment: {_ilike: $search}},
          {ref_name: {_ilike: $search}}
        ]
    }) {
      scope
      ref_name
      part_2t
      part_2b
      part_1
      iso_639_3
      id
      entry_type
      comment
    }
  }
`;

const remoteData = (query: { page: number; search: string; }) => {
  console.log(query.search)
  return client.query({
    query: GET_ISO_639_1_DATA,
    variables: {
      offset: query.page * 25,
      limit: 25,
      search: query.search + "%"
    }
  }).then((res) => {
    console.log(res)
    return {
      data: res.data.iso_639_3,
      page: query.page,
      totalCount: res.data.iso_639_3_aggregate.aggregate.count
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
        title: 'ISO 639_3',
        field: 'iso_639_3',
      },
      {
        title: 'Part 1',
        field: 'part_1',
      },
      {
        title: 'Part 2b',
        field: 'part_2b',
      },
      {
        title: 'Part 2t',
        field: 'part_2t',
      },
      {
        title: 'Ref Name',
        field: 'ref_name',
      },
      {
        title: 'Scope',
        field: 'scope',
      },
      {
        title: 'Entry Type',
        field: 'entry_type',
      },
      {
        title: 'Comment',
        field: 'comment',
      },
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
    <StyledWrap>
      <StyledH3>ISO 639-2</StyledH3>
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
        <Table title="test" columns={columns} remoteData={remoteData} ></Table>
      </div>
    </StyledWrap>
  );
}