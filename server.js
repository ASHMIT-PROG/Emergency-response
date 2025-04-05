import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  
  // Create Socket.IO server
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  // In-memory storage for alerts and responders
  const alerts = new Map();
  const responders = new Map();

  // Socket.IO event handlers
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle responder registration
    socket.on('register_responder', (responder) => {
      responders.set(socket.id, responder);
      socket.join(responder.type); // Join room based on responder type
      console.log(`Responder registered: ${responder.name} (${responder.type})`);
    });

    // Handle new emergency alerts
    socket.on('emergency_alert', (alert) => {
      alerts.set(alert.id, alert);
      // Emit to appropriate responders based on alert type
      io.to(alert.type).emit('new_alert', alert);
      console.log(`Emergency alert received: ${alert.type}`);
    });

    // Handle alert status updates
    socket.on('update_alert_status', ({ alertId, status }) => {
      const alert = alerts.get(alertId);
      if (alert) {
        alert.status = status;
        io.emit('alert_updated', { alertId, status });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      responders.delete(socket.id);
      console.log('Client disconnected:', socket.id);
    });
  });

  // Create Vite dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  const port = 3000;
  httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();