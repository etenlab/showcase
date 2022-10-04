import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLanguagesWithRadioBroadcastQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLanguagesWithRadioBroadcastQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_languages_with_radio_broadcast,
            page: query.page,
            totalCount: res.data.uf_languages_with_radio_broadcast_aggregate.aggregate.count
        }
    })
}

export function UfLanguagesWithRadioBroadcast() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Published',
                field: 'published',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Info',
                field: 'info',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Languages With Radio Broadcast</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Languages With Radio Broadcast" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}