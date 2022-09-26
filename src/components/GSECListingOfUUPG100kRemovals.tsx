import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { gsecListingOfUupg100kRemovalsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: gsecListingOfUupg100kRemovalsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.gsec_listing_of_uupg_100k_removals,
            page: query.page,
            totalCount: res.data.gsec_listing_of_uupg_100k_removals_aggregate.aggregate.count
        }
    })
}

export function GSECListingOfUUPG100kRemovals() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Addition Date',
                field: 'addition_date',
            },
            {
                title: 'Addition Reasons',
                field: 'addition_reasons',
            },
            {
                title: 'Affinity Bloc',
                field: 'affinity_bloc',
            },
            {
                title: 'Country',
                field: 'country',
            },
            {
                title: 'Global Status Of Evangelical Christianity',
                field: 'global_status_of_evangelical_christianity',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'PEID',
                field: 'peid',
            },
            {
                title: 'People Cluster',
                field: 'people_cluster',
            },
            {
                title: 'People Group',
                field: 'people_group'
            },
            {
                title: 'Population',
                field: 'population'
            },
            {
                title: 'Religion',
                field: 'religion'
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>GSEC Listing Of UUPG 100k Removals</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="GSEC Listing Of UUPG 100k Removals" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}