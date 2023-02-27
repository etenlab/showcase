import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';

import { Layout } from './Layout';
import { useVersificationContext } from '.';

export function BookListPage() {
  const history = useHistory();
  const { bibles } = useVersificationContext();

  return (
    <Layout>
      <div style={{ padding: '0 5px' }}>
        <div className="content-header" style={{ padding: 0 }}>
          <div className="content-title">Bible Books</div>
        </div>
        <div className="divide-y" style={{ fontSize: 16 }}>
          {bibles.map(
            ({ node_id: bibleId, propertyKeys, nestedRelationships }) => {
              const bibleName =
                propertyKeys.find(({ property_key }) => property_key === 'name')
                  ?.values[0]?.property_value.value || 'Bible';

              return (
                <Fragment key={bibleId}>
                  {nestedRelationships.map(
                    ({ toNode: { node_id: bookId, propertyKeys } }, index) => {
                      const bookName =
                        propertyKeys.find(
                          ({ property_key }) => property_key === 'name'
                        )?.values[0]?.property_value.value || 'Book';

                      return (
                        <div
                          key={bookId}
                          style={{
                            cursor: 'pointer',
                            padding: '14px 0',
                          }}
                          onClick={() =>
                            history.push(
                              `/versification/bible/${bibleId}/book/${bookId}`
                            )
                          }
                        >
                          #{bookId} {bibleName}: {bookName}
                        </div>
                      );
                    }
                  )}
                </Fragment>
              );
            }
          )}
        </div>
      </div>
    </Layout>
  );
}
