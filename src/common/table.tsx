import { Component } from 'react'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';

interface AppProps {
    columns: any,
    title: string,
    remoteData: (query: any) => any
}

class Table extends Component<AppProps, any>{
    // Use the state and functions returned from useTable to build your UI

    constructor(props: AppProps) {
        super(props);
        this.state = { value: '' };
    }

    render() {
        // const editable = this.props.data.map(o => ({ ...o }));
        const defaultMaterialTheme = createTheme();
        //const cloneData = structuredClone(this.props.data);
        return (
            <div style={{ maxWidth: "100%" }}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                    <MaterialTable
                        columns={this.props.columns}
                        // data={cloneData}
                        title={this.props.title}
                        options={{
                            paging: true,
                            pageSize: 25,
                            pageSizeOptions: [25, 50, 75]
                        }}
                        data={this.props.remoteData}
                        detailPanel={(rowData:any) => {
                            if(rowData.iso_639_3 === "aab"){
                                console.log("rowData")
                                console.log(rowData.iso_639_3)
                                console.log("rowData")
                                return (
                                <div>
                                    <h1>Test</h1>
                                </div>
                                )
                            }
                            else{
                                return false
                            }
                          }}
                        // onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default Table;