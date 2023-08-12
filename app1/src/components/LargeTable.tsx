import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import { CustomTable } from "shared";
import { z } from "zod";

const dataSchema = z.array(
  z.object({
    id: z.string(),
    index: z.number(),
    guid: z.string(),
    balance: z.string(),
    picture: z.string(),
    age: z.number(),
    eyeColor: z.string(),
    name: z.string(),
    gender: z.string(),
    company: z.string(),
    email: z.string(),
  }),
);
type Data = z.infer<typeof dataSchema>;

export const LargeTable: React.FC<object> = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get<Data>("http://localhost:3000/data").then((res) => {
        console.log(res);
        const data = dataSchema.parse(res.data);
        return data;
      }),
  });

  const {
    callbacks: { onFilter, onSort },
    data: filteredAndSortedData,
    filter,
  } = useFilteredAndSortedData(data ?? []);

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return "Error :(";
  }
  return (
    <>
      <button type="button" onClick={onSort}>
        sort
      </button>
      <input value={filter} onChange={onFilter} />
      <CustomTable data={filteredAndSortedData} />
    </>
  );
};

function useFilteredAndSortedData(data: Data) {
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebouncedValue(filter, 200);

  const onSort = useCallback(() => {
    setIsSortedAsc((old) => !old);
  }, [setIsSortedAsc]);

  const onFilter = useCallback<
    NonNullable<ComponentProps<"input">["onChange"]>
  >((e) => setFilter(e.target.value), [setFilter]);

  const filtered = useMemo(() => {
    return data?.filter(({ name }) => name.includes(debouncedFilter));
  }, [data, debouncedFilter]);

  const sorted = useMemo(() => {
    return (
      filtered?.sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return isSortedAsc ? -1 : 1;
        if (nameA > nameB) return isSortedAsc ? 1 : -1;
        return 0;
      }) ?? []
    );
  }, [filtered, isSortedAsc]);

  return { callbacks: { onSort, onFilter }, data: sorted, filter };
}
