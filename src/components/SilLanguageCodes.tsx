import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { silLanguageCodesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: silLanguageCodesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.sil_language_codes,
            page: query.page,
            totalCount: res.data.sil_language_codes_aggregate.aggregate.count
        }
    })
}

export function SilLanguageCodes() {
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
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            },
            {
                title: 'Status',
                field: 'status',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Sil Language Codes</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Sil Language Codes" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}