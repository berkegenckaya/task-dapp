import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    const res = await contract.getTickets();

    setTickets(res);
  };

  const createTicket = async (_name) => {
    const res = await contract.createTicket(_name);
    await res.wait();
    getTickets();
  };
  const updateTicketStatus = async (_index, _status) => {
    const transaction = await contract.updateTicketStatus(_index, _status);
    await transaction.wait();
    getTickets();
  };
  const deleteTicket = async (_index) => {
    const transaction = await contract.deleteTicket(_index);
    await transaction.wait();
    getTickets();
  };

  const renameTicket = async (_index) => {
    let newName = prompt("Please enter new ticket name", "");
    const transaction = await contract.updateTicketName(_index, newName);
    await transaction.wait();
    getTickets();
  };

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = provider.getSigner();
      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
          Manager.abi,
          newSigner
        )
      );
    } else {
      console.log("Please install metamask");
    }
  };
  useEffect(() => {
    initConnection();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <p>Task Manager</p>
        {account != "" ? (
          <p>{account.substring(0, 9)}</p>
        ) : (
          <button className="big-button" onClick={initConnection}>
            Connect
          </button>
        )}
      </div>

      <div className="input-section">
        <div>
          <button className="big-button" onClick={() => createTicket(name)}>
            Create Ticket
          </button>
          <input
            className="input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Ticket Name"
          />
        </div>
        <button className="big-button" onClick={getTickets}>
          Load data
        </button>
      </div>

      <div className="main">
        <div className="main-col" style={{ backgroundColor: "#f4f4f2" }}>
          <div className="main-col-heading">Todo</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status == 0)
            .map((ticket, index) => {
              return (
                <div className="main-ticket-card">
                  <p className="main-ticket-card-id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main-ticket-button-section">
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#64b6ac" }}
                      onClick={() => updateTicketStatus(ticket.id, 1)}
                    >
                      Busy
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "lightBlue" }}
                      onClick={() => updateTicketStatus(ticket.id, 2)}
                    >
                      Done
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#c0fdfb" }}
                      onClick={() => renameTicket(ticket.id)}
                    >
                      Rename
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#ff6b6b" }}
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="main-col" style={{ backgroundColor: "#64b6ac" }}>
          <div className="main-col-heading">Busy</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status == 1)
            .map((ticket, index) => {
              return (
                <div className="main-ticket-card">
                  <p className="main-ticket-card-id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main-ticket-button-section">
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#f4f4f2" }}
                      onClick={() => updateTicketStatus(ticket.id, 0)}
                    >
                      Todo
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "lightBlue" }}
                      onClick={() => updateTicketStatus(ticket.id, 2)}
                    >
                      Done
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#c0fdfb" }}
                      onClick={() => renameTicket(ticket.id)}
                    >
                      Rename
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#ff6b6b" }}
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="main-col" style={{ backgroundColor: "LightBlue" }}>
          <div className="main-col-heading">Done</div>
          {tickets
            .map((t, i) => ({ id: i, item: t }))
            .filter((t) => t.item.status == 2)
            .map((ticket, index) => {
              return (
                <div className="main-ticket-card">
                  <p className="main-ticket-card-id">#{ticket.id}</p>
                  <p key={index}>{ticket.item.name}</p>
                  <div className="main-ticket-button-section">
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#64b6ac" }}
                      onClick={() => updateTicketStatus(ticket.id, 1)}
                    >
                      Busy
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#f4f4f2" }}
                      onClick={() => updateTicketStatus(ticket.id, 0)}
                    >
                      Todo
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#c0fdfb" }}
                      onClick={() => renameTicket(ticket.id)}
                    >
                      Rename
                    </button>
                    <button
                      className="small-button"
                      style={{ backgroundColor: "#ff6b6b" }}
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
