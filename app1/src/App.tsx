import { LargeTable } from "./components/LargeTable";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LargeTable />
      </QueryClientProvider>
    </>
  );
}

export default App;
