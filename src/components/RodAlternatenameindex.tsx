import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { rodAlternatenameindexQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: rodAlternatenameindexQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.rod_alternatenameindex,
            page: query.page,
            totalCount: res.data.rod_alternatenameindex_aggregate.aggregate.count
        }
    })
}

export function RodAlternatenameindex() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Variant Name',
                field: 'variant_name',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Rod Alternate Name Index</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="RoD Alternate Name Index" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}