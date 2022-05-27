import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState([]);
  const [chek, setChek] = useState([]);

  //textfield input
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //form submit handle
  const handleSubmit = (e) => {
    console.log("done");
    e.preventDefault();
    const { name, email } = inputs;
    postData(name, email);
    setInputs({})
    
  };

  //chekbox field
  const handleCheck = (e) => {
    let value = e.target.name;
    if (e.target.checked) {
      setChek((values) => {
        return [...values, value];
      });
    } else {
      setChek((values) => {
        return values.filter((v) => {
          return v !== value;
        });
      });
    }
  };

  //post a text input fields
  const postData = async (name, email) => {
    try {
      let res = await axios.post(
        "/add",
        { name, email, consents:chek },
        {
          header: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        }
      );
      if ((await res.status) === 201) {
        alert("success");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //show table
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    let res = await axios.get("/show", {
      header: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    });
    setShow(res.data);
  };

  return (
    <>
      <div className="main">
        <form onSubmit={handleSubmit} id="reset">
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            placeholder="name"
          />
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            placeholder="email"
          />
          <br /> i Agree to:
          <br />
          <input
            type="checkbox"
            name=" recive new letter"
            id=""
            onChange={handleCheck}
            checked={chek.indexOf() === -1 ? false : true}
          />
          recive new letter
          <br />
          <input
            type="checkbox"
            name="be shown targeted abs"
            id=""
            onChange={handleCheck}
            checked={chek.indexOf() === -1 ? false : true}
          />
          be shown targeted abs
          <br />
          <input
            type="checkbox"
            name="contribute to anonymous visit statistic"
            id=""
            onChange={handleCheck}
            checked={chek.indexOf() === -1 ? false : true}
          />
          contribute to anonymous visit statistic
          <br />
          <input type="submit" value="give consent" />
        </form>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th>email</th>
              <th>name</th>
              <th>consents</th>
            </tr>
            {show.map((value) => {
              console.log();
              return (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.name}</td>
                  <td>{value.consents.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
