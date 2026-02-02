const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const connectDB =require('./config/db');
const orderRoutes = require('./routes/userRoutes/orderRoutes')
const userRoutes = require('./routes/userRoutes/userRoute')
const complaintRoutes = require('./routes/userRoutes/complaintRoutes/complaintRoutes')
const WorkerAccountControlle =require('./routes/Admin/WorkerControlle/workeraccount')
const getUserProfileRoute = require('./routes/userRoutes/Profile/userDetails')
const getWorkerOrders = require("./routes/Worker/Get-All-Orders/allOrders")
const stockRoutes = require('./routes/Worker/stockRoutes');
const cors = require('cors'); // Importing cors
const { Server } = require("socket.io");

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Creating HTTP server from the Express app
const server = http.createServer(app);

// Setting up Socket.IO with the HTTP server
const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        callback(null, true);
      },
      methods: ['GET', 'POST'],
    },
  });

// Handling socket connection
io.on('connection', (socket) => {
  // console.log(`Connected: ${socket.id}`);

  socket.on('student-message', (message) => {
    io.emit("server-message", message);
  });
  
  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

});

app.get('/', (req, res) => {
  res.send('Server is ready on EC2');
});

// Middleware
app.use(cors()); // Enabling CORS for all routes

// connect to database
connectDB();

app.use('/user',orderRoutes,userRoutes,complaintRoutes,getUserProfileRoute)
app.use('/admin',WorkerAccountControlle )
app.use('/worker',WorkerAccountControlle,getWorkerOrders)
app.use('/stock', stockRoutes)

// Start the server
server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
