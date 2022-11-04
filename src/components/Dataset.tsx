/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useEffect, useState, ReactNode, JSXElementConstructor, ReactElement, ReactFragment } from 'react';
import { useParams } from 'react-router';
import { IonContent } from '@ionic/react';
import Table from '../common/table'
import { client } from '../common/graphql'
import { StyledWrap, StyledH3, StyledTable, styles } from '../common/styles';
import { buildQuery } from '../common/query'
import { TablesMeta } from '../common/DataTableObjects';
import { JSX } from '@emotion/react/jsx-runtime';

interface tableFields{
    [key: string]: string[]
}

export function Dataset() {

    const [loading,setLoading]=useState(false); 
    const [namesHtml,setNamesHtml]=useState<ReactNode>(); 
    const [data,setData]=useState<any>(); 

    type ObjectKey = keyof typeof TablesMeta;

    let { table } = useParams<{ table: string }>();
    
    let tableName = table.toString().replaceAll("-","_");
    const tName: ObjectKey = table;
    let tableFields = TablesMeta[tName].fields.map(value => value.field);

    const remoteData = (query: { page: number; search: string; }) => {
        var gqlQuery = buildQuery({
            tableNames: [tableName],
            aggregateTable: tableName,
            fields: {[tableName]: tableFields},
            filterColumns: TablesMeta[tName].searchFields,
            filterValue: query.search + "%",
            getRow: false,
            limit: 25,
            offset: query.page * 25
        });    
        console.log(gqlQuery.loc?.source.body);
        return client.query({
            query: gqlQuery
        }).then((res) => {
            console.log(res)
            return {
                data: res.data[tableName],
                page: query.page,
                totalCount: res.data[tableName+'_aggregate'].aggregate.count
            }
        })
    }

    useEffect(() => {
        console.log("inuseEffect")
        console.log(data)
        if(data){
            if(TablesMeta[tName].detailsPanel){
                setLoading(true)
                let fieldsA: tableFields = {};
                // console.log(TablesMeta[tName].detailsPanel!.tableNames);
                TablesMeta[tName].detailsPanel!.tableNames!.forEach(tbl => {
                    fieldsA[tbl] = TablesMeta[tbl.replaceAll("_","-")].fields.map(value => value.field);
                });
                // console.log(fieldsA);                
                const detailsPanelQuery = buildQuery({
                    tableNames: TablesMeta[tName].detailsPanel!.tableNames!, // ["iso_639_3_names", "iso_639_3_retirements", "progress_bible_language_details", "uf_languages", "glottolog_language"],
                    fields: fieldsA!, 
                    getRow: true,
                    getRowField: TablesMeta[tName].detailsPanel!.getRowField,
                    getRowValue: data[tableName]
                });

                client.query({
                    query: detailsPanelQuery,
                }).then((res) => {
                    let html: ReactNode;
                    // var subDataTables: JSX.Element[];
                    var subDataTables = [];
                    // console.log(TablesMeta[tName].detailsPanel!.tableNames);
                    // console.log(tbl);
                    for (var i = 0; i < TablesMeta[tName].detailsPanel!.tableNames!.length; i++) {
                        if(res.data[TablesMeta[tName].detailsPanel!.tableNames![i]].length > 0){
                            let tableData = res.data[TablesMeta[tName].detailsPanel!.tableNames![i]][0];
                            subDataTables.push(
                                <div css={styles.detailsPanelBox} key={i}>
                                    <h4>{TablesMeta[TablesMeta[tName].detailsPanel!.tableNames![i].replaceAll("_","-")].title}</h4>
                                    <table>
                                        <tr>
                                            { TablesMeta[TablesMeta[tName].detailsPanel!.tableNames![i].replaceAll("_","-")].fields.map(_field => (
                                                <th>{_field.title}</th>
                                            ))} 
                                        </tr>
                                        <tr>
                                            { TablesMeta[TablesMeta[tName].detailsPanel!.tableNames![i].replaceAll("_","-")].fields.map(_field => (
                                                <th>{ tableData[_field.field] }</th>
                                            ))}
                                        </tr>
                                    </table>
                                </div>
                            )
                        }
                    }
                    html = (
                        <StyledTable>
                            <div className='details-wrapper' css={styles.detailsPanelWrapper}>
                                { subDataTables }
                            </div>
                        </StyledTable>
                    );
                    setNamesHtml(html);
                    setLoading(false);
                });
                
            }
        }
    }, [data, tName, tableName]);

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
                <StyledH3>{ TablesMeta[tName].title }</StyledH3>
                <div style={{ maxWidth: "100%" }}>
                    <Table title={ TablesMeta[tName].title } columns={TablesMeta[tName].fields}  remoteData={remoteData} detailsPanel={TablesMeta[tName].detailsPanel?true:false}  remoteSubData={remoteSubData} ></Table>
                </div>
            </StyledWrap>
        </IonContent> 
    );
}