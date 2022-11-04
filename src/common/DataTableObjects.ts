interface Field{
    title: string,
    field: string
}

interface DetailsPanel{
    tableNames?: string[],
    getRow?: boolean,
    getRowField?: any
}

interface TablesMetaType{
    [key: string]: {
        title: string,
        fields: Field[],
        searchFields: string[],
        detailsPanel?: DetailsPanel
    }
    
}

export const TablesMeta: TablesMetaType = {
    'iso-639-3': {
        title: 'ISO 639 3',
        fields: [
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
        searchFields: ['comment', 'ref_name', 'iso_639_3'],
        detailsPanel: {
            tableNames: ["iso_639_3_names", "iso_639_3_retirements", "progress_bible_language_details", "uf_languages", "glottolog_language"],
            getRow: true,
            getRowField: {
                "iso_639_3_names": 'iso_639_3',
                "iso_639_3_retirements": 'iso_639_3',
                "progress_bible_language_details": 'iso_639_3_code',
                "uf_languages": 'iso_639_3',
                "glottolog_language": 'iso_639_3'
            },
        }
    },
    'glottolog-family': {
        title: 'Glottolog Family',
        fields: [
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
        searchFields: ['name', 'macro_area', 'level'],
        detailsPanel:{}
    },
    'glottolog-language': {
        title: 'Glottolog Language',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Child Dialects',
                field: 'child_dialects',
            },
            {
                title: 'Glotto Code',
                field: 'glottocode',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
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
                title: 'Macro Area',
                field: 'macro_area',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Top Level Family',
                field: 'top_level_family',
            }
        ],
        searchFields: ['glottocode','iso_639_3','name','macro_area','top_level_family'],
        detailsPanel:{}
    },
    'gsec-listing-of-people-groups': {
        title: 'GSEC Listing Of People Groups',
        fields: [
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
                title: 'Dispersed',
                field: 'dispersed',
            },
            {
                title: 'Evangelical Engagement',
                field: 'evangelical_engagement',
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
                title: 'Population Layer',
                field: 'population_layer',
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
        searchFields: ['affinity_bloc', 'continent', 'country', 'country_of_origin', 'imb_affinity_group', 'language', 'nomadic_description', 'people_cluster', 'people_group', 'people_name', 'sub_continent', 'threat_level'],
        detailsPanel:{}
    },
    'gsec-listing-of-unengaged-unreached-people-groups': {
        title: 'GSEC Listing Of Unengaged Unreached People Groups',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'PEID',
                field: 'peid',
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
                title: 'Rop 1',
                field: 'rop1',
            },
            {
                title: 'Rop 2',
                field: 'rop2',
            },
            {
                title: 'Rop 3',
                field: 'rop3',
            },
            {
                title: 'Rop People Name',
                field: 'rop_people_name',
            },
            {
                title: 'GENC',
                field: 'genc',
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
        searchFields: ['affinity_bloc', 'continent', 'country', 'country_of_origin', 'imb_affinity_group', 'language', 'nomadic_description', 'people_cluster', 'people_group', 'religion', 'sub_continent', 'threat_level'],
        detailsPanel:{}
    },
    'gsec-listing-of-unreached-people-groups': {
        title: 'GSEC Listing Of Unreached People Groups',
        fields: [
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
        searchFields: ['affinity_bloc', 'continent', 'country', 'country_of_origin', 'imb_affinity_group', 'language', 'nomadic_description', 'people_cluster', 'people_group', 'religion', 'sub_continent', 'strategic_priority_index'],
        detailsPanel:{}
    },
    'gsec-listing-of-uupg-100k': {
        title: 'GSEC Listing Of UUPG 100k',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Addition',
                field: 'addition',
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
                title: 'Dispersed',
                field: 'dispersed',
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
            }
        ],
        searchFields: ['affinity_bloc', 'continent', 'country', 'country_of_origin', 'imb_affinity_group', 'language', 'nomadic_description', 'people_cluster', 'people_group', 'religion', 'sub_continent', 'threat_level'],
        detailsPanel:{}
    },
    'gsec-listing-of-uupg-100k-removals': {
        title: 'GSEC Listing Of UUPG 100k Removals',
        fields: [
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
        searchFields: ['addition_reasons', 'affinity_bloc', 'country', 'language', 'people_cluster', 'people_group', 'religion'],
        detailsPanel:{}
    },
    'iso-639-3-macrolanguages': {
        title: 'ISO 639 3 Macrolanguages',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'M ID',
                field: 'm_id',
            },
            {
                title: 'I ID',
                field: 'i_id',
            },
            {
                title: 'I Status',
                field: 'i_status',
            }
        ],
        searchFields: ['m_id','i_id'],
        detailsPanel:{}
    },
    'iso-639-3-names': {
        title: 'ISO 639 3 Names',
        fields: [
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
        searchFields: ['iso_639_3', 'inverted_name', 'print_name'],
        detailsPanel:{}
    },
    'iso-639-3-retirements': {
        title: 'ISO 639 3 Retirements',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Change To',
                field: 'change_to',
            },
            {
                title: 'Effective',
                field: 'effective',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Ref name',
                field: 'ref_name',
            },
            {
                title: 'Ret Reason',
                field: 'ret_reason',
            },
            {
                title: 'Ret Remedy',
                field: 'ret_remedy',
            }
        ],
        searchFields: ['change_to', 'iso_639_3', 'ref_name', 'ret_remedy'],
        detailsPanel:{}
    },
    'iso-639-5': {
        title: 'ISO 639 5',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639_2',
                field: 'iso_639_2',
            },
            {
                title: 'Identifier',
                field: 'identifier',
            },
            {
                title: 'Notes',
                field: 'notes',
            },
            {
                title: 'English Name',
                field: 'english_name',
            },
            {
                title: 'French Name',
                field: 'french_name',
            },
            {
                title: 'Hierarchy',
                field: 'hierarchy',
            }
        ],
        searchFields: ['iso_639_2', 'identifier', 'notes', 'english_name', 'french_name'],
        detailsPanel:{}
    },
    'people-groups-data-only': {
        title: 'People Groups Data Only',
        fields: [
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
                title: 'Population Layer',
                field: 'population_layer',
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
        searchFields: ['affinity_bloc', 'continent', 'country', 'country_of_origin', 'imb_affinity_group', 'language', 'nomadic_description', 'people_cluster', 'people_group', 'religion', 'sub_continent', 'threat_level'],
        detailsPanel:{}
    },
    'progress-bible-language-details': {
        title: 'Progress Bible Language Details',
        fields: [
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
        searchFields: ['ethnologue_name', 'primary_continent', 'primary_country_code', 'primary_country_name', 'unit_full_name', 'unit_name'],
        detailsPanel:{}
    },
    'rod-alternatenameindex': {
        title: 'ROD Alternate Name Index',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Variant Name',
                field: 'variant_name',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            }
        ],
        searchFields: ['variant_name', 'dialect_code'],
        detailsPanel:{}
    },
    'rod-changelist': {
        title: 'ROD Changelist',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Change Type',
                field: 'change_type',
            },
            {
                title: 'Date',
                field: 'date',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            },
            {
                title: 'Explanation',
                field: 'explanation',
            },
            {
                title: 'New Language Code',
                field: 'new_language_code',
            },
            {
                title: 'Prev Language Code',
                field: 'prev_language_code',
            }
        ],
        searchFields: ['change_type', 'dialect_code', 'explanation', 'new_language_code', 'prev_language_code'],
        detailsPanel:{}
    },
    'rod-dialects': {
        title: 'ROD Dialects',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language Code',
                field: 'language_code',
            },
            {
                title: 'Language Name',
                field: 'language_name',
            },
            {
                title: 'Location Name',
                field: 'location_name',
            },
            {
                title: 'Dialect Name',
                field: 'dialect_name',
            },
            {
                title: 'Dialect Code',
                field: 'dialect_code',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            }
        ],
        searchFields: ['language_code', 'language_name', 'location_name', 'dialect_name', 'dialect_code', 'country_code'],
        detailsPanel:{}
    },
    'sil-country-codes': {
        title: 'SIL Country Codes',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Area',
                field: 'area',
            }
        ],
        searchFields: ['code', 'area', 'name'],
        detailsPanel:{}
    },
    'sil-language-codes': {
        title: 'SIL Language Codes',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            },
            {
                title: 'Status',
                field: 'status',
            }
        ],
        searchFields: ['code', 'country_code', 'name'],
        detailsPanel:{}
    },
    'sil-language-index': {
        title: 'SIL Language Index',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Name Type',
                field: 'name_type',
            },
            {
                title: 'Country Code',
                field: 'country_code',
            },
            {
                title: 'Language Code',
                field: 'language_code',
            }
        ],
        searchFields: ['country_code', 'language_code', 'name', 'name_type'],
        detailsPanel:{}
    },
    'uf-additional-languages': {
        title: 'UF Additional Languages',
        fields: [
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
        searchFields: ['two_letter', 'three_letter', 'native_name', 'ietf_tag', 'common_name', 'comment', 'direction'],
        detailsPanel:{}
    },
    'uf-countries-list': {
        title: 'UF Countries List',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Alpha 3 Code',
                field: 'alpha_3_code',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'Population',
                field: 'population',
            },
            {
                title: 'Region',
                field: 'region',
            },
            {
                title: 'WA Region',
                field: 'wa_region',
            }
        ],
        searchFields: ['code', 'alpha_3_code', 'name', 'region', 'wa_region'],
        detailsPanel:{}
    },
    'uf-langnames': {
        title: 'UF Langnames',
        fields: [
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
        searchFields: ['code', 'name'],
        detailsPanel:{}
    },
    'uf-languages': {
        title: 'UF Languages',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'ISO 639 3',
                field: 'iso_639_3',
            },
            {
                title: 'Name',
                field: 'name',
            },
            {
                title: 'GW',
                field: 'gw',
            },
            {
                title: 'Gateway Language',
                field: 'gateway_language',
            },
            {
                title: 'Country',
                field: 'country',
            },
            {
                title: 'Code',
                field: 'code',
            },
            {
                title: 'Anglicized Name',
                field: 'anglicized_name',
            },
            {
                title: 'Alternate Name',
                field: 'alternate_name',
            }
        ],
        searchFields: ['iso_639_3', 'gw', 'name', 'gateway_language', 'alternate_name', 'anglicized_name', 'code', 'country'],
        detailsPanel:{}
    },
    'uf-languages-with-bible-portions': {
        title: 'Uf Languages With Bible Portions',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Published',
                field: 'published',
            },
            {
                title: 'Info',
                field: 'info',
            }
        ],
        searchFields: ['info', 'language', 'media'],
        detailsPanel:{}
    },
    'uf-languages-with-gospel-recording': {
        title: 'Uf Languages With Gospel Recording',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Published',
                field: 'published',
            },
            {
                title: 'Info',
                field: 'info',
            }
        ],
        searchFields: ['language', 'media', 'info'],
        detailsPanel:{}
    },
    'uf-languages-with-jesus-film': {
        title: 'Uf Languages With Jesus Film',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Info',
                field: 'info',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            },
            {
                title: 'Published',
                field: 'published',
            }
        ],
        searchFields: ['language', 'media', 'info'],
        detailsPanel:{}
    },
    'uf-languages-with-one-story-bible-stories': {
        title: 'Uf Languages With One Story Bible Stories',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Info',
                field: 'info',
            },
            {
                title: 'Language',
                field: 'language',
            },
            {
                title: 'Media',
                field: 'media',
            }
        ],
        searchFields: ['language', 'media', 'info'],
        detailsPanel:{}
    },
    'uf-languages-with-open-bible-stories': {
        title: 'Uf Languages With Open Bible Stories',
        fields: [
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
        searchFields: ['language', 'media', 'info'],
        detailsPanel:{}
    },
    'uf-languages-with-radio-broadcast': {
        title: 'Uf Languages With Radio Broadcast',
        fields: [
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
        searchFields: ['language', 'media', 'info'],
        detailsPanel:{}
    },
    'uf-networks': {
        title: 'Uf Networks',
        fields: [
            {
                title: 'ID',
                field: 'id',
            },
            {
                title: 'Network',
                field: 'network',
            },
            {
                title: 'Countries',
                field: 'countries',
            },
            {
                title: 'Languages',
                field: 'languages',
            }
        ],
        searchFields: ['network', 'countries', 'languages'],
        detailsPanel:{}
    }
};

