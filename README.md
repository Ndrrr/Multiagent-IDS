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
