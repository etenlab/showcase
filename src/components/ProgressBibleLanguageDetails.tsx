import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { progressBibleLanguageDetailsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: progressBibleLanguageDetailsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.progress_bible_language_details,
            page: query.page,
            totalCount: res.data.progress_bible_language_details_aggregate.aggregate.count
        }
    })
}

export function ProgressBibleLanguageDetails() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'How To Fix',
                field: 'how_to_fix',
            },
            {
                title: 'Ethnologue Name',
                field: 'ethnologue_name',
            },
            {
                title: 'Code Status',
                field: 'code_status',
            },
            {
                title: 'Is Sign Language',
                field: 'is_sign_language',
            },
            {
                title: 'ISO 639 3 Code',
                field: 'iso_639_3_code',
            },
            {
                title: 'Language Scope',
                field: 'language_scope',
            },
            {
                title: 'Language Status',
                field: 'language_status',
            },
            {
                title: 'Primary Continent',
                field: 'primary_continent',
            },
            {
                title: 'Primary Country Code',
                field: 'primary_country_code',
            },
            {
                title: 'Primary Country Name',
                field: 'primary_country_name',
            },
            {
                title: 'Retired Date',
                field: 'retired_date',
            },
            {
                title: 'Retirement Explanation',
                field: 'retirement_explanation',
            },
            {
                title: 'Show Active Dialect',
                field: 'show_active_dialect',
            },
            {
                title: 'Show Active Language',
                field: 'show_active_language',
            },
            {
                title: 'Show Retired Dialect',
                field: 'show_retired_dialect',
            },
            {
                title: 'Show Retired Language',
                field: 'show_retired_language',
            },
            {
                title: 'Show Sign Language',
                field: 'show_sign_language',
            },
            {
                title: 'Unit Code',
                field: 'unit_code',
            },
            {
                title: 'Unit Full Name',
                field: 'unit_full_name',
            },
            {
                title: 'Unit Name',
                field: 'unit_name',
            },
            {
                title: 'Unit Type',
                field: 'unit_type',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>Progress Bible Language Details</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="Progress Bible Language Details" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}