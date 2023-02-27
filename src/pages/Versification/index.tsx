import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { buildNodesByNodeTypeQuery } from './graphql';
import { BookListPage } from './BookListPage';
import { BookPage } from './BookPage';
import { Bible, Chapter, Verse, VersificationConfig } from './types';

type VersificationContextType = {
  bibles: Bible[];
  onIdentifierAdd(params: {
    identifier: string;
    config: VersificationConfig;
  }): void;
};

const VersificationContext = createContext<VersificationContextType>(null!);

export function useVersificationContext() {
  return useContext(VersificationContext);
}

export function VersificationPage() {
  const [bibles, setBibles] = useState<Bible[]>([]);

  function handleIdentifierAdd({
    identifier,
    config,
  }: {
    identifier: string;
    config: VersificationConfig;
  }) {
    function addValue(
      propertyKeys: Chapter['propertyKeys'] | Verse['propertyKeys'],
      name: string
    ) {
      return propertyKeys.map((propertyKey) => {
        if (propertyKey.property_key !== name) return propertyKey;

        return {
          ...propertyKey,
          values: [
            ...propertyKey.values,
            {
              property_value: {
                value: identifier,
              },
              upVotes: 0,
              downVotes: 0,
              posts: [],
            },
          ],
        };
      });
    }

    setBibles(
      bibles.map((bible) => {
        if (bible.node_id !== config.bibleId) return bible;

        return {
          ...bible,
          nestedRelationships: bible.nestedRelationships.map((rel) => {
            if (rel.toNode.node_id !== config.bookId) return rel;

            return {
              toNode: {
                ...rel.toNode,
                nestedRelationships: rel.toNode.nestedRelationships.map(
                  (rel) => {
                    if (rel.toNode.node_id !== config.chapterId) return rel;

                    return {
                      toNode: {
                        ...rel.toNode,
                        ...(config.type === 'CHAPTER'
                          ? {
                              propertyKeys: addValue(
                                rel.toNode.propertyKeys,
                                'chapter-identifier'
                              ),
                            }
                          : {
                              nestedRelationships:
                                rel.toNode.nestedRelationships.map((rel) => {
                                  if (rel.toNode.node_id !== config.verseId)
                                    return rel;

                                  return {
                                    toNode: {
                                      ...rel.toNode,
                                      propertyKeys: addValue(
                                        rel.toNode.propertyKeys,
                                        'verse-identifier'
                                      ),
                                    },
                                  };
                                }),
                            }),
                      },
                    };
                  }
                ),
              },
            };
          }),
        };
      })
    );
  }

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_GRAPHQL_URL!, {
        query: buildNodesByNodeTypeQuery('bible'),
      })
      .then((response) => setBibles(response.data.data.nodesByNodeType));
  }, []);

  return (
    <IonRouterOutlet>
      <VersificationContext.Provider
        value={{
          bibles,
          onIdentifierAdd: handleIdentifierAdd,
        }}
      >
        <Route exact path="/versification/bible/:bibleId/book/:bookId">
          <BookPage />
        </Route>
        <Route exact path="/versification">
          <BookListPage />
        </Route>
      </VersificationContext.Provider>
    </IonRouterOutlet>
  );
}
