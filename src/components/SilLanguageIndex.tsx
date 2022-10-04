import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { silLanguageIndexQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: silLanguageIndexQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.sil_language_index,
            page: query.page,
            totalCount: res.data.sil_language_index_aggregate.aggregate.count
        }
    })
}

export function SilLanguageIndex() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Name Type',
                field: 'name_type',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            },
            {
                title: 'Language Code',
                field: 'language_code',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Sil Language Index</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="SIL Language Index" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}