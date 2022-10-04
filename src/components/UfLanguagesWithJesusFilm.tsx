import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesWithJesusFilmQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesWithJesusFilmQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages_with_jesus_film,
            page: query.page,
            totalCount: res.data.uf_languages_with_jesus_film_aggregate.aggregate.count
        }
    })
}

export function UfLanguagesWithJesusFilm() {
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
            },
            {
                title: 'Published',
                field: 'published',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Languages With Jesus Film</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Languages With Jesus Film" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}