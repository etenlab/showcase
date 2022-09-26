import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { glottologLanguageQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: glottologLanguageQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.glottolog_language,
            page: query.page,
            totalCount: res.data.glottolog_language_aggregate.aggregate.count
        }
    })
}

export function GlottologLanguage() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Child Dialects',
                field: 'child_dialects',
            },
            {
                title: 'Glotto Code',
                field: 'glottocode',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Latitude',
                field: 'latitude',
            },
            {
                title: 'Longitude',
                field: 'longitude',
            },
            {
                title: 'Macro Area',
                field: 'macro_area',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Top Level Family',
                field: 'top_level_family',
            },
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Glottolog Language</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Glottolog Language" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}