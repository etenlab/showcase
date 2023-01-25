/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useParams } from 'react-router';
import { IonContent } from '@ionic/react';
import { aggregationClient } from '../common/graphql';
import { StyledH3, StyledWrapFullHeight } from '../common/styles';
import { Comment } from '@material-ui/icons';

// import { TableLoader } from '../tempEilDataTable/index';
import { Discussion } from '@eten-lab/discussion-box';
import { TableLoader } from '@eten-lab/data-table';
import { gql } from '@apollo/client';

// const AGGREGATION_API_URL = process.env.REACT_APP_AGGREGATION_API;

// if (!AGGREGATION_API_URL) {
//   throw new Error('AGGREGATION_API_URL is not defined');
// }

// export const aggregationClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: AGGREGATION_API_URL,
//   }),

//   // Provide some optional constructor fields
//   name: 'react-web-client',
//   version: '1.3',
//   queryDeduplication: false,
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network',
//     },
//   },
// });

type Book = {
  id: string;
  name: string;
  words: Word[];
};

type Word = {
  id: string;
  text: string;
  strongsWordRelationId: string;
  strongsWord?: StrongsWord;
};

type StrongsWord = {
  id: string;
  strongsId: string;
  strongsDef: string;
};

const fields: {
  title: string;
  field: string;
}[] = [
  { field: 'text', title: 'English' },
  { field: 'strongsId', title: "Strong's" },
  { field: 'strongsDef', title: "Strong's entry" },
];

export function StrongsTable() {
  let { bookId } = useParams<{ bookId: string }>();

  const doQuery = async (variables: {
    pageSize: number;
    pageNumber: number;
    search: string;
  }) => {
    const query = BookWordStrongsQuery;

    const vars = {
      bookId,
      pageSize: variables.pageSize,
      pageNumber: variables.pageNumber,
      search: variables.search,
    };

    const response = await aggregationClient.query({ query, variables: vars });

    const words = (response.data.book as Book).words;
    const wordsCount = response.data.book.wordsCount;

    let totalCount = wordsCount;

    let rows = words.map((w) => ({
      id: w.id,
      text: w.text,
      strongsWordRelationId: w.strongsWordRelationId,
      strongsId: w.strongsWord?.strongsId,
      strongsDef: w.strongsWord?.strongsDef,
    }));

    return { totalCount, rows };
  };

  return (
    <IonContent>
      <StyledWrapFullHeight>
        <StyledH3>Strong's entries in a book</StyledH3>
        <TableLoader
          columns={fields}
          doQuery={doQuery}
          eager
          loadPageSize={10000}
          detailHandlers={{
            strongsId: {
              endIcon: Comment,
              detailRenderer(row, heightChanged) {
                return (
                  <Discussion
                    userId={1} // TODO: Manage authorization
                    rowId={Number(row.strongsWordRelationId)}
                    tableName="relationships"
                  />
                );
              },
            },
          }}
        ></TableLoader>
      </StyledWrapFullHeight>
    </IonContent>
  );
}

const BookWordStrongsQuery = gql`
  query Book(
    $bookId: String!
    $search: String!
    $pageNumber: Int!
    $pageSize: Int!
  ) {
    book(id: $bookId) {
      wordsCount(search: $search)
      words(search: $search, pageNumber: $pageNumber, pageSize: $pageSize) {
        id
        text
        strongsWordRelationId
        strongsWord {
          id
          strongsDef
          strongsId
        }
      }
    }
  }
`;
