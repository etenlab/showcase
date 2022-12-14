/** @jsxRuntime classic */
/** @jsx jsx */
import { useParams } from 'react-router';
import { IonContent } from '@ionic/react';
import { client } from '../common/graphql';
import { StyledH3, StyledWrapFullHeight } from '../common/styles';
import { buildQuery } from '../common/query';
import { TablesMeta } from '../common/DataTableObjects';

import { TableLoader } from '../tempEilDataTable/index';
// import TableLoader from '@eten-lab/eil-data-table';

export function Dataset() {
  type ObjectKey = keyof typeof TablesMeta;

  let { table } = useParams<{ table: string }>();

  let tableName = table.toString().replaceAll('-', '_');
  const tName: ObjectKey = table;
  let tableFields = TablesMeta[tName].fields.map((value) => value.field);

  const buildQueryFromParams = (query: { page: number; search: string }) => {
    var gqlQuery = buildQuery({
      tableNames: [tableName],
      aggregateTable: tableName,
      fields: { [tableName]: tableFields },
      filterColumns: TablesMeta[tName].searchFields,
      filterValue: query.search + '%',
      getRow: false,
      limit: 25,
      offset: query.page * 25,
    });

    return gqlQuery;
  };

  const doQuery = async (params: { page: number; search: string }) => {
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
          identifier={tName}
          columns={TablesMeta[tName].fields}
          doQuery={doQuery}
        ></TableLoader>
      </StyledWrapFullHeight>
    </IonContent>
  );
}
