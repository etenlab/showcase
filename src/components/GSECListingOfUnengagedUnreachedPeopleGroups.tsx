import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { gsecListingOfUnengagedUnreachedPeopleGroupsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: gsecListingOfUnengagedUnreachedPeopleGroupsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.gsec_listing_of_unengaged_unreached_people_groups,
            page: query.page,
            totalCount: res.data.gsec_listing_of_unengaged_unreached_people_groups_aggregate.aggregate.count
        }
    })
}

export function GSECListingOfUnengagedUnreachedPeopleGroups() {
    const columns = React.useMemo(
        () => [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Affinity Bloc',
                field: 'affinity_bloc',
            },
            {
                title: 'Audio Scripture',
                field: 'audio_scripture',
            },
            {
                title: 'Continent',
                field: 'continent',
            },
            {
                title: 'Country',
                field: 'country',
            },
            {
                title: 'Country Of Origin',
                field: 'country_of_origin',
            },
            {
                title: 'Diaspora',
                field: 'diaspora    ',
            },
            {
                title: 'Dispersed',
                field: 'dispersed',
            },
            {
                title: 'Evangelical Engagement',
                field: 'evangelical_engagement',
            },
            {
                title: 'FIPS',
                field: 'fips',
            },
            {
                title: 'FIPS Of Origin',
                field: 'fips_of_origin',
            },
            {
                title: 'Freedom Index',
                field: 'freedom_index',
            },
            {
                title: 'GENC',
                field: 'genc',
            },
            {
                title: 'Global Status Of Evangelical Christianity',
                field: 'global_status_of_evangelical_christianity',
            },
            {
                title: 'Gospel Films',
                field: 'gospel_films',
            },
            {
                title: 'Gospel Recording',
                field: 'gospel_recording',
            },
            {
                title: 'Government Restrictions Index',
                field: 'government_restrictions_index',
            },
            {
                title: 'IMB Affinity Group',
                field: 'imb_affinity_group',
            },
            {
                title: 'Jesus Film',
                field: 'jesus_film',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Latitude',
                field: 'latitude',
            },
            {
                title: 'Longitude',
                field: 'longitude',
            },
            {
                title: 'Nomadic',
                field: 'nomadic',
            },
            {
                title: 'Nomadic Description',
                field: 'nomadic_description',
            },
            {
                title: 'Nomadic Type',
                field: 'nomadic_type',
            },
            {
                title: 'Not Engaged Anywhere',
                field: 'not_engaged_anywhere',
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
                field: 'people_group',
            },
            {
                title: 'People Name',
                field: 'people_name',
            },
            {
                title: 'Physical Exertion',
                field: 'physical_exertion',
            },
            {
                title: 'Population',
                field: 'population',
            },
            {
                title: 'Published Scripture',
                field: 'published_scripture',
            },
            {
                title: 'Radio Broadcast',
                field: 'radio_broadcast',
            },
            {
                title: 'Religion',
                field: 'religion',
            },
            {
                title: 'Resources',
                field: 'resources',
            },
            {
                title: 'ROL',
                field: 'rol',
            },
            {
                title: 'ROP 1',
                field: 'rop1',
            },
            {
                title: 'ROP 2',
                field: 'rop2',
            },
            {
                title: 'ROP 3',
                field: 'rop3',
            },
            {
                title: 'ROP People Name',
                field: 'rop_people_name'
            },
            {
                title: 'ROR',
                field: 'ror'
            },
            {
                title: 'Social Hostilities Index',
                field: 'social_hostilities_index',
            },
            {
                title: 'SPI',
                field: 'spi',
            },
            {
                title: 'Strategic Priority Index',
                field: 'strategic_priority_index',
            },
            {
                title: 'Sub Continent',
                field: 'sub_continent',
            },
            {
                title: 'The Hope',
                field: 'the_hope',
            },
            {
                title: 'Threat Level',
                field: 'threat_level',
            },
            {
                title: 'Written Scripture',
                field: 'written_scripture',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>GSEC Listing Of Unengaged Unreached People Groups</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="GSEC Listing Of Unengaged Unreached People Groups" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}