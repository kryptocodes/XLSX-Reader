import React, { useState } from "react";
import * as XLSX from "xlsx";

const App = () => {
  const [items, setItems] = useState([]);

  const PostRequest = (sheet, values) => {
    console.log(sheet, values);
    return fetch(`http://localhost:8000/api/${sheet}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const OnSubmit = async() => {
    if(items[0] !== "" || items[0] !== undefined){
    for(var i=0;i<items.length;i++){
      await PostRequest(items[i]?.sheetName,items[i].data)
    }
  }else{
    console.log("error")
  }
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames;
        var data = [];
        for (var i = 0; i < wb.SheetNames.length; ++i) {
          var sheet = wb.Sheets[wb.SheetNames[i]];
          console.log(wb.SheetNames[i])
          var data = [...data, {sheetName:wb.SheetNames[i],data:XLSX.utils.sheet_to_json(sheet) }];
        }
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div className="container-fluid">
      <section className="heading">
        <h4>NodeJS task</h4>
        <input
          type="file"
          className="input-field"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </section>
      <button onClick={() => OnSubmit()}>Submit</button>
    </div>
  );

  return <div></div>;
};

export default App;
