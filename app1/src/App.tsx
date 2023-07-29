import { CustomTable } from "shared";
import { useAppSelector } from "./redux/hooks";
import { selectTableData } from "./redux/tableSlice";

function App() {
  const data = useAppSelector(selectTableData);

  return (
    <>
      <CustomTable data={data} />
    </>
  );
}

export default App;
