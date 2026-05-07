const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Secret key (use environment variables in production)
const JWT_SECRET = 'd3bbfd8f0662c7dc7b48786722ce7aaa8e658ed4628f767ee448a8fab8e3bf61a9fb8fad863fec7476d51fc7822933d0d356812a41f71371f55bfc628050d84f';
const PORT = 5001;
const app = express();
const clients = []; // for SSE

// Authentication middleware
function authenticateToken(req, res, next) {
  // Check for token in cookies or Authorization header
  const token = req.cookies.token || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Role checker middleware
function checkRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (roles.includes(req.user.role)) {
      return next();
    }
    
    return res.status(403).json({ message: 'Insufficient permissions' });
  };
}

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // In a real app, validate against a database
  let user;
  if (email === 'drcd@wellspringcv.com' && password === 'v') {
    user = { id: 1, email: 'user', role: 'user' };
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Generate token
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
  
  // Set token as cookie and also return in response
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 3600000 // 1 hour
  });
  
  res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, role: user.role } });
});

// --- Request logging middleware ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// --- POST /html: write JSON and spawn Python ---
app.post('/html', (req, res) => {
  const searchQuery = req.body.query;
  const filePath = path.resolve(__dirname, 'input', 'data.json');

  fs.writeFile(filePath, JSON.stringify({ query: searchQuery }), (err) => {
    if (err) {
      console.error('Error writing data.json:', err);
      return res.status(500).send({ error: 'Failed to write file' });
    }

    console.log('data.json written successfully');

    const py = spawn('python', [path.resolve(__dirname, 'input', 'json_to_names.py')]);

    py.stdout.on('data', (data) => console.log(`Python stdout: ${data}`));
    py.stderr.on('data', (data) => console.error(`Python stderr: ${data}`));
    py.on('close', (code) => console.log(`Python process exited with code ${code}`));

    res.send({ message: 'Query received and Python process started' });
  });
});

// --- POST /html/simulate: copy ping.json ---
app.post('/html/simulate', (req, res) => {
  const src = path.resolve(__dirname, 'ping.json');
  const dest = path.resolve(__dirname, 'input', 'ping.json');

  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.error('Error copying ping.json:', err);
      return res.status(500).send({ error: 'Failed to copy file' });
    }

    console.log('ping.json copied successfully');
    res.send({ message: 'ping.json copied' });
  });
});

// --- GET /html: return message.txt ---
app.get('/html', authenticateToken, (req, res) => {
  const fileName = path.resolve(__dirname, 'output', 'message.txt');

  if (fs.existsSync(fileName)) {
    console.log(`File exists: ${fileName}`);

    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading message.txt:', err);
        return res.status(500).send('Error reading file');
      }

      res.setHeader('Content-Type', 'text/plain');
      res.send(data);
    });
  } else {
    console.warn(`File not found: ${fileName}`);
    res.status(404).send('File not found');
  }
});

// --- SSE endpoint ---
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // keep-alive comment
  res.write(': keep-alive\n\n');

  clients.push(res);
  console.log('SSE client connected. Total clients:', clients.length);

  req.on('close', () => {
    const index = clients.indexOf(res);
    if (index !== -1) clients.splice(index, 1);
    console.log('SSE client disconnected. Total clients:', clients.length);
  });
});

// --- Start server ---
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) return console.error('Server failed to start:', err);
  console.log(`Server listening on PORT ${PORT}`);
});
