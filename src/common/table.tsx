import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

interface AppProps {
  columns: any;
  title: string;
  detailsPanel?: boolean;
  remoteSubData?: any;
  // dataLoaded?: boolean,
  remoteData?: (query: any) => any;
}

type AppRouterProps = AppProps & RouteComponentProps;

class Table extends Component<AppRouterProps, any> {
  // Use the state and functions returned from useTable to build your UI

  initDetails = false;

  constructor(props: AppRouterProps) {
    super(props);
    this.state = { value: "" };
  }

  handleRowClick(event: any, rowData: any) {
    const tableName = this.props.location.pathname.slice(6);
    const row = +rowData.id;
    this.props.history.push(`/tab1/discussion/${tableName}/${row}`);
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
          {this.props.detailsPanel ? (
            <MaterialTable
              columns={this.props.columns}
              // data={cloneData}
              title={this.props.title}
              options={{
                paging: true,
                pageSize: 25,
                pageSizeOptions: [25, 50, 75],
                detailPanelType: "single",
              }}
              data={this.props.remoteData!}
              detailPanel={(rowData: any) => {
                console.log("INSIDE TABLE COMPONENT REMOTE SUBDATA");
                // console.log(this.props.dataLoaded)
                // if(!this.props.dataLoaded){
                return this.props.remoteSubData(rowData) || false;
                // }
              }}
              onRowClick={this.handleRowClick.bind(this)}
            />
          ) : (
            <MaterialTable
              columns={this.props.columns}
              // data={cloneData}
              title={this.props.title}
              options={{
                paging: true,
                pageSize: 25,
                pageSizeOptions: [25, 50, 75],
              }}
              data={this.props.remoteData!}
              onRowClick={this.handleRowClick.bind(this)}
            />
          )}
        </ThemeProvider>
      </div>
    );
  }
}

export default withRouter(Table);
