import React from 'react';
import { FormEvent, useState } from 'react';
import { fetchAs } from '../common/utility';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import Table from '../common/table'
import { useIso6392Query } from '../generated/graphql';

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

interface RocketInventory {
  id: number;
}

interface RocketInventoryData {
  iso_639_3: RocketInventory[];
}

interface RocketInventoryVars {
  year: number;
}

const GET_ISO_639_1_DATA = gql`
  query MyQuery {
    iso_639_3 {
      id
      iso_639_3
      part_1
      part_2b
      part_2t
      ref_name
      scope
      entry_type
      comment
    }
  }
`;



export function Iso6392() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Iso6392Entry[]>([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'ISO 639_3',
        accessor: 'iso_639_3',
      },
      {
        Header: 'Part 1',
        accessor: 'part_1',
      },
      {
        Header: 'Part 2b',
        accessor: 'part_2b',
      },
      {
        Header: 'Part 2t',
        accessor: 'part_2t',
      },
      {
        Header: 'Ref Name',
        accessor: 'ref_name',
      },
      {
        Header: 'Scope',
        accessor: 'scope',
      },
      {
        Header: 'Entry Type',
        accessor: 'entry_type',
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
    ],
    []
  )

  const { loading, data } = useQuery<RocketInventoryData, RocketInventoryVars>(
    GET_ISO_639_1_DATA,
    { variables: { year: 2019 } }
  );

  console.log(data?.iso_639_3)

  async function handle_submit(event: FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    console.log(`fetching data: ISO 639-2: ${term}`)

    const result = await fetchAs<{}, ListResponse>('GET', 8302, `/api/iso-639-2/find-by-iso-639-2/${term}`)

    if (result?.error === 'NoError' && Array.isArray(result?.items)) {
      console.log(result.items)
      setResults(result.items)
      return
    } else {
      console.error(result?.error)
    }
    console.error(`Unknown Error`)
  }

  {
    // adding this block just to get named operations working for the graphql code-gen
    const { data, loading, error } = useIso6392Query({

      variables: {
      },
    });
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
      {data && <Table columns={columns} data={data?.iso_639_3}></Table>}

    </StyledWrap>
  );
}