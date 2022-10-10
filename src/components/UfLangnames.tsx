import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table';
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufLangnamesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufLangnamesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_langnames,
            page: query.page,
            totalCount: res.data.uf_langnames_aggregate.aggregate.count
        }
    })
}

export function UfLangnames() {
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
                title: 'Name',
                field: 'name',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Lang Names</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Lang Names" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}