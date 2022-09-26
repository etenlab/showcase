import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { iso6395Query } from '../common/query';


const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: iso6395Query,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.iso_639_5,
            page: query.page,
            totalCount: res.data.iso_639_5_aggregate.aggregate.count
        }
    })
}


export function Iso6395() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639_2',
                field: 'iso_639_2',
            },
            {
                title: 'Identifier',
                field: 'identifier',
            },
            {
                title: 'Notes',
                field: 'notes',
            },
            {
                title: 'English Name',
                field: 'english_name',
            },
            {
                title: 'French Name',
                field: 'french_name',
            },
            {
                title: 'Hierarchy',
                field: 'hierarchy',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639 5</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 5" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}