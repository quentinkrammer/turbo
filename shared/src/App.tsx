import { CustomTable } from ".";

function App() {
  const data = [
    { name: "diva", spezies: "süßmaus" },
    { name: "bärchen", spezies: "süßhase" },
    { name: "bärmeister", spezies: "kuschelhasel" },
  ];

  return <CustomTable data={data} />;
}

export default App;
