import { gql } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

export const iso6392Query = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_2_aggregate (where: {
            _or: [
            {iso_639_2: {_ilike: $search}},
            {iso_639_1: {_ilike: $search}},
            {german_name: {_ilike: $search}},
            {french_name: {_ilike: $search}},
            {english_name: {_ilike: $search}}
            ]
        }) {
            aggregate {
            count
            }
        }
        iso_639_2(limit: $limit, offset: $offset, where: {
            _or: [
                {iso_639_2: {_ilike: $search}},
                {iso_639_1: {_ilike: $search}},
                {german_name: {_ilike: $search}},
                {french_name: {_ilike: $search}},
                {english_name: {_ilike: $search}}
            ]
        }) {
            iso_639_2
            iso_639_1
            german_name
            french_name
            id
            entry_type
            english_name
        }
    }
`;

export const iso6393Query = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_3_aggregate (where: {
            _or: [
                {comment: {_ilike: $search}},
                {ref_name: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    iso_639_3(limit: $limit, offset: $offset, where: {
            _or: [
                {comment: {_ilike: $search}},
                {ref_name: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}}
            ]
        }) {
            scope
            ref_name
            part_2t
            part_2b
            part_1
            iso_639_3
            id
            entry_type
            comment
        }
    }
`;

export const glottologFamilyQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        glottolog_family_aggregate (where: {
            _or: [
                {name: {_ilike: $search}},
                {macro_area: {_ilike: $search}},
                {level: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    glottolog_family(limit: $limit, offset: $offset, where: {
            _or: [
                {name: {_ilike: $search}},
                {macro_area: {_ilike: $search}},
                {level: {_ilike: $search}}
            ]
        }) {
            top_level_family
            sub_families
            name
            macro_area
            level
            id
        }
    }
`;

export const glottologLanguageQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        glottolog_language_aggregate (where: {
            _or: [
                {glottocode: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {name: {_ilike: $search}},
                {macro_area: {_ilike: $search}},
                {top_level_family: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    glottolog_language(limit: $limit, offset: $offset, where: {
            _or: [
                {glottocode: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {name: {_ilike: $search}},
                {macro_area: {_ilike: $search}},
                {top_level_family: {_ilike: $search}}
            ]
        }) {
            id
            child_dialects
            glottocode
            iso_639_3
            latitude
            longitude
            macro_area
            name
            top_level_family
        }
    }
`;
export const gsecListingOfPeopleGroupsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        gsec_listing_of_people_groups_aggregate (where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {people_name: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    gsec_listing_of_people_groups(limit: $limit, offset: $offset, where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {people_name: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
            id
            affinity_bloc
            audio_scripture
            continent
            country
            country_of_origin
            dispersed
            evangelical_engagement
            fips
            fips_of_origin
            freedom_index
            genc
            global_status_of_evangelical_christianity
            gospel_films
            gospel_recording
            government_restrictions_index
            imb_affinity_group
            jesus_film
            language
            latitude
            longitude
            nomadic
            nomadic_description
            nomadic_type
            not_engaged_anywhere
            peid
            people_cluster
            people_group
            people_name
            physical_exertion
            population
            population_layer
            radio_broadcast
            religion
            resources
            rol
            rop1
            rop2
            rop3
            social_hostilities_index
            spi
            strategic_priority_index
            sub_continent
            the_hope
            threat_level
            written_scripture
        }
    }
`;
export const gsecListingOfUnengagedUnreachedPeopleGroupsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        gsec_listing_of_unengaged_unreached_people_groups_aggregate (where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    gsec_listing_of_unengaged_unreached_people_groups(limit: $limit, offset: $offset, where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
            id
            affinity_bloc
            audio_scripture
            continent
            country
            country_of_origin
            diaspora
            dispersed
            evangelical_engagement
            fips
            fips_of_origin
            freedom_index
            genc
            global_status_of_evangelical_christianity
            gospel_films
            gospel_recording
            government_restrictions_index
            imb_affinity_group
            jesus_film
            language
            latitude
            longitude
            nomadic
            nomadic_description
            nomadic_type
            not_engaged_anywhere
            peid
            people_cluster
            people_group
            physical_exertion
            population
            published_scripture
            radio_broadcast
            resources
            religion
            rol
            rop1
            rop2
            rop3
            rop_people_name
            ror
            social_hostilities_index
            spi
            strategic_priority_index
            sub_continent
            the_hope
            threat_level
        }
    }
`;
export const gsecListingOfUnreachedPeopleGroupsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        gsec_listing_of_unreached_people_groups_aggregate (where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},  
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {strategic_priority_index: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    gsec_listing_of_unreached_people_groups(limit: $limit, offset: $offset, where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},  
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {strategic_priority_index: {_ilike: $search}}
            ]
        }) {
            id,
            peid,
            affinity_bloc,
            people_cluster,
            continent,
            sub_continent,
            country,
            country_of_origin,
            people_group,
            global_status_of_evangelical_christianity,
            evangelical_engagement,
            population,
            dispersed,
            rol,
            language,
            religion,
            nomadic,
            nomadic_type,
            nomadic_description,
            published_scripture,
            jesus_film,
            radio_broadcast,
            gospel_recording,
            audio_scripture,
            gospel_films,
            the_hope,
            resources,
            physical_exertion,
            freedom_index,
            government_restrictions_index,
            social_hostilities_index,
            threat_level,
            rop1,
            rop2,
            rop3,
            rop_people_name,
            genc,
            fips,
            fips_of_origin,
            latitude,
            longitude,
            imb_affinity_group,
            not_engaged_anywhere,
            spi,
            strategic_priority_index
        }
    }
`;
export const gsecListingOfUupg100kQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        gsec_listing_of_uupg_100k_aggregate (where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    gsec_listing_of_uupg_100k(limit: $limit, offset: $offset, where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
            id
            addition
            addition_date
            addition_reasons
            affinity_bloc
            audio_scripture
            continent
            country
            country_of_origin
            dispersed
            fips
            fips_of_origin
            freedom_index
            genc
            global_status_of_evangelical_christianity
            gospel_films
            gospel_recording
            government_restrictions_index
            imb_affinity_group
            jesus_film
            language
            latitude
            longitude
            nomadic
            nomadic_description
            nomadic_type
            not_engaged_anywhere
            peid
            people_cluster
            people_group
            people_name
            physical_exertion
            population
            published_scripture
            radio_broadcast
            religion
            resources
            rol
            rop1
            rop2
            rop3
            social_hostilities_index
            spi
            strategic_priority_index
            sub_continent
            the_hope
            threat_level
        }
    }
`;
export const gsecListingOfUupg100kRemovalsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        gsec_listing_of_uupg_100k_removals_aggregate (where: {
            _or: [
                {addition_reasons: {_ilike: $search}},
                {affinity_bloc: {_ilike: $search}},
                {country: {_ilike: $search}},
                {language: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    gsec_listing_of_uupg_100k_removals(limit: $limit, offset: $offset, where: {
            _or: [
                {addition_reasons: {_ilike: $search}},
                {affinity_bloc: {_ilike: $search}},
                {country: {_ilike: $search}},
                {language: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}}
            ]
        }) {
            id
            addition_date
            addition_reasons
            affinity_bloc
            country
            global_status_of_evangelical_christianity
            language
            peid
            people_cluster
            people_group
            population
            religion
        }
    }
`;

export const iso6393MacrolanguagesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_3_macrolanguages_aggregate (where: {
            _or: [
                {m_id: {_ilike: $search}},
                {i_id: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    iso_639_3_macrolanguages(limit: $limit, offset: $offset, where: {
            _or: [
                {m_id: {_ilike: $search}},
                {i_id: {_ilike: $search}}
            ]
        }) {
            id
            m_id
            i_id
            i_status
        }
    }
`;
export const iso6393NamesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_3_names_aggregate (where: {
            _or: [
                {inverted_name: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {print_name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    iso_639_3_names(limit: $limit, offset: $offset, where: {
            _or: [
                {inverted_name: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {print_name: {_ilike: $search}}
            ]
        }) {
            id
            inverted_name
            iso_639_3
            print_name
        }
    }
`;
export const iso6393RetirementsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_3_retirements_aggregate (where: {
            _or: [
                {change_to: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {ref_name: {_ilike: $search}},
                {ret_remedy: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    iso_639_3_retirements(limit: $limit, offset: $offset, where: {
            _or: [
                {change_to: {_ilike: $search}},
                {iso_639_3: {_ilike: $search}},
                {ref_name: {_ilike: $search}},
                {ret_remedy: {_ilike: $search}}
            ]
        }) {
            id
            change_to
            effective
            iso_639_3
            ref_name
            ret_reason
            ret_remedy
        }
    }
`;
export const iso6395Query = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        iso_639_5_aggregate (where: {
            _or: [
                {iso_639_2: {_ilike: $search}},
                {identifier: {_ilike: $search}},
                {notes: {_ilike: $search}},
                {english_name: {_ilike: $search}},
                {french_name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    iso_639_5(limit: $limit, offset: $offset, where: {
            _or: [
                {iso_639_2: {_ilike: $search}},
                {identifier: {_ilike: $search}},
                {notes: {_ilike: $search}},
                {english_name: {_ilike: $search}},
                {french_name: {_ilike: $search}}
            ]
        }) {
            id
            iso_639_2
            identifier
            notes
            english_name
            french_name
            hierarchy
        }
    }
`;
export const peopleGroupsDataOnlyQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        people_groups_data_only_aggregate (where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    people_groups_data_only(limit: $limit, offset: $offset, where: {
            _or: [
                {affinity_bloc: {_ilike: $search}},
                {continent: {_ilike: $search}},
                {country: {_ilike: $search}},
                {country_of_origin: {_ilike: $search}},
                {imb_affinity_group: {_ilike: $search}},
                {language: {_ilike: $search}},
                {nomadic_description: {_ilike: $search}},
                {people_cluster: {_ilike: $search}},
                {people_group: {_ilike: $search}},
                {religion: {_ilike: $search}},
                {sub_continent: {_ilike: $search}},
                {threat_level: {_ilike: $search}}
            ]
        }) {
            id
            affinity_bloc
            audio_scripture
            continent
            country
            country_of_origin
            dispersed
            evangelical_engagement
            fips
            fips_of_origin
            freedom_index
            genc
            global_status_of_evangelical_christianity
            gospel_films
            gospel_recording
            government_restrictions_index
            imb_affinity_group
            jesus_film
            language
            latitude
            longitude
            nomadic
            nomadic_description
            nomadic_type
            not_engaged_anywhere
            peid
            people_cluster
            people_group
            people_name
            physical_exertion
            population
            population_layer
            radio_broadcast
            religion
            resources
            rol
            rop1
            rop2
            rop3
            social_hostilities_index
            spi
            strategic_priority_index
            sub_continent
            the_hope
            threat_level
            written_scripture
        }
    }
`;
export const progressBibleLanguageDetailsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        progress_bible_language_details_aggregate (where: {
            _or: [
                {ethnologue_name: {_ilike: $search}},
                {primary_continent: {_ilike: $search}},
                {primary_country_code: {_ilike: $search}},
                {primary_country_name: {_ilike: $search}},
                {unit_full_name: {_ilike: $search}},
                {unit_name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    progress_bible_language_details(limit: $limit, offset: $offset, where: {
            _or: [
                {ethnologue_name: {_ilike: $search}},
                {primary_continent: {_ilike: $search}},
                {primary_country_code: {_ilike: $search}},
                {primary_country_name: {_ilike: $search}},
                {unit_full_name: {_ilike: $search}},
                {unit_name: {_ilike: $search}}
            ]
        }) {
            id
            how_to_fix
            ethnologue_name
            code_status
            is_sign_language
            iso_639_3_code
            language_scope
            language_status
            primary_continent
            primary_country_code
            primary_country_name
            retired_date
            retirement_explanation
            show_active_dialect
            show_active_language
            show_retired_dialect
            show_retired_language
            show_sign_language
            unit_code
            unit_full_name
            unit_name
            unit_type
        }
    }
`;
export const rodAlternatenameindexQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        rod_alternatenameindex_aggregate (where: {
            _or: [
                {variant_name: {_ilike: $search}},
                {dialect_code: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    rod_alternatenameindex(limit: $limit, offset: $offset, where: {
            _or: [
                {variant_name: {_ilike: $search}},
                {dialect_code: {_ilike: $search}}
            ]
        }) {
            id
            variant_name
            dialect_code
        }
    }
`;
export const rodChangelistQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        rod_changelist_aggregate (where: {
            _or: [
                {change_type: {_ilike: $search}},
                {dialect_code: {_ilike: $search}},
                {explanation: {_ilike: $search}},
                {new_language_code: {_ilike: $search}},
                {prev_language_code: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    rod_changelist(limit: $limit, offset: $offset, where: {
            _or: [
                {change_type: {_ilike: $search}},
                {dialect_code: {_ilike: $search}},
                {explanation: {_ilike: $search}},
                {new_language_code: {_ilike: $search}},
                {prev_language_code: {_ilike: $search}}
            ]
        }) {
            id
            change_type
            date
            dialect_code
            explanation
            new_language_code
            prev_language_code
        }
    }
`;
export const rodDialectsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        rod_dialects_aggregate (where: {
            _or: [
                {language_code: {_ilike: $search}},
                {language_name: {_ilike: $search}},
                {location_name: {_ilike: $search}},
                {dialect_name: {_ilike: $search}},
                {dialect_code: {_ilike: $search}},
                {country_code: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    rod_dialects(limit: $limit, offset: $offset, where: {
            _or: [
                {language_code: {_ilike: $search}},
                {language_name: {_ilike: $search}},
                {location_name: {_ilike: $search}},
                {dialect_name: {_ilike: $search}},
                {dialect_code: {_ilike: $search}},
                {country_code: {_ilike: $search}}
            ]
        }) {
            id
            language_code
            language_name
            location_name
            dialect_name
            dialect_code
            country_code
        }
    }
`;
export const silCountryCodesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        sil_country_codes_aggregate (where: {
            _or: [
                {code: {_ilike: $search}},
                {area: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    sil_country_codes(limit: $limit, offset: $offset, where: {
            _or: [
                {code: {_ilike: $search}},
                {area: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
            id
            code
            area
            name
        }
    }
`;
export const silLanguageCodesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        sil_language_codes_aggregate (where: {
            _or: [
                {code: {_ilike: $search}},
                {country_code: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    sil_language_codes(limit: $limit, offset: $offset, where: {
            _or: [
                {code: {_ilike: $search}},
                {country_code: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
            id
            code
            country_code
            name
            status
        }
    }
`;
export const silLanguageIndexQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        sil_language_index_aggregate (where: {
            _or: [
                {country_code: {_ilike: $search}},
                {language_code: {_ilike: $search}},
                {name: {_ilike: $search}},
                {name_type: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    sil_language_index(limit: $limit, offset: $offset, where: {
            _or: [
                {country_code: {_ilike: $search}},
                {language_code: {_ilike: $search}},
                {name: {_ilike: $search}},
                {name_type: {_ilike: $search}}
            ]
        }) {
            id
            country_code
            language_code
            name
            name_type
        }
    }
`;
export const ufAdditionalLanguagesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_additional_languages_aggregate (where: {
            _or: [
                {two_letter: {_ilike: $search}},
                {three_letter: {_ilike: $search}},
                {native_name: {_ilike: $search}},
                {ietf_tag: {_ilike: $search}},
                {common_name: {_ilike: $search}},
                {comment: {_ilike: $search}},
                {direction: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_additional_languages(limit: $limit, offset: $offset, where: {
            _or: [
                {two_letter: {_ilike: $search}},
                {three_letter: {_ilike: $search}},
                {native_name: {_ilike: $search}},
                {ietf_tag: {_ilike: $search}},
                {common_name: {_ilike: $search}},
                {comment: {_ilike: $search}},
                {direction: {_ilike: $search}}
            ]
        }) {
            id
            two_letter
            three_letter
            native_name
            ietf_tag
            direction
            common_name
            comment
        }
    }
`;
export const ufCountriesListQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_countries_list_aggregate (where: {
            _or: [
                {code: {_ilike: $search}},
                {alpha_3_code: {_ilike: $search}},
                {name: {_ilike: $search}},
                {region: {_ilike: $search}},
                {wa_region: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_countries_list(limit: $limit, offset: $offset, where: {
            _or: [
                {code: {_ilike: $search}},
                {alpha_3_code: {_ilike: $search}},
                {name: {_ilike: $search}},
                {region: {_ilike: $search}},
                {wa_region: {_ilike: $search}}
            ]
        }) {
            id
            code
            alpha_3_code
            name
            population
            region
            wa_region
        }
    }
`;
export const ufLangnamesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_langnames_aggregate (where: {
            _or: [
                {code: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_langnames(limit: $limit, offset: $offset, where: {
            _or: [
                {code: {_ilike: $search}},
                {name: {_ilike: $search}}
            ]
        }) {
            id
            code
            name
        }
    }
`;
export const ufLanguagesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_aggregate (where: {
            _or: [
                {iso_639_3: {_ilike: $search}},
                {gw: {_ilike: $search}},
                {name: {_ilike: $search}},
                {gateway_language: {_ilike: $search}},
                {alternate_name: {_ilike: $search}},
                {anglicized_name: {_ilike: $search}},
                {code: {_ilike: $search}},
                {country: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages(limit: $limit, offset: $offset, where: {
            _or: [
                {iso_639_3: {_ilike: $search}},
                {gw: {_ilike: $search}},
                {name: {_ilike: $search}},
                {gateway_language: {_ilike: $search}},
                {alternate_name: {_ilike: $search}},
                {anglicized_name: {_ilike: $search}},
                {code: {_ilike: $search}},
                {country: {_ilike: $search}}
            ]
        }) {
            id
            name
            iso_639_3
            gw
            gateway_language
            country
            code
            anglicized_name
            alternate_name
        }
    }
`;
export const ufLanguagesWithBiblePortionsQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_bible_portions_aggregate (where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_bible_portions(limit: $limit, offset: $offset, where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
            id
            info
            language
            media
            published
        }
    }
`;
export const ufLanguagesWithGospelRecordingQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_gospel_recording_aggregate (where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_gospel_recording(limit: $limit, offset: $offset, where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
            id
            info
            language
            media
            published
        }
    }
`;
export const ufLanguagesWithJesusFilmQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_jesus_film_aggregate (where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_jesus_film(limit: $limit, offset: $offset, where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
            id
            info
            language
            media
            published
        }
    }
`;
export const ufLanguagesWithOneStoryBibleStoriesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_one_story_bible_stories_aggregate (where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_one_story_bible_stories(limit: $limit, offset: $offset, where: {
            _or: [
                {info: {_ilike: $search}},
                {language: {_ilike: $search}},
                {media: {_ilike: $search}}
            ]
        }) {
            id
            info
            language
            media
        }
    }
`;
export const ufLanguagesWithOpenBibleStoriesQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_open_bible_stories_aggregate (where: {
            _or: [
                {language: {_ilike: $search}},
                {media: {_ilike: $search}},
                {info: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_open_bible_stories(limit: $limit, offset: $offset, where: {
            _or: [
                {language: {_ilike: $search}},
                {media: {_ilike: $search}},
                {info: {_ilike: $search}}
            ]
        }) {
            published
            media
            language
            info
            id
        }
    }
`;
export const ufLanguagesWithRadioBroadcastQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_languages_with_radio_broadcast_aggregate (where: {
            _or: [
                {media: {_ilike: $search}},
                {language: {_ilike: $search}},
                {info: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_languages_with_radio_broadcast(limit: $limit, offset: $offset, where: {
            _or: [
                {media: {_ilike: $search}},
                {language: {_ilike: $search}},
                {info: {_ilike: $search}}
            ]
        }) {
            published
            media
            language
            info
            id
        }
    }
`;
export const ufNetworksQuery = gql`
    query MyQuery ($limit: Int, $offset: Int, $search: String) {
        uf_networks_aggregate (where: {
            _or: [
                {countries: {_ilike: $search}},
                {languages: {_ilike: $search}},
                {network: {_ilike: $search}}
            ]
        }) {
        aggregate {
            count
        }
    }
    uf_networks(limit: $limit, offset: $offset, where: {
            _or: [
                {countries: {_ilike: $search}},
                {languages: {_ilike: $search}},
                {network: {_ilike: $search}}
            ]
        }) {
            countries
            id
            languages
            network
        }
    }
`;

interface tableFields{
    [key: string]: string[]
}
interface rowFields{
    [key: string]: string
}

export interface RequestArgs {
    tableNames: string[],
    aggregateTable?: string,
    fields: tableFields,
    limit?: number,
    offset?: number,
    filterValue?: string,
    filterColumns?: string[],
    getRow?: boolean,
    getRowField?: rowFields,
    getRowValue?: string
};

export function buildQuery(request: RequestArgs){  
    var query = `{"query":{`;
    if(!request.getRow){
        if(request.aggregateTable){
            query+=`"${request.aggregateTable}_aggregate":{`
            if(request.filterValue!=="" && request.filterColumns!.length > 0){
                query+=`"__args":{"where":{"_or":[`
                request.filterColumns!.forEach((fc, index) => {
                    if(index > 0){
                        query+=`,`
                    }
                    query+=`{"${fc}":{"_ilike": "${request.filterValue}"}}`
                })
                query+=`]}},`
            }
            query+=`"aggregate":{"count":"true"}},`  
        }   
    }
    if(request.tableNames.length){
        request.tableNames.forEach((tableName, tblIndex) => {
            if(tblIndex > 0){
                query+=`,`
            }
            query+=`"${tableName}":{`
            if(request.getRow && request.getRowField![tableName]){
                query+=`"__args":{"where":{"${request.getRowField![tableName]}":{"_eq":"${request.getRowValue}"}}},`
            }
            else{
                query+=`"__args":{"limit":${request.limit},"offset":${request.offset},"where":{"_or":[`
                request.filterColumns!.forEach((fc, index) => {
                    if(index > 0){
                        query+=`,`
                    }
                    query+=`{"${fc}":{"_ilike":"${request.filterValue}"}}`
                })
                query+=`]}},`
            }
            if(request.fields[tableName].length){
                request.fields[tableName].forEach((column, index) => {
                    if(index > 0){
                        query+=`, `
                    }
                    query+=`"${column}":"true"`
                })
            }
        query+=`}`
        })
    }
    query+=`}}`
    let jsonObject = JSON.parse(query); 
    var gqlQuery = jsonToGraphQLQuery(jsonObject, { pretty: true })
    return gql`${gqlQuery}`
}