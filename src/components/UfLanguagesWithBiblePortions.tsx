import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table';
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesWithBiblePortionsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesWithBiblePortionsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages_with_bible_portions,
            page: query.page,
            totalCount: res.data.uf_languages_with_bible_portions_aggregate.aggregate.count
        }
    })
}

export function UfLanguagesWithBiblePortions() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Published',
                field: 'published',
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
                <StyledH3>Uf Languages With Bible Portions</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Languages With Bible Portions" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}