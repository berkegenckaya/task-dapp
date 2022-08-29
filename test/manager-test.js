const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Manager", function () {
  let Manager, manager;

  before(async function () {
    Manager = await ethers.getContractFactory("Manager");
    manager = await Manager.deploy();
    await manager.deployed();
  });
  it("Should create a new ticket", async function () {
    await manager.createTicket("test");
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].name).to.equal("test");
  });

  it("Should update a ticket name", async function () {
    await manager.updateTicketName(0, "new test");
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].name).to.equal("new test");
  });
  it("Should create a new ticket", async function () {
    await manager.updateTicketStatus(0, 3);
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets[0].status).to.equal(3);
  });
  it("Should create a new ticket", async function () {
    await manager.createTicket("My new Ticket");
    await manager.createTicket("My new Ticket");
    await manager.createTicket("My new Ticket");
    let tickets = await manager.getTickets();
    console.log(tickets);
    expect(tickets.length).to.equal(4);
  });
});
