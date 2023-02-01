/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useParams } from 'react-router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { aggregationClient } from '../common/graphql';
import { BookFullHeight } from '../common/styles';
import { Comment } from '@material-ui/icons';

// import { TableLoader } from '../tempEilDataTable/index';
import { Discussion } from '@eten-lab/discussion-box';
import { TableLoader } from '@eten-lab/data-table';
import { useQuery } from '@apollo/client';
import { AccountMenu } from '../common/AccountMenu';
import { bookInfoQuery, BookWordStrongsQuery } from '../common/query';

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

export function BookStrongsWords() {
  let { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem('userId') as string;

  const bookInfoResponse = useQuery(bookInfoQuery, {
    client: aggregationClient,
    variables: { bookId: id },
  });

  const doQuery = async (variables: {
    pageSize: number;
    pageNumber: number;
    search: string;
  }) => {
    const query = BookWordStrongsQuery;

    const vars = {
      bookId: id,
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Strong's entries book:{' '}
            {bookInfoResponse.loading
              ? '(loading)'
              : bookInfoResponse.data.book.name}
          </IonTitle>
          <IonButtons slot="primary">
            <AccountMenu />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <BookFullHeight>
          <TableLoader
            columns={fields}
            doQuery={doQuery}
            eager
            loadPageSize={10000}
            detailHandlers={{
              strongsId: {
                endIcon: Comment,
                detailRenderer(row, heightChanged) {
                  return userId == null ? (
                    <div>Login to discuss</div>
                  ) : (
                    <Discussion
                      userId={Number(userId)}
                      rowId={Number(row.strongsWordRelationId)}
                      tableName="relationships"
                    />
                  );
                },
              },
            }}
          ></TableLoader>
        </BookFullHeight>
      </IonContent>
    </IonPage>
  );
}
