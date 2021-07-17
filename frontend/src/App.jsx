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
      await console.log(items[i]?.sheetName,items[i].data)
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
    <div className="container">
      <section className="heading text-center">
        <h4 className="text-center text-white p-4 bg-success">XLS Import and viewer</h4>
        <input
          type="file"
          className="input-field"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
           {/* <button className="btn btn-secondary rounded-0" onClick={() => OnSubmit()}>Submit</button> */}
      </section>
   

  
      {/* a toggle to change the worksheets accordingly*/}
        

      {items?.slice().map((item, index) => {
        var {sheetName,data} = item;
        return (
          <div key={index} className="row mx-auto justify-content-center text-center">
            <div className="col-md-12">
              <h4>Worksheet Name: {sheetName}</h4>
            </div>
            <div className="col-md-8 table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="bg-success text-white">
                    {Object.keys(data[0]).map((key, index) => {
                      return <th key={index}>{key}</th>;
                    }
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return <tr key={index}>
                      {Object.keys(item).map((key, index) => {
                  
                        return <td key={index}>{item[key]}</td>;
                      })}
                    </tr>
                  }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      )} 
    </div>
  );
};

export default App;
