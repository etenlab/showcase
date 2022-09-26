import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { glottologFamilyQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: glottologFamilyQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.glottolog_family,
            page: query.page,
            totalCount: res.data.glottolog_family_aggregate.aggregate.count
        }
    })
}

export function GlottologFamily() {

    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Top Level Family',
                field: 'top_level_family',
            },
            {
                title: 'Sub Families',
                field: 'sub_families',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Macro Area',
                field: 'macro_area',
            },
            {
                title: 'Level',
                field: 'level',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Glottolog Family</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Glottolog Family" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );

}