import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufCountriesListQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufCountriesListQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_countries_list,
            page: query.page,
            totalCount: res.data.uf_countries_list_aggregate.aggregate.count
        }
    })
}

export function UfCountriesList() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Alpha 3 Code',
                field: 'alpha_3_code',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Population',
                field: 'population',
            },
            {
                title: 'Region',
                field: 'region',
            },
            {
                title: 'WA Region',
                field: 'wa_region',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Countries List</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Countries List" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}