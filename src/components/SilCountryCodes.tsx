import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { silCountryCodesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: silCountryCodesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.sil_country_codes,
            page: query.page,
            totalCount: res.data.sil_country_codes_aggregate.aggregate.count
        }
    })
}

export function SilCountryCodes() {
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
                title: 'Area',
                field: 'area',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Sil Country Codes</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="SIL Country Codes" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}