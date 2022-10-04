import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { rodChangelistQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: rodChangelistQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.rod_changelist,
            page: query.page,
            totalCount: res.data.rod_changelist_aggregate.aggregate.count
        }
    })
}

export function RodChangelist() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Change Type',
                field: 'change_type',
            },
            {
                title: 'Date',
                field: 'date',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            },
            {
                title: 'Explanation',
                field: 'explanation',
            },
            {
                title: 'New Language Code',
                field: 'new_language_code',
            },
            {
                title: 'Prev Language Code',
                field: 'prev_language_code',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Rod Change List</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="RoD Change List" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}