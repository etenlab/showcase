import { IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { Layout } from './Layout';
import { AddIcon } from './icons';
import { useVersificationContext } from '.';

export function BookListPage() {
  const history = useHistory();
  const { books, onBookAdd } = useVersificationContext();

  return (
    <Layout>
      <div style={{ padding: '0 5px' }}>
        <div className="content-header" style={{ padding: 0 }}>
          <div className="content-title">Bible Books</div>
          <IonButton onClick={onBookAdd}>
            <AddIcon />
          </IonButton>
        </div>
        <div style={{ fontSize: 16 }}>
          {books.map(({ node_id, properties: { name } }, index) => (
            <div
              key={node_id}
              style={{
                cursor: 'pointer',
                padding: '14px 0',
                borderBottom:
                  index === books.length - 1 ? '' : '1px solid #E3EAF3',
              }}
              onClick={() => history.push(`/versification/book/${node_id}`)}
            >
              #{node_id} {name}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
