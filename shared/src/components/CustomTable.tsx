import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export type CustomTableProps<TObj extends object> = {
  data: Array<TObj>;
};
export function CustomTable<TObj extends { [index: string]: number | string }>({
  data,
}: CustomTableProps<TObj>) {
  const orderedColumnKeys = Object.keys(data[0] ?? []);

  return (
    <DataTable value={data} paginator rows={5}>
      {orderedColumnKeys.map((column) => (
        <Column
          key={column}
          body={(cellData) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            return cellData[column];
          }}
        />
      ))}
    </DataTable>
  );
}
