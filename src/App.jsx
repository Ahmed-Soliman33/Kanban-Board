import Header from "@components/Header";
import SideMenu from "./components/SideMenu";
import Workspace from "./components/Workspace";
import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";

const DEFAULT = [
  {
    id: 1,
    title: "board1",
    columns: [
      {
        id: 1,
        title: "TODO",
        tasks: [
          {
            id: 1,
            title: "card1",
          },
        ],
      },
    ],
  },
];

function App() {
  const [dataState, setDataState] = useState(
    JSON.parse(localStorage.getItem("data")) || DEFAULT
  );
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      setDataState(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (!dataState) return;

    localStorage.setItem("data", JSON.stringify(dataState));
  }, [dataState]);

  return (
    <DataContext.Provider
      value={{
        data: dataState || [],
        setData: setDataState,
        selectedBoardIndex,
        setSelectedBoardIndex,
      }}
    >
      <div className="flex h-screen flex-col font-jakarta">
        <Header />
        <div className="flex flex-1">
          <SideMenu />
          <Workspace />
        </div>
      </div>
    </DataContext.Provider>
  );
}

export default App;
