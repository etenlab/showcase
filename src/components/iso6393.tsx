/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useState, useEffect, ReactNode } from 'react';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3, StyledTable, styles } from '../common/styles';
import { buildQuery } from '../common/query'

export function Iso6393 () {

    const [loading,setLoading]=useState(false); 
    const [namesHtml,setNamesHtml]=useState<ReactNode>(); 
    const [data,setData]=useState<any>(); 

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
        ],[]
    )

    const remoteData = (query: { page: number; search: string; }) => {
        var gqlQuery = buildQuery({
            tableNames: ["iso_639_3"],
            aggregateTable: "iso_639_3",
            fields: {"iso_639_3":['id', 'iso_639_3', 'part_1', 'part_2b', 'part_2t', 'ref_name', 'scope', 'entry_type', 'comment']},
            filterColumns: ['comment', 'ref_name', 'iso_639_3'],
            filterValue: query.search + "%",
            getRow: false,
            limit: 25,
            offset: query.page * 25
        });    
        return client.query({
            query: gqlQuery
        }).then((res) => {
            console.log(res)
            return {
                data: res.data.iso_639_3,
                page: query.page,
                totalCount: res.data.iso_639_3_aggregate.aggregate.count
            }
        })
    }
    useEffect(() => {
        if(data){
            setLoading(true)
            const iso6393NamesQuery = buildQuery({
                tableNames: ["iso_639_3_names", "iso_639_3_retirements", "progress_bible_language_details", "uf_languages", "glottolog_language"],
                fields: {
                    "iso_639_3_names": ['id', 'inverted_name', 'iso_639_3', 'print_name'],
                    "iso_639_3_retirements": ['id', 'change_to', 'effective', 'iso_639_3', 'ref_name', 'ret_reason', 'ret_remedy'],
                    "progress_bible_language_details": ['id', 'how_to_fix','ethnologue_name','code_status','is_sign_language','iso_639_3_code','language_scope','language_status','primary_continent','primary_country_code','primary_country_name','retired_date','retirement_explanation','show_active_dialect','show_active_language','show_retired_dialect','show_retired_language','show_sign_language','unit_code','unit_full_name','unit_name','unit_type'],
                    "uf_languages": ['id', 'name','iso_639_3','gw','gateway_language','country','code','anglicized_name','alternate_name'],
                    "glottolog_language": ['id', 'child_dialects','glottocode','iso_639_3','latitude','longitude','macro_area','name','top_level_family'],
                }, 
                getRow: true,
                getRowField: {
                    "iso_639_3_names": 'iso_639_3',
                    "iso_639_3_retirements": 'iso_639_3',
                    "progress_bible_language_details": 'iso_639_3_code',
                    "uf_languages": 'iso_639_3',
                    "glottolog_language": 'iso_639_3'
                },
                getRowValue: data.iso_639_3
            });

            client.query({
                query: iso6393NamesQuery,
            }).then((res) => {
                let html: ReactNode


                    html = (
                        <StyledTable>
                            <div className='details-wrapper' css={styles.detailsPanelWrapper}>
                            {res.data.iso_639_3_names.length > 0 && <div css={styles.detailsPanelBox}>
                            
                                <h4>ISO 639 3 Names</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Inverted Name</th>
                                        <th>ISO 639 3</th>
                                        <th>Print Name</th>
                                    </tr>
                                    <tr>
                                        <td>{res.data.iso_639_3_names[0].id}</td>
                                        <td>{res.data.iso_639_3_names[0].inverted_name}</td>
                                        <td>{res.data.iso_639_3_names[0].iso_639_3}</td>
                                        <td>{res.data.iso_639_3_names[0].print_name}</td>
                                    </tr>
                                </table>
                            </div> }
                            {res.data.iso_639_3_retirements.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>ISO 639 3 Retirements</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Change To</th>
                                        <th>Effective</th>
                                        <th>ISO 639 3</th>
                                        <th>Ref Name</th>
                                        <th>Ret Reason</th>
                                        <th>Ret Remedy</th>
                                    </tr>
                                    <tr>
                                        <td>{res.data.iso_639_3_retirements[0].id}</td>
                                        <td>{res.data.iso_639_3_retirements[0].change_to}</td>
                                        <td>{res.data.iso_639_3_retirements[0].effective}</td>
                                        <td>{res.data.iso_639_3_retirements[0].iso_639_3}</td>
                                        <td>{res.data.iso_639_3_retirements[0].ref_name}</td>
                                        <td>{res.data.iso_639_3_retirements[0].ret_reason}</td>
                                        <td>{res.data.iso_639_3_retirements[0].ret_remedy}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.progress_bible_language_details.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>Progress Bible Language Details</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>How To Fix</th>
                                        <th>Ethnologue Name</th>
                                        <th>Code Status</th>
                                        <th>Is Sign Language</th>
                                        <th>ISO 639 3 Code</th>
                                        <th>Language Scope</th>
                                        <th>Language Status</th>
                                        <th>Primary Continent</th>
                                        <th>Primary Country Code</th>
                                        <th>Primary Country Name</th>
                                        <th>Retired Date</th>
                                        <th>Retirement Explanation</th>
                                        <th>Show Active Dialect</th>
                                        <th>Show Active Language</th>
                                        <th>Show Retired Dialect</th>
                                        <th>Show Retired Language</th>
                                        <th>Show Sign Language</th>
                                        <th>Unit Code</th>
                                        <th>Unit Full Name</th>
                                        <th>Unit Name</th>
                                        <th>Unit Type</th>
                                    </tr>
                                    <tr>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                        <td>{res.data.progress_bible_language_details[0].how_to_fix}</td>
                                        <td>{res.data.progress_bible_language_details[0].ethnologue_name}</td>
                                        <td>{res.data.progress_bible_language_details[0].code_status}</td>
                                        <td>{res.data.progress_bible_language_details[0].is_sign_language}</td>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3_code}</td>
                                        <td>{res.data.progress_bible_language_details[0].language_scope}</td>
                                        <td>{res.data.progress_bible_language_details[0].language_status}</td>
                                        <td>{res.data.progress_bible_language_details[0].primary_continent}</td>
                                        <td>{res.data.progress_bible_language_details[0].primary_country_code}</td>
                                        <td>{res.data.progress_bible_language_details[0].primary_country_name}</td>
                                        <td>{res.data.progress_bible_language_details[0].retired_date}</td>
                                        <td>{res.data.progress_bible_language_details[0].retirement_explanation}</td>
                                        <td>{res.data.progress_bible_language_details[0].show_active_dialect}</td>
                                        <td>{res.data.progress_bible_language_details[0].show_active_language}</td>
                                        <td>{res.data.progress_bible_language_details[0].show_retired_dialect}</td>
                                        <td>{res.data.progress_bible_language_details[0].show_retired_language}</td>
                                        <td>{res.data.progress_bible_language_details[0].show_sign_language}</td>
                                        <td>{res.data.progress_bible_language_details[0].unit_code}</td>
                                        <td>{res.data.progress_bible_language_details[0].unit_full_name}</td>
                                        <td>{res.data.progress_bible_language_details[0].unit_name}</td>
                                        <td>{res.data.progress_bible_language_details[0].unit_type}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.uf_languages.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>UF Languages</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>ISO 639 3</th>
                                        <th>GW</th>
                                        <th>Gateway Language</th>
                                        <th>Country</th>
                                        <th>Code</th>
                                        <th>Anglicized Name</th>
                                        <th>Alternate Name</th>
                                    </tr>
                                    <tr>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                        <td>{res.data.progress_bible_language_details[0].name}</td>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3}</td>
                                        <td>{res.data.progress_bible_language_details[0].gw}</td>
                                        <td>{res.data.progress_bible_language_details[0].gateway_language}</td>
                                        <td>{res.data.progress_bible_language_details[0].country}</td>
                                        <td>{res.data.progress_bible_language_details[0].code}</td>
                                        <td>{res.data.progress_bible_language_details[0].anglicized_name}</td>
                                        <td>{res.data.progress_bible_language_details[0].alternate_name}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.glottolog_language.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>Glottolog Languages</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <th>Child Dialects</th>
                                        <th>Glottocode</th>
                                        <th>ISO 639 3</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Macro Area</th>
                                        <th>Name</th>
                                        <th>Top Level Family</th>
                                    </tr>
                                    <tr>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                        <td>{res.data.progress_bible_language_details[0].child_dialects}</td>
                                        <td>{res.data.progress_bible_language_details[0].glottocode}</td>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3}</td>
                                        <td>{res.data.progress_bible_language_details[0].latitude}</td>
                                        <td>{res.data.progress_bible_language_details[0].longitude}</td>
                                        <td>{res.data.progress_bible_language_details[0].macro_area}</td>
                                        <td>{res.data.progress_bible_language_details[0].name}</td>
                                        <td>{res.data.progress_bible_language_details[0].top_level_family}</td>
                                    </tr>
                                </table>
                            </div>}
                            </div>
                        </StyledTable>
                    )
                setNamesHtml(html);
                setLoading(false)
            });
        }
    }, [data]);

    const remoteSubData =  (rowData: any) => {
        setData(rowData)
        if(loading) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        else{
            return (
                <div>{ namesHtml }</div>
            );
        }
    }

    return (
        <IonContent>
            <StyledWrap>
                <StyledH3>ISO 639-3</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title="ISO 639 3" columns={columns}  remoteData={remoteData} remoteSubData={remoteSubData} detailsPanel={true}></Table>
                </div>
            </StyledWrap>
        </IonContent> 
    );  
}

