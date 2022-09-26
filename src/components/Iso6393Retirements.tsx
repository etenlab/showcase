import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { iso6393RetirementsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: iso6393RetirementsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.iso_639_3_retirements,
            page: query.page,
            totalCount: res.data.iso_639_3_retirements_aggregate.aggregate.count
        }
    })
}

export function Iso6393Retirements() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Change To',
                field: 'change_to',
            },
            {
                title: 'Effective',
                field: 'effective',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Ref name',
                field: 'ref_name',
            },
            {
                title: 'Ret Reason',
                field: 'ret_reason',
            },
            {
                title: 'Ret Remedy',
                field: 'ret_remedy',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639 3 Retirements</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 3 Retirements" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}