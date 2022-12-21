/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useParams } from 'react-router';
import { IonContent } from '@ionic/react';
import { client } from '../common/graphql';
import { StyledH3, StyledWrapFullHeight } from '../common/styles';
import { buildQuery } from '../common/query';
import { TablesMeta } from '../common/DataTableObjects';
import ForumIcon from '@mui/icons-material/Forum';

// import { TableLoader } from '../tempEilDataTable/index';
import { TableLoader } from '@eten-lab/data-table';

import { Discussion } from '@eten-lab/discussion-box';

const USER_ID_STUB = 1;

export function Dataset() {
  type ObjectKey = keyof typeof TablesMeta;

  let { table } = useParams<{ table: string }>();

  let tableName = table.toString().replaceAll('-', '_');
  const tName: ObjectKey = table;
  let tableFields = TablesMeta[tName].fields.map((value) => value.field);

  const buildQueryFromParams = (query: {
    pageSize: number;
    pageNumber: number;
    search: string;
  }) => {
    var gqlQuery = buildQuery({
      tableNames: [tableName],
      aggregateTable: tableName,
      fields: { [tableName]: tableFields },
      filterColumns: TablesMeta[tName].searchFields,
      filterValue: query.search + '%',
      getRow: false,
      limit: query.pageSize,
      offset: query.pageNumber * query.pageSize,
    });

    return gqlQuery;
  };

  const doQuery = async (params: {
    pageSize: number;
    pageNumber: number;
    search: string;
  }) => {
    const query = buildQueryFromParams(params);

    const response = await client.query({ query });

    let totalCount = response.data[tableName + '_aggregate'].aggregate.count;
    let rows = response.data[tableName];

    return { totalCount, rows };
  };

  return (
    <IonContent>
      <StyledWrapFullHeight>
        <StyledH3>{TablesMeta[tName].title}</StyledH3>
        <TableLoader
          columns={TablesMeta[tName].fields}
          doQuery={doQuery}
          eager
          loadPageSize={10000}
          detailHandlers={{
            id: {
              endIcon: ForumIcon,
              detailRenderer: (row: any) => (
                <Discussion
                  rowId={row.id} // TODO: determine row keys somehow if row has no id
                  tableName={tableName}
                  userId={USER_ID_STUB} // TODO: configure auth
                />
              ),
            },
          }}
        ></TableLoader>
      </StyledWrapFullHeight>
    </IonContent>
  );
}
