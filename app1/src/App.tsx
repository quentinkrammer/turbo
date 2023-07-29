import { CustomTable } from "shared";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectTableData, sortName } from "./redux/tableSlice";

function App() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTableData);

  return (
    <>
      <button type="button" onClick={() => dispatch(sortName())}>
        Sort
      </button>
      <CustomTable data={data} />
    </>
  );
}

export default App;
