import React from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3 } from '../common/styles';
import { gsecListingOfUnreachedPeopleGroupsQuery } from '../common/query';

const remoteData = (query: { page: number; search: string; }) => {
    console.log(query.search)
    return client.query({
        query: gsecListingOfUnreachedPeopleGroupsQuery,
        variables: {
            offset: query.page * 25,
            limit: 25,
            search: query.search + "%"
        }
    }).then((res) => {
        console.log(res)
        return {
            data: res.data.gsec_listing_of_unreached_people_groups,
            page: query.page,
            totalCount: res.data.gsec_listing_of_unreached_people_groups_aggregate.aggregate.count
        }
    })
}

export function GSECListingOfUnreachedPeopleGroups() {
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
                title: 'People Cluster',
                field: 'people_cluster',
            },
            {
                title: 'Continent',
                field: 'continent',
            },
            {
                title: 'Sub Continent',
                field: 'sub_continent',
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
                title: 'People Group',
                field: 'people_group',
            },
            {
                title: 'Global Status Of Evangelical Christianity',
                field: 'global_status_of_evangelical_christianity',
            },
            {
                title: 'Evangelical Engagement',
                field: 'evangelical_engagement',
            },
            {
                title: 'Population',
                field: 'population',
            },
            {
                title: 'Dispersed',
                field: 'dispersed',
            },
            {
                title: 'Rol',
                field: 'rol',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Religion',
                field: 'religion',
            },
            {
                title: 'Nomadic',
                field: 'nomadic',
            },
            {
                title: 'Nomadic Type',
                field: 'nomadic_type',
            },
            {
                title: 'Nomadic Description',
                field: 'nomadic_description',
            },
            {
                title: 'Published Scripture',
                field: 'published_scripture',
            },
            {
                title: 'Jesus Film',
                field: 'jesus_film',
            },
            {
                title: 'Radio Broadcast',
                field: 'radio_broadcast',
            },
            {
                title: 'Gospel Recording',
                field: 'gospel_recording',
            },
            {
                title: 'Audio Scripture',
                field: 'audio_scripture',
            },
            {
                title: 'Gospel Films',
                field: 'gospel_films',
            },
            {
                title: 'The Hope',
                field: 'the_hope',
            },
            {
                title: 'Resources',
                field: 'resources',
            },
            {
                title: 'Physical Exertion',
                field: 'physical_exertion',
            },
            {
                title: 'Freedom Index',
                field: 'freedom_index',
            },
            {
                title: 'Government Restrictions Index',
                field: 'government_restrictions_index',
            },
            {
                title: 'Social Hostilities Index',
                field: 'social_hostilities_index',
            },
            {
                title: 'Threat Level',
                field: 'threat_level',
            },
            {
                title: 'Rop1',
                field: 'rop1',
            },
            {
                title: 'Rop2',
                field: 'rop2',
            },
            {
                title: 'Rop3',
                field: 'rop3',
            },
            {
                title: 'Rop People Name',
                field: 'rop_people_name',
            },
            {
                title: 'Genc',
                field: 'genc',
            },
            {
                title: 'Fips',
                field: 'fips',
            },
            {
                title: 'Fips Of Origin',
                field: 'fips_of_origin',
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
                title: 'IMB Affinity Group',
                field: 'imb_affinity_group',
            },
            {
                title: 'Not Engaged Anywhere',
                field: 'not_engaged_anywhere',
            },
            {
                title: 'SPI',
                field: 'spi',
            },
            {
                title: 'Strategic Priority Index',
                field: 'strategic_priority_index',
            }
        ],
        []
    )

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>GSEC Listing Of Unreached People Groups</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="GSEC Listing Of Unreached People Groups" columns={columns} remoteData={remoteData} ></Table>
                </div>
            </StyledWrap>
        </IonContent>
    );
}