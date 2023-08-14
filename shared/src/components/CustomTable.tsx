import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ReactNode } from "react";

export type CustomTableProps<TObj extends object> = {
  data: Array<TObj>;
};
export function CustomTable<TObj extends { [index: string]: ReactNode }>({
  data,
}: CustomTableProps<TObj>) {
  const orderedColumnValues = Object.values(data[0] ?? []);

  return (
    <DataTable value={data} paginator rows={5}>
      {orderedColumnValues.map((columnValue, index) => (
        <Column key={index} body={columnValue} />
      ))}
    </DataTable>
  );
}
