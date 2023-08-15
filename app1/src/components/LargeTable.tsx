import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isNil } from "lodash";
import { Dialog } from "primereact/dialog";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
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
        const data = dataSchema.parse(res.data);
        return data;
      }),
  });

  const {
    callbacks: { onFilter, onSort },
    data: filteredAndSortedData,
    filter,
    modalIndex,
    setModalIndex,
  } = useFilteredAndSortedData(data ?? []);

  if (isLoading) {
    return "Loading...";
  }
  if (error || !data) {
    return "Error :(";
  }
  return (
    <>
      <button type="button" onClick={onSort}>
        sort
      </button>
      <input value={filter} onChange={onFilter} />
      <Dialog
        visible={!isNil(modalIndex)}
        onHide={() => setModalIndex(undefined)}
      >
        {modalIndex &&
          Object.entries(data.at(modalIndex) ?? {}).map(([key, value]) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            );
          })}
      </Dialog>
      <CustomTable data={filteredAndSortedData} />
    </>
  );
};
//
//
//
//
//
//
//
//
function useFilteredAndSortedData(data: Data) {
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebouncedValue(filter, 200);
  const [modalIndex, setModalIndex] = useState<number>();

  const filterRegex = useMemo(
    () => new RegExp(debouncedFilter, "gmi"),
    [debouncedFilter],
  );

  const onSort = useCallback(() => {
    setIsSortedAsc((old) => !old);
  }, [setIsSortedAsc]);

  const onFilter = useCallback<
    NonNullable<ComponentProps<"input">["onChange"]>
  >((e) => setFilter(e.target.value), [setFilter]);

  const filtered = useMemo(() => {
    return data?.filter(({ name }) => name.match(filterRegex));
  }, [data, filterRegex]);

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

  const highlighted = sorted.map((cellData, index) => {
    return {
      ...cellData,
      name: (
        <Highlighter
          textToHighlight={cellData.name}
          searchWords={[filterRegex]}
        />
      ),
      button: (
        <button type="button" onClick={() => setModalIndex(index)}>
          Modal
        </button>
      ),
    };
  });

  return {
    callbacks: { onSort, onFilter },
    data: highlighted,
    filter,
    modalIndex,
    setModalIndex,
  };
}
