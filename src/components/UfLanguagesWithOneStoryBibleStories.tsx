import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesWithOneStoryBibleStoriesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesWithOneStoryBibleStoriesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages_with_one_story_bible_stories,
            page: query.page,
            totalCount: res.data.uf_languages_with_one_story_bible_stories_aggregate.aggregate.count
        }
    })
}

export function UfLanguagesWithOneStoryBibleStories() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Info',
                field: 'info',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Languages With One Story Bible Stories</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Uf Languages With One Story Bible Stories" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}