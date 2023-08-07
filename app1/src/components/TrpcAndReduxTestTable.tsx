import { useCallback, useEffect, useState } from "react";
import { CustomTable } from "shared";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectTableData, sortName } from "../redux/tableSlice";
import { trpcClient } from "../trpcClient";

export function TrpcAndReduxTestTable() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTableData);
  const [users, setUsers] = useState<
    Awaited<ReturnType<(typeof trpcClient)["userList"]["query"]>>
  >([]);
  const [mutatedUsers, setMutatedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await trpcClient.userList.query();
      setUsers(users);
    };
    fetchUsers().catch(console.error);
  }, [mutatedUsers]);

  const onCreateUser = useCallback(async () => {
    await trpcClient.userCreate.mutate("Jerry");
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
