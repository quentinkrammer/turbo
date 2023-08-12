import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  if (isLoading) {
    return "Loading...";
  }
  if (error) {
    console.log(error);
    return "Error :(";
  }
  return <CustomTable data={data ?? []} />;
};
