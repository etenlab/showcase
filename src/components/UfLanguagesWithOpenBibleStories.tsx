import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesWithOpenBibleStoriesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesWithOpenBibleStoriesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages_with_open_bible_stories,
            page: query.page,
            totalCount: res.data.uf_languages_with_open_bible_stories_aggregate.aggregate.count
        }
    })
}


export function UfLanguagesWithOpenBibleStories() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Published',
                field: 'published',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Info',
                field: 'info',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Languages With Open Bible Stories</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Uf Languages With Open Bible Stories" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}