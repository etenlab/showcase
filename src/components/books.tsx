/** @jsxRuntime classic */
/** @jsx jsx */
import { useQuery } from '@apollo/client';
import { jsx } from '@emotion/react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Link, ListItem } from '@mui/material';
import { AccountMenu } from '../common/AccountMenu';
import { aggregationClient } from '../common/graphql';
import { booksQuery } from '../common/query';
import { StyledWrapFullHeight } from '../common/styles';

export function Books() {
  const response = useQuery(booksQuery, {
    client: aggregationClient,
  });

  return (
    <IonPage>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Books</IonTitle>
            <IonButtons slot="primary">
              <AccountMenu />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <StyledWrapFullHeight>
            {response.error && <div>{response.error.message}</div>}
            {response.loading && <div>Loading...</div>}
            {response.data &&
              response.data.books.map((book: any) => (
                <ListItem>
                  <Link key={book.id} href={`/book/${book.id}`}>
                    {book.name}
                  </Link>
                </ListItem>
              ))}
          </StyledWrapFullHeight>
        </IonContent>
      </IonReactRouter>
    </IonPage>
  );
}
