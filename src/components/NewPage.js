import React, { useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";

function NewPage() {
  const [list, setList] = useState([
    {
      id: 1,
      name: "shrek",
      type: "layout",
      list: [
        { id: 11, name: "1-shrek" },
        { id: 12, name: "2-fiona" },
        { id: 13, type: "layout", list: [{ id: 113, name: "good" }] }
      ]
    },
    { id: 2, name: "fiona" }
  ]);
  return (
    <div>
      <ReactSortable
        list={list}
        setList={setList}
        group="groupName"
        style={{ padding: 10, background: "#73a74c" }}
      >
        {list.map((item, index) => {
          if (item.type === "layout") {
            return (
              <NewPage2
                key={item.id}
                {...item}
                indexs={[index]}
                setList={setList}
              />
            );
          }
          return <div key={item.id}>{item.name}</div>;
        })}
      </ReactSortable>
      <button
        onClick={() => {
          console.log(list);
        }}
      >
        print
      </button>
    </div>
  );
}

function NewPage2(props) {
  const { id, indexs, list, setList } = props;
  const ref = useRef(Color());
  return (
    <div key={id} style={{ padding: 15 }}>
      <ReactSortable
        key={id}
        group="groupName"
        list={list}
        setList={currentList => {
          setList(sourceList => {
            const tempList = [...sourceList];
            const _indexs = [...indexs];
            const lastIndex = _indexs.pop();
            const lastArr = _indexs.reduce(
              (arr, i) => arr[i]["list"],
              tempList
            );
            lastArr[lastIndex]["list"] = currentList;
            return tempList;
          });
        }}
        style={{ padding: 15, background: ref.current }}
      >
        {list.map((m, index) => {
          if (m.type === "layout") {
            return (
              <NewPage2
                key={m.id}
                {...m}
                indexs={[...indexs, index]}
                setList={setList}
              />
            );
          }
          return <div key={m.id}>{m.name}</div>;
        })}
      </ReactSortable>
    </div>
  );
}

function Color() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ",0.8)";
}

export default NewPage;
