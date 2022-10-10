import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages,
            page: query.page,
            totalCount: res.data.uf_languages_aggregate.aggregate.count
        }
    })
}

export function UfLanguages() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'GW',
                field: 'gw',
            },
            {
                title: 'Gateway Language',
                field: 'gateway_language',
            },
            {
                title: 'Country',
                field: 'country',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Anglicized Name',
                field: 'anglicized_name',
            },
            {
                title: 'Alternate Name',
                field: 'alternate_name',
            },
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Languages</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Languages" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}