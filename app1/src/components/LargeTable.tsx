import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
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
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get<Data>("http://localhost:3000/data").then((res) => {
        console.log(res);
        const data = dataSchema.parse(res.data);
        return data;
      }),
  });

  const onSort = useCallback(() => {
    setIsSortedAsc((old) => !old);
  }, []);

  const sorted = useMemo(() => {
    return (
      data?.sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return isSortedAsc ? -1 : 1;
        if (nameA > nameB) return isSortedAsc ? 1 : -1;
        return 0;
      }) ?? []
    );
  }, [data, isSortedAsc]);

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
      <CustomTable data={sorted} />
    </>
  );
};
