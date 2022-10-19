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
                                        <td>{res.data.iso_639_3_names[0].id}</td>
                                    </tr>
                                    <tr>
                                        <th>Inverted Name</th>
                                        <td>{res.data.iso_639_3_names[0].inverted_name}</td>
                                    </tr>
                                    <tr>
                                        <th>ISO 639 3</th>
                                        <td>{res.data.iso_639_3_names[0].iso_639_3}</td>
                                    </tr>
                                    <tr>
                                        <th>Print Name</th>
                                        <td>{res.data.iso_639_3_names[0].print_name}</td>
                                    </tr>
                                </table>
                            </div> }
                            {res.data.iso_639_3_retirements.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>ISO 639 3 Retirements</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <td>{res.data.iso_639_3_retirements[0].id}</td>
                                    </tr>
                                    <tr>
                                        <th>Change To</th>
                                        <td>{res.data.iso_639_3_retirements[0].change_to}</td>
                                    </tr>
                                    <tr>
                                        <th>Effective</th>
                                        <td>{res.data.iso_639_3_retirements[0].effective}</td>
                                    </tr>
                                    <tr>
                                        <th>ISO 639 3</th>
                                        <td>{res.data.iso_639_3_retirements[0].iso_639_3}</td>
                                    </tr>
                                    <tr>
                                        <th>Ref Name</th>
                                        <td>{res.data.iso_639_3_retirements[0].ref_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Ret Reason</th>
                                        <td>{res.data.iso_639_3_retirements[0].ret_reason}</td>
                                    </tr>
                                    <tr>
                                        <th>Ret Remedy</th>
                                        <td>{res.data.iso_639_3_retirements[0].ret_remedy}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.progress_bible_language_details.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>ISO 639 3 Retirements</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                    </tr>
                                    <tr>
                                        <th>How To Fix</th>
                                        <td>{res.data.progress_bible_language_details[0].how_to_fix}</td>
                                    </tr>
                                    <tr>
                                        <th>Ethnologue Name</th>
                                        <td>{res.data.progress_bible_language_details[0].ethnologue_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Code Status</th>
                                        <td>{res.data.progress_bible_language_details[0].code_status}</td>
                                    </tr>
                                    <tr>
                                        <th>Is Sign Language</th>
                                        <td>{res.data.progress_bible_language_details[0].is_sign_language}</td>
                                    </tr>
                                    <tr>
                                        <th>ISO 639 3 Code</th>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3_code}</td>
                                    </tr>
                                    <tr>
                                        <th>Language Scope</th>
                                        <td>{res.data.progress_bible_language_details[0].language_scope}</td>
                                    </tr>
                                    <tr>
                                        <th>Language Status</th>
                                        <td>{res.data.progress_bible_language_details[0].language_status}</td>
                                    </tr>
                                    <tr>
                                        <th>Primary Continent</th>
                                        <td>{res.data.progress_bible_language_details[0].primary_continent}</td>
                                    </tr>

                                    <tr>
                                        <th>Primary Country Code</th>
                                        <td>{res.data.progress_bible_language_details[0].primary_country_code}</td>
                                    </tr>
                                    <tr>
                                        <th>Primary Country Name</th>
                                        <td>{res.data.progress_bible_language_details[0].primary_country_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Retired Date</th>
                                        <td>{res.data.progress_bible_language_details[0].retired_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Retirement Explanation</th>
                                        <td>{res.data.progress_bible_language_details[0].retirement_explanation}</td>
                                    </tr>
                                    <tr>
                                        <th>Show Active Dialect</th>
                                        <td>{res.data.progress_bible_language_details[0].show_active_dialect}</td>
                                    </tr>
                                    <tr>
                                        <th>Show Active Language</th>
                                        <td>{res.data.progress_bible_language_details[0].show_active_language}</td>
                                    </tr>
                                    <tr>
                                        <th>Show Retired Dialect</th>
                                        <td>{res.data.progress_bible_language_details[0].show_retired_dialect}</td>
                                    </tr>
                                    <tr>
                                        <th>Show Retired Language</th>
                                        <td>{res.data.progress_bible_language_details[0].show_retired_language}</td>
                                    </tr>
                                    <tr>
                                        <th>Show Sign Language</th>
                                        <td>{res.data.progress_bible_language_details[0].show_sign_language}</td>
                                    </tr>
                                    <tr>
                                        <th>Unit Code</th>
                                        <td>{res.data.progress_bible_language_details[0].unit_code}</td>
                                    </tr>
                                    <tr>
                                        <th>Unit Full Name</th>
                                        <td>{res.data.progress_bible_language_details[0].unit_full_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Unit Name</th>
                                        <td>{res.data.progress_bible_language_details[0].unit_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Unit Type</th>
                                        <td>{res.data.progress_bible_language_details[0].unit_type}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.uf_languages.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>UF Languages</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{res.data.progress_bible_language_details[0].name}</td>
                                    </tr>
                                    <tr>
                                        <th>ISO 639 3</th>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3}</td>
                                    </tr>
                                    <tr>
                                        <th>GW</th>
                                        <td>{res.data.progress_bible_language_details[0].gw}</td>
                                    </tr>
                                    <tr>
                                        <th>Gateway Language</th>
                                        <td>{res.data.progress_bible_language_details[0].gateway_language}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>{res.data.progress_bible_language_details[0].country}</td>
                                    </tr>
                                    <tr>
                                        <th>Code</th>
                                        <td>{res.data.progress_bible_language_details[0].code}</td>
                                    </tr>
                                    <tr>
                                        <th>Anglicized Name</th>
                                        <td>{res.data.progress_bible_language_details[0].anglicized_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Alternate Name</th>
                                        <td>{res.data.progress_bible_language_details[0].alternate_name}</td>
                                    </tr>
                                </table>
                            </div>}
                            {res.data.glottolog_language.length > 0 && <div css={styles.detailsPanelBox}>
                                <h4>Glottolog Languages</h4>
                                <table>
                                    <tr>
                                        <th>ID</th>
                                        <td>{res.data.progress_bible_language_details[0].id}</td>
                                    </tr>
                                    <tr>
                                        <th>Child Dialects</th>
                                        <td>{res.data.progress_bible_language_details[0].child_dialects}</td>
                                    </tr>
                                    <tr>
                                        <th>Glottocode</th>
                                        <td>{res.data.progress_bible_language_details[0].glottocode}</td>
                                    </tr>
                                    <tr>
                                        <th>ISO 639 3</th>
                                        <td>{res.data.progress_bible_language_details[0].iso_639_3}</td>
                                    </tr>
                                    <tr>
                                        <th>Latitude</th>
                                        <td>{res.data.progress_bible_language_details[0].latitude}</td>
                                    </tr>
                                    <tr>
                                        <th>Longitude</th>
                                        <td>{res.data.progress_bible_language_details[0].longitude}</td>
                                    </tr>
                                    <tr>
                                        <th>Macro Area</th>
                                        <td>{res.data.progress_bible_language_details[0].macro_area}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{res.data.progress_bible_language_details[0].name}</td>
                                    </tr>
                                    <tr>
                                        <th>Top Level Family</th>
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

