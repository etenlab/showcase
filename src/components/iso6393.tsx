import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import {
    iso6393Query, 
    // iso6393NamesQuery,
    // iso6393RetirementsQuery,
    // iso6393MacrolanguagesQuery,
    // progressBibleLanguageDetailsQuery,
    // ufLanguagesQuery,
    // glottologLanguageQuery,
    // buildQuery
} from '../common/query'

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: iso6393Query,

        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.iso_639_3,
            page: query.page,
            totalCount: res.data.iso_639_3_aggregate.aggregate.count
        }
    })
}

const remoteSubData = (rowData: any) => {
    
    // buildQuery(iso6393NamesQuery)

    // var names = client.query({
    //     query: iso6393NamesQuery,
    // });
    // var retirements = client.query({
    //     query: iso6393RetirementsQuery
    // });
    // var macroLanguages = client.query({
    //     query: iso6393MacrolanguagesQuery
    // });
    // var pbLanguagDetails = client.query({
    //     query: progressBibleLanguageDetailsQuery
    // });
    // var ufLanguages = client.query({
    //     query: ufLanguagesQuery
    // });
    // var glottologLanguages = client.query({
    //     query: glottologLanguageQuery
    // });

    return (
        <div>
            <h1>From parent</h1>
        </div>
    );
}

export function Iso6393() {

    // const subDatas = [
    //     'iso_639_3_names',
    //     'iso_639_3_macrolanguages',
    //     'iso_639_3_retirements',
    //     'progress_bible_language_details',
    //     'uf_languages',
    //     'glottolog_language'
    // ];

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
                title: 'Part 1',
                field: 'part_1',
            },
            {
                title: 'Part 2b',
                field: 'part_2b',
            },
            {
                title: 'Part 2t',
                field: 'part_2t',
            },
            {
                title: 'Ref Name',
                field: 'ref_name',
            },
            {
                title: 'Scope',
                field: 'scope',
            },
            {
                title: 'Entry Type',
                field: 'entry_type',
            },
            {
                title: 'Comment',
                field: 'comment',
            },
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639-3</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 3" columns={columns} remoteData={remoteData} remoteSubData={remoteSubData} detailsPanel={true}></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}