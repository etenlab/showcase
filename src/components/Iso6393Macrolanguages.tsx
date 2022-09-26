import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { iso6393MacrolanguagesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: iso6393MacrolanguagesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.iso_639_3_macrolanguages,
            page: query.page,
            totalCount: res.data.iso_639_3_macrolanguages_aggregate.aggregate.count
        }
    })
}

export function Iso6393Macrolanguages() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'M ID',
                field: 'm_id',
            },
            {
                title: 'I ID',
                field: 'i_id',
            },
            {
                title: 'I Status',
                field: 'i_status',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639 3 Macrolanguages</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 3 Macrolanguages" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}