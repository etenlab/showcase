import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { iso6393NamesQuery } from '../common/query';


const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: iso6393NamesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.iso_639_3_names,
            page: query.page,
            totalCount: res.data.iso_639_3_names_aggregate.aggregate.count
        }
    })
}

export function Iso6393Names() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639_3',
                field: 'iso_639_3',
            },
            {
                title: 'Inverted Name',
                field: 'inverted_name',
            },
            {
                title: 'Print Name',
                field: 'print_name',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639 3 Names</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 3 Names" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}