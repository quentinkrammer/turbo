import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

type TableData = Array<{ name: string; spezies: string }>;

export function CustomTable() {
  const data: TableData = [
    { name: "diva", spezies: "süßmaus" },
    { name: "bärchen", spezies: "süßhase" },
    { name: "bärmeister", spezies: "kuschelhasel" },
  ];

  const orderedColumnKeys: Array<keyof TableData[number]> = ["name", "spezies"];

  return (
    <DataTable value={data}>
      {orderedColumnKeys.map((column) => (
        <Column field={column} />
      ))}
    </DataTable>
  );
}
