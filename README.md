# Network Intrusion Detection System

This Go program simulates a basic network intrusion detection system involving multi-agents, events, interactions, and deliberations.

## Code Structure

- `main` package contains the main function to run the simulation.
- `Event` struct represents a security event with type, observation, temporal attributes, and non-temporal data.
- `Agent` struct represents a security agent with an ID, filtered events, and a knowledge base.
- `Interaction` struct represents the interaction between agents with sender, receiver, and message.
- `FilterEvents` method in the `Agent` struct filters security events based on certain criteria.
- `Deliberate` method in the `Agent` struct simulates the agent's decision-making process based on interactions.

## Running the Simulation

To run the simulation, ensure you have Go installed on your system. Then, navigate to the directory containing the code and run:

```bash
go run main.go
```
# Simulation
Project also has a part which simulates a multi-agent system for network intrusion detection using Express.js and Socket.IO. It visualizes the communication flow between agents on a dashboard.

## Setup

1. **Install dependencies:** Run `npm install` to install the necessary dependencies.

2. **Start the server:** Run `node index.js` to start the Express server.

3. **View the dashboard:** Open `index.html` in a web browser to view the dashboard and visualize the communication flow between agents.

## Features

- **Multi-Agent System Simulation:** Simulates a network intrusion detection system with multiple agents communicating with each other.
  
- **Graph Visualization:** Visualizes the communication flow between agents using a graph-based representation.

- **Dynamic Graph Generation:** Generates a random graph with 20 nodes and ensures connectivity among agents.

- **Resource Allocation:** Distributes broadcast requests evenly among agents to ensure each node handles the same number of requests.

## Dependencies

- [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.

- [Socket.IO](https://socket.io/): Real-time bidirectional event-based communication library for web applications.

- [vis.js](https://visjs.org/): Dynamic, browser-based visualization library for network graphs.

## Usage

- The dashboard displays the network graph and a log of actions performed by the agents.

- Each agent periodically broadcasts a malicious IP address to its neighbors and uses resource allocation to make sure each agent handles same number of requests.

- The graph edges change color to indicate the flow of data (malicious IP addresses) between agents.

- The log section displays actions such as agents sending malicious IP addresses to each other.

\