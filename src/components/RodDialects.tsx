import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { rodDialectsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: rodDialectsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.rod_dialects,
            page: query.page,
            totalCount: res.data.rod_dialects_aggregate.aggregate.count
        }
    })
}

export function RodDialects() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language Code',
                field: 'language_code',
            },
            {
                title: 'Language Name',
                field: 'language_name',
            },
            {
                title: 'Location Name',
                field: 'location_name',
            },
            {
                title: 'Dialect Name',
                field: 'dialect_name',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Rod Dialects</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Rod Dialects" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}