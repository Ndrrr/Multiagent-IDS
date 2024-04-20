
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const agents = {};
app.use(express.static(path.join(__dirname, 'public')));
const agentIds = Array.from({ length: 20 }, (_, i) => `Agent${i + 1}`);
const connections = generateRandomConnections(agentIds, 0.15); // Adjust the connection probability as needed

// Initialize agents and connections
agentIds.forEach((agentId) => {
    agents[agentId] = {
        id: agentId,
        connectedAgents: connections.filter(conn => conn.from === agentId).map(conn => conn.to),
        knownMaliciousIPs: new Set(),
        requestCount: 0
    };
});

function broadcastIP(originAgent, maliciousIP) {
    if (!agents[originAgent].knownMaliciousIPs.has(maliciousIP)) {
        agents[originAgent].knownMaliciousIPs.add(maliciousIP);
        agents[originAgent].requestCount++;
        agents[originAgent].connectedAgents.forEach(neighbor => {
            if (!agents[neighbor].knownMaliciousIPs.has(maliciousIP)) {
                io.emit('maliciousIPBroadcast', { from: originAgent, to: neighbor, maliciousIP });
                setTimeout(() => {
                    broadcastIP(neighbor, maliciousIP);
                }, 1000);
            }
        });
    }
}

function getNextAgent() {
    let minRequests = Number.MAX_SAFE_INTEGER;
    let nextAgent = null;
    for (const agentId in agents) {
        if (agents[agentId].requestCount < minRequests) {
            minRequests = agents[agentId].requestCount;
            nextAgent = agentId;
        }
    }
    return nextAgent;
}

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.emit('initialData', { agents, connections });

    setInterval(() => {
        const randomAgentId = agentIds[Math.floor(Math.random() * agentIds.length)];
        const randomIP = getRandomIP();
        const nextAgent = getNextAgent();
        broadcastIP(nextAgent, randomIP);
    }, 10000);
});

function generateRandomConnections(agentIds, additionalEdges = 3) {
    let links = [];
    let connectedNodes = [agentIds[0]];

    // create spanning tree
    for (let i = 1; i < agentIds.length; i++) {
        const connectFrom = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
        const connectTo = agentIds[i];
        links.push({ from: connectFrom, to: connectTo });
        links.push({ from: connectTo, to: connectFrom });
        connectedNodes.push(connectTo);
    }

    // add random connections for robustness
    for (let n = 0; n < additionalEdges; n++) {
        let nodeA = agentIds[Math.floor(Math.random() * agentIds.length)];
        let nodeB = agentIds[Math.floor(Math.random() * agentIds.length)];
        if (nodeA !== nodeB && !links.some(link => (link.from === nodeA && link.to === nodeB) || (link.from === nodeB && link.to === nodeA))) {
            links.push({ from: nodeA, to: nodeB });
            links.push({ from: nodeB, to: nodeA });
        }
    }

    return links;
}

function getRandomIP() {
    return `${getRandomInt(256)}.${getRandomInt(256)}.${getRandomInt(256)}.${getRandomInt(256)}`;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});