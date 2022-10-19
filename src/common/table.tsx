import { Component } from 'react'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';

interface AppProps {
    columns: any,
    title: string,
    detailsPanel?: boolean,
    remoteSubData?: any ,
    // dataLoaded?: boolean,
    remoteData?: (query: any) => any
}

class Table extends Component<AppProps, any>{
    // Use the state and functions returned from useTable to build your UI

    initDetails = false;

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
                    { this.props.detailsPanel ? <MaterialTable
                        columns={this.props.columns}
                        // data={cloneData}
                        title={this.props.title}
                        options={{
                            paging: true,
                            pageSize: 25,
                            pageSizeOptions: [25, 50, 75],
                            detailPanelType: "single"
                        }}
                        data={this.props.remoteData!}
                        detailPanel={(rowData:any) => {
                            console.log("INSIDE TABLE COMPONENT REMOTE SUBDATA");
                            // console.log(this.props.dataLoaded)
                            // if(!this.props.dataLoaded){
                                return this.props.remoteSubData(rowData) || false
                                // }
                            }}
                        // onRowClick={(event, rowData, togglePanel) => togglePanel}
                    /> : <MaterialTable
                    columns={this.props.columns}
                    // data={cloneData}
                    title={this.props.title}
                    options={{
                        paging: true,
                        pageSize: 25,
                        pageSizeOptions: [25, 50, 75]
                    }}
                    data={this.props.remoteData!}                   
                    // onRowClick={(event, rowData, togglePanel) => togglePanel()}
                /> }
                    
                </ThemeProvider>
            </div>
        );
    }
}

export default Table;