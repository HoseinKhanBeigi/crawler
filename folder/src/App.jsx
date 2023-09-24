import "./App.css";
import data from "./jsons/freezehoghoghi.json";

function App() {
  const renderParagraph = (paragraph) => {
    return (
      <p>
        {paragraph?.inputes?.map((item, index) => (
          <span key={index}>
            &nbsp;{item.text} &nbsp; {item.input.value}&nbsp;
          </span>
        ))}
      </p>
    );
  };

  const renderTable = (tableArray) => {
    return (
      <div className="table">
        {tableArray?.map((row, index) => (
          <div key={index} className="row">
            {row.map((col, index) => (
              <div key={index} className="col">
                {col?.inputes?.map((item, index) => (
                  <span key={index}>
                    &nbsp;{item.text} &nbsp; {item.input.value}&nbsp;
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderEntity = (entity) => {
    return (
      <>
        <h2>{entity.title}</h2>
        <>
          {entity?.table?.length !== undefined
            ? renderTable(entity?.table)
            : ""}
        </>
        {entity?.paragraphes?.map((paragraph) => renderParagraph(paragraph))}
      </>
    );
  };

  const renderPage = (page) => {
    return (
      <div className="page" style={{ textAlign: "right" }}>
        {/* eslint-disable-next-line no-prototype-builtins */}
        {page.hasOwnProperty("contractNumber") ||
        page.hasOwnProperty("contractDate") ? (
          <div className="contract-details">
            <span>
              شماره قرارداد:
              {page?.contractNumber}
            </span>
            <span>
              تاریخ قرارداد:
              {page?.contractDate}
            </span>
          </div>
        ) : null}
        {page?.entities?.map((entity) => renderEntity(entity))}
        {/* eslint-disable-next-line no-prototype-builtins */}
        {page?.hasOwnProperty("sign") && (
          <div className="sign">
            <span>امضاومهر کارگزاری</span>
            <span>امضاومهر مشتری</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ direction: "rtl" }} className="page">
      <div className="logos">
        {data.logos?.map((logo, index) => (
          <img key={index} src={logo} alt="logo" className="logo" />
        ))}
      </div>
      <h1 className="title">{data.title}</h1>
      <h6>{data.desc}</h6>
      {data?.pages?.map((page) => renderPage(page))}
    </div>
  );
}

export default App;

// import { useEffect, useState, useRef, useReducer } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import data1 from "./algorithem.json";
// import "./App.css";

// function App() {
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "ADD":
//         return {
//           todos: [
//             ...state.todos,
//             {
//               id: 1,
//               title: action.title,
//             },
//           ],
//         };
//       default:
//         return state.todos;
//     }
//   };
//   const createInitialState = useRef({
//     todos: [],
//   });
//   const inputText = useRef();
//   const [data, setData] = useState();
//   const [todos, dispatch] = useReducer(reducer, createInitialState.current);

//   useEffect(() => {
//     // Save data to localStorage whenever 'data' changes
//     localStorage.setItem("myData", JSON.stringify(todos.todos));
//   }, [todos]);

//   const handleClick = () => {
//     dispatch({ type: "ADD", title: inputText.current.value });
//   };

//   const handeRemove = () => {
//     localStorage.removeItem("myData");
//   };

//   const handleRead = () => {
//     console.log();
//   };

//   const handleCreate = () => {
//     const jsonString = JSON.stringify(
//       JSON.parse(localStorage.getItem("myData"))
//     );

//     // Create a Blob from the JSON string
//     const jsonBlob = new Blob([jsonString], { type: "application/json" });

//     // Create a download link for the Blob
//     const downloadLink = document.createElement("a");
//     downloadLink.href = URL.createObjectURL(jsonBlob);
//     downloadLink.download = "data.json";

//     // Trigger the download
//     downloadLink.click();
//   };

//   const renderTable = (tableArray) => {
//     console.log(tableArray);
//     return (
//       <div className="table">
//         {tableArray?.map((row, index) => (
//           <div key={index} className="row">
//             {row.map((col, index) => (
//               <div key={index} className="cell">
//                 <>
//                   <span key={index}>
//                     {col.title} &nbsp;{" "}
//                     {Array.isArray(col?.value)
//                       ? !col.div
//                         ? col?.value?.map((e) => (
//                             <span style={{ paddingLeft: "16px" }}>{e}</span>
//                           ))
//                         : col?.value?.map((e) => (
//                             <div style={{ paddingLeft: "16px" }}>{e}</div>
//                           ))
//                       : col?.value}
//                   </span>
//                 </>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <>
//       <Box>
//         <TextField
//           inputRef={inputText}
//           // onChange={hanldeChange}
//           id="standard-basic"
//           label="Standard"
//           variant="standard"
//         />
//         <Button variant="contained" onClick={handleClick}>
//           add
//         </Button>
//         <Button variant="contained" onClick={handeRemove}>
//           remove
//         </Button>

//         <Button variant="contained" onClick={handleCreate}>
//           create
//         </Button>
//       </Box>
//       <div className="history">
//         <div style={{ direction: "rtl" }} className={"page"}>
//           {data1[0]?.pages?.map((page) => (
//             <>
//               {page.entities.map((item) => (
//                 <>
//                   {item.id !== "table" ? (
//                     item.bold ? (
//                       <div style={{ fontWeight: "bold" }}>{item.title}</div>
//                     ) : (
//                       <div className="text">{item.title}</div>
//                     )
//                   ) : (
//                     renderTable(item?.table)
//                   )}
//                 </>
//               ))}
//               {
//                 <div className="sign">
//                   <span>امضاومهر کارگزاری</span>
//                   <span>امضاومهر مشتری</span>
//                 </div>
//               }
//             </>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
