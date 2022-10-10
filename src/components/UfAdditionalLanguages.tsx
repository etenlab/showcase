import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { ufAdditionalLanguagesQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: ufAdditionalLanguagesQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.uf_additional_languages,
            page: query.page,
            totalCount: res.data.uf_additional_languages_aggregate.aggregate.count
        }
    })
}

export function UfAdditionalLanguages() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Two Letter',
                field: 'two_letter',
            },
            {
                title: 'Three Letter',
                field: 'three_letter',
            },
            {
                title: 'Native Name',
                field: 'native_name',
            },
            {
                title: 'IETF Tag',
                field: 'ietf_tag',
            },
            {
                title: 'Direction',
                field: 'direction',
            },
            {
                title: 'Common Name',
                field: 'common_name',
            },
            {
                title: 'Comment',
                field: 'comment',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Uf Additional Languages</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="unfoldingWord Additional Languages" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}