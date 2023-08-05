import { useCallback, useEffect, useState } from "react";
import { CustomTable } from "shared";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectTableData, sortName } from "./redux/tableSlice";
import { trpc } from "./trpcClient";
// const random_name = require("node-random-name") as () => string;

function App() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTableData);
  const [users, setUsers] = useState<
    Awaited<ReturnType<(typeof trpc)["userList"]["query"]>>
  >([]);
  const [mutatedUsers, setMutatedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await trpc.userList.query();
      setUsers(users);
    };
    fetchUsers().catch(console.error);
  }, [mutatedUsers]);

  const onCreateUser = useCallback(async () => {
    await trpc.userCreate.mutate("Jerry");
    setMutatedUsers((old) => !old);
  }, []);

  return (
    <>
      <button type="button" onClick={() => void onCreateUser()}>
        create user
      </button>
      <CustomTable data={users} />
      <button type="button" onClick={() => dispatch(sortName())}>
        Sort
      </button>
      <CustomTable data={data} />
    </>
  );
}

export default App;
