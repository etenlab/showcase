import { IonButtons, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles/index.css';
import './styles/rowView.css';
import './styles/columnView.css';
import './styles/lineBreakView.css';

import { Bible, Book, VersificationConfig } from './types';
import { useVersificationContext } from '.';
import { Layout } from './Layout';
import { RowViewIcon, ColumnViewIcon, LineBreakViewIcon } from './icons';
import { Dropdown } from './Dropdown';
import { NodeData } from './NodeData';
import { OriginalLabel } from './OriginalLabel';

const views = [
  { name: 'row', Icon: RowViewIcon, View: RowView },
  { name: 'column', Icon: ColumnViewIcon, View: ColumnView },
  { name: 'lineBreak', Icon: LineBreakViewIcon, View: LineBreakView },
];

export function BookPage() {
  const { bibleId, bookId } = useParams<{ bibleId: string; bookId: string }>();
  const { bibles } = useVersificationContext();
  const bible = bibles.find(({ node_id }) => node_id.toString() === bibleId)!;

  return !bible ? null : <Content bible={bible} bookId={bookId} />;
}

function Content({ bible, bookId }: { bible: Bible; bookId: string }) {
  const bibleName =
    bible.propertyKeys.find(({ property_key }) => property_key === 'name')
      ?.values[0]?.property_value.value || 'Bible';
  const { toNode: book } = bible.nestedRelationships.find(
    ({ toNode: { node_id } }) => node_id.toString() === bookId
  )!;
  const bookName =
    book.propertyKeys.find(({ property_key }) => property_key === 'name')
      ?.values[0]?.property_value.value || 'Book';
  const chapters = book.nestedRelationships.map(({ toNode }) => toNode);
  const [activeViewName, setActiveViewName] = useState(views[0].name);
  const { View } = views.find(({ name }) => name === activeViewName)!;
  const [filteredChapterId, setFilteredChapterId] = useState<null | string>(
    null
  );
  const [filteredVerseId, setFilteredVerseId] = useState<null | string>(null);
  const filteredChapter = filteredChapterId
    ? chapters.find(({ node_id }) => node_id.toString() === filteredChapterId)
    : null;
  const filteredBook = filteredChapterId
    ? {
        ...book,
        nestedRelationships: book.nestedRelationships
          .filter(
            ({ toNode: { node_id } }) =>
              node_id.toString() === filteredChapterId
          )
          .map(({ toNode }) => ({
            toNode: {
              ...toNode,
              nestedRelationships: filteredVerseId
                ? toNode.nestedRelationships.filter(
                    ({ toNode: { node_id } }) =>
                      node_id.toString() === filteredVerseId
                  )
                : toNode.nestedRelationships,
            },
          })),
      }
    : book;

  return (
    <Layout
      backRoute="/versification"
      breadcrumb={`#${book.node_id} ${bibleName}: ${bookName}`}
      headerContent={
        <IonGrid>
          <IonRow>
            <IonCol>
              <Dropdown
                title="# Chapter"
                value={filteredChapterId}
                onChange={(value) => {
                  setFilteredVerseId(null);
                  setFilteredChapterId(value);
                }}
                options={chapters.map(({ node_id, propertyKeys }) => ({
                  value: node_id.toString(),
                  text:
                    propertyKeys.find(
                      ({ property_key }) =>
                        property_key === 'chapter-identifier'
                    )?.values[0].property_value.value || '',
                }))}
              />
            </IonCol>
            <IonCol>
              <Dropdown
                title="# Verse"
                disabled={!filteredChapterId}
                value={filteredVerseId}
                onChange={setFilteredVerseId}
                options={
                  filteredChapter
                    ? filteredChapter.nestedRelationships.map(
                        ({ toNode: { node_id, propertyKeys } }) => ({
                          value: node_id.toString(),

                          text:
                            propertyKeys.find(
                              ({ property_key }) =>
                                property_key === 'verse-identifier'
                            )?.values[0].property_value.value || '',
                        })
                      )
                    : []
                }
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      }
    >
      <div className="content-header">
        <div className="content-title">Versification table</div>
        <IonButtons>
          {views.map(({ name, Icon }) => (
            <IonButton
              key={name}
              fill="clear"
              {...(name === activeViewName
                ? { className: 'active' }
                : { onClick: () => setActiveViewName(name) })}
            >
              <Icon />
            </IonButton>
          ))}
        </IonButtons>
      </div>
      <View bible={bible} book={filteredBook} />
    </Layout>
  );
}

function RowView({ bible, book }: { bible: Bible; book: Book }) {
  return (
    <div className="row-view">
      <div className="row-view-inner">
        <div className="section">
          <div className="section-header">Original</div>
          <div className="section-content">
            {book.nestedRelationships.map(({ toNode: chapter }) => {
              const { propertyKeys, nestedRelationships } = chapter;
              const { node_property_key_id, values } = propertyKeys.find(
                ({ property_key }) => property_key === 'chapter-identifier'
              )!;
              const value = `Ch. ${values[0].property_value.value}`;

              return (
                <Fragment key={chapter.node_id}>
                  <OriginalLabel
                    value={value}
                    config={{
                      type: 'CHAPTER',
                      node_property_key_id,
                      value: values[0].property_value.value,
                      values: values.map(
                        ({ property_value: { value } }) => value
                      ),
                      bibleId: bible.node_id,
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                  {nestedRelationships.map(({ toNode: verse }) => {
                    const { propertyKeys, nestedRelationships } = verse;
                    const { node_property_key_id, values } = propertyKeys.find(
                      ({ property_key }) => property_key === 'verse-identifier'
                    )!;
                    const value = `v${values[0].property_value.value}`;
                    const text = nestedRelationships
                      .map(({ toNode: wordSequence }) =>
                        wordSequence.nestedRelationships
                          .map(
                            ({ toNode: word }) =>
                              word.propertyKeys.find(
                                ({ property_key }) =>
                                  property_key === 'word_name'
                              )!.values[0].property_value.value
                          )
                          .join(' ')
                      )
                      .join(' ');

                    return (
                      <Fragment key={verse.node_id}>
                        <OriginalLabel
                          value={value}
                          config={{
                            type: 'VERSE',
                            node_property_key_id,
                            value: values[0].property_value.value,
                            values: values.map(
                              ({ property_value: { value } }) => value
                            ),
                            bibleId: bible.node_id,
                            bookId: book.node_id,
                            chapterId: chapter.node_id,
                            verseId: verse.node_id,
                          }}
                          style={{ margin: '0 10px' }}
                        />
                        <span>{text}</span>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="section">
          <div className="section-header">Translation</div>
          <div className="section-content">
            {book.nestedRelationships.map(({ toNode: chapter }) => {
              const { propertyKeys, nestedRelationships } = chapter;
              const { node_property_key_id, values } = propertyKeys.find(
                ({ property_key }) => property_key === 'chapter-identifier'
              )!;

              return (
                <Fragment key={chapter.node_id}>
                  {values.map(
                    (
                      { upVotes, downVotes, posts, property_value: { value } },
                      index
                    ) => (
                      <NodeData
                        key={index}
                        inline
                        {...(index && { style: { marginLeft: 20 } })}
                        label={`Ch. ${value}`}
                        upVotes={upVotes}
                        downVotes={downVotes}
                        posts={posts.length}
                        config={{
                          type: 'CHAPTER',
                          node_property_key_id,
                          value: values[0].property_value.value,
                          values: values.map(
                            ({ property_value: { value } }) => value
                          ),
                          bibleId: bible.node_id,
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                        }}
                      />
                    )
                  )}
                  {nestedRelationships.map(({ toNode: verse }) => {
                    const { propertyKeys, nestedRelationships } = verse;
                    const { node_property_key_id, values } = propertyKeys.find(
                      ({ property_key }) => property_key === 'verse-identifier'
                    )!;
                    const text = nestedRelationships
                      .map(({ toNode: wordSequence }) =>
                        wordSequence.nestedRelationships
                          .map(
                            ({ toNode: word }) =>
                              word.propertyKeys.find(
                                ({ property_key }) =>
                                  property_key === 'word_name'
                              )!.values[0].property_value.value
                          )
                          .join(' ')
                      )
                      .join(' ');

                    return (
                      <Fragment key={verse.node_id}>
                        {values.map(
                          (
                            {
                              upVotes,
                              downVotes,
                              posts,
                              property_value: { value },
                            },
                            index
                          ) => (
                            <NodeData
                              key={index}
                              inline
                              style={{ marginLeft: 20 }}
                              label={`v${value}`}
                              upVotes={upVotes}
                              downVotes={downVotes}
                              posts={posts.length}
                              config={{
                                type: 'VERSE',
                                node_property_key_id,
                                value: values[0].property_value.value,
                                values: values.map(
                                  ({ property_value: { value } }) => value
                                ),
                                bibleId: bible.node_id,
                                bookId: book.node_id,
                                chapterId: chapter.node_id,
                                verseId: verse.node_id,
                              }}
                            />
                          )
                        )}
                        <span style={{ marginLeft: 15 }}>{text}</span>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnView({ bible, book }: { bible: Bible; book: Book }) {
  const buildItems = (original = true) => {
    const list: {
      type: 'CHAPTER_NUMBER' | 'VERSE_NUMBER' | 'WORD';
      value: string;
      upVotes?: number;
      downVotes?: number;
      posts?: number;
      config?: VersificationConfig;
    }[] = [];

    for (const { toNode: chapter } of book.nestedRelationships) {
      const { node_id, propertyKeys, nestedRelationships } = chapter;
      const { node_property_key_id, values } = propertyKeys.find(
        ({ property_key }) => property_key === 'chapter-identifier'
      )!;
      const numberSources = original ? [values[0]] : values;

      for (const numberSource of numberSources) {
        const { upVotes, downVotes, posts, property_value } = numberSource;
        const value = `Chapter ${property_value.value}`;

        list.push({
          type: 'CHAPTER_NUMBER' as const,
          value,
          upVotes,
          downVotes,
          posts: posts.length,
          config: {
            type: 'CHAPTER',
            node_property_key_id,
            value: values[0].property_value.value,
            values: values.map(({ property_value: { value } }) => value),
            bibleId: bible.node_id,
            bookId: book.node_id,
            chapterId: node_id,
          },
        });
      }

      for (const { toNode: verse } of nestedRelationships) {
        const { node_id, propertyKeys, nestedRelationships } = verse;
        const { node_property_key_id, values } = propertyKeys.find(
          ({ property_key }) => property_key === 'verse-identifier'
        )!;
        const numberSources = original ? [values[0]] : values;

        for (const numberSource of numberSources) {
          const { upVotes, downVotes, posts, property_value } = numberSource;
          const value = `Verse ${property_value.value}`;

          list.push({
            type: 'VERSE_NUMBER' as const,
            value,
            upVotes,
            downVotes,
            posts: posts.length,
            config: {
              type: 'VERSE',
              node_property_key_id,
              value: values[0].property_value.value,
              values: values.map(({ property_value: { value } }) => value),
              bibleId: bible.node_id,
              bookId: book.node_id,
              chapterId: chapter.node_id,
              verseId: node_id,
            },
          });
        }

        for (const { toNode: wordSequence } of nestedRelationships) {
          const { nestedRelationships } = wordSequence;

          for (const { toNode: word } of nestedRelationships) {
            const { propertyKeys } = word;
            const { values } = propertyKeys.find(
              ({ property_key }) => property_key === 'word_name'
            )!;

            list.push({
              type: 'WORD' as const,
              value: values[0].property_value.value,
            });
          }
        }
      }
    }

    return list;
  };

  const original = buildItems();
  const translation = buildItems(false);
  const numRows = Math.max(original.length, translation.length);

  return (
    <div className="column-view">
      <IonGrid>
        <IonRow className="section-header">
          <IonCol>Original</IonCol>
          <IonCol>Translation</IonCol>
        </IonRow>
        {[...Array(numRows)].map((val, index) => {
          const originalItem = original[index] ? original[index] : null;
          const translationItem = translation[index]
            ? translation[index]
            : null;

          return (
            <IonRow key={index}>
              <IonCol>
                {originalItem && (
                  <>
                    {originalItem.type !== 'WORD' && originalItem.config && (
                      <OriginalLabel
                        value={originalItem.value}
                        config={originalItem.config}
                      />
                    )}
                    {originalItem.type === 'WORD' && originalItem.value}
                  </>
                )}
              </IonCol>
              <IonCol>
                {translationItem && (
                  <>
                    {translationItem.type !== 'WORD' &&
                      translationItem.config && (
                        <NodeData
                          col
                          label={translationItem.value}
                          upVotes={translationItem.upVotes!}
                          downVotes={translationItem.downVotes!}
                          posts={translationItem.posts!}
                          config={translationItem.config}
                        />
                      )}
                    {translationItem.type === 'WORD' && translationItem.value}
                  </>
                )}
              </IonCol>
            </IonRow>
          );
        })}
      </IonGrid>
    </div>
  );
}

function LineBreakView({ bible, book }: { bible: Bible; book: Book }) {
  return (
    <div className="line-break-view">
      <div className="section">
        <div className="section-header">Original</div>
        <div className="section-content space-y-2">
          {book.nestedRelationships.map(({ toNode: chapter }) => {
            const { propertyKeys, nestedRelationships } = chapter;
            const { node_property_key_id, values } = propertyKeys.find(
              ({ property_key }) => property_key === 'chapter-identifier'
            )!;
            const value = `Ch. ${values[0].property_value.value}`;

            return (
              <Fragment key={chapter.node_id}>
                <div>
                  <OriginalLabel
                    value={value}
                    config={{
                      type: 'CHAPTER',
                      node_property_key_id,
                      value: values[0].property_value.value,
                      values: values.map(
                        ({ property_value: { value } }) => value
                      ),
                      bibleId: bible.node_id,
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                </div>
                {nestedRelationships.map(({ toNode: verse }) => {
                  const { propertyKeys, nestedRelationships } = verse;
                  const { node_property_key_id, values } = propertyKeys.find(
                    ({ property_key }) => property_key === 'verse-identifier'
                  )!;
                  const value = `v${values[0].property_value.value}`;
                  const text = nestedRelationships
                    .map(({ toNode: wordSequence }) =>
                      wordSequence.nestedRelationships
                        .map(
                          ({ toNode: word }) =>
                            word.propertyKeys.find(
                              ({ property_key }) => property_key === 'word_name'
                            )!.values[0].property_value.value
                        )
                        .join(' ')
                    )
                    .join(' ');

                  return (
                    <div key={verse.node_id}>
                      <OriginalLabel
                        value={value}
                        config={{
                          type: 'VERSE',
                          node_property_key_id,
                          value: values[0].property_value.value,
                          values: values.map(
                            ({ property_value: { value } }) => value
                          ),
                          bibleId: bible.node_id,
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                          verseId: verse.node_id,
                        }}
                      />
                      <span> {text}</span>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="section">
        <div className="section-header">Translation</div>
        <div className="section-content space-y-2">
          {book.nestedRelationships.map(({ toNode: chapter }) => {
            const { propertyKeys, nestedRelationships } = chapter;
            const { node_property_key_id, values } = propertyKeys.find(
              ({ property_key }) => property_key === 'chapter-identifier'
            )!;

            return (
              <Fragment key={chapter.node_id}>
                {values.map(
                  (
                    { upVotes, downVotes, posts, property_value: { value } },
                    index
                  ) => (
                    <div key={index}>
                      <NodeData
                        inline
                        label={`Ch. ${value}`}
                        upVotes={upVotes}
                        downVotes={downVotes}
                        posts={posts.length}
                        config={{
                          type: 'CHAPTER',
                          node_property_key_id,
                          value: values[0].property_value.value,
                          values: values.map(
                            ({ property_value: { value } }) => value
                          ),
                          bibleId: bible.node_id,
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                        }}
                      />
                    </div>
                  )
                )}
                {nestedRelationships.map(({ toNode: verse }) => {
                  const { propertyKeys, nestedRelationships } = verse;
                  const { node_property_key_id, values } = propertyKeys.find(
                    ({ property_key }) => property_key === 'verse-identifier'
                  )!;
                  const text = nestedRelationships
                    .map(({ toNode: wordSequence }) =>
                      wordSequence.nestedRelationships
                        .map(
                          ({ toNode: word }) =>
                            word.propertyKeys.find(
                              ({ property_key }) => property_key === 'word_name'
                            )!.values[0].property_value.value
                        )
                        .join(' ')
                    )
                    .join(' ');

                  return (
                    <Fragment key={verse.node_id}>
                      {values.map(
                        (
                          {
                            upVotes,
                            downVotes,
                            posts,
                            property_value: { value },
                          },
                          index
                        ) => (
                          <div key={index}>
                            <NodeData
                              inline
                              label={`v${value}`}
                              upVotes={upVotes}
                              downVotes={downVotes}
                              posts={posts.length}
                              config={{
                                type: 'VERSE',
                                node_property_key_id,
                                value: values[0].property_value.value,
                                values: values.map(
                                  ({ property_value: { value } }) => value
                                ),
                                bibleId: bible.node_id,
                                bookId: book.node_id,
                                chapterId: chapter.node_id,
                                verseId: verse.node_id,
                              }}
                            />
                          </div>
                        )
                      )}
                      <div>{text}</div>
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
