const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3001;

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Secret key (use environment variables in production)
const JWT_SECRET = 'd3bbfd8f0662c7dc7b48786722ce7aaa8e658ed4628f767ee448a8fab8e3bf61a9fb8fad863fec7476d51fc7822933d0d356812a41f71371f55bfc628050d84f';

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
  const { username, password } = req.body;
  
  // In a real app, validate against a database
  let user;
  if (username === 'drcd@wellspringcv.com' && password === 'v') {
    user = { id: 1, username: 'user', role: 'user' };
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

// Serve static files (like images, CSS, JS) from the 'output' folder
app.use('/output', express.static(path.resolve('/opt/app/MarkovProprietary/pipelinestages/app/mount/output')));

// Serve the HTML file on the /output route
app.get('/output', authenticateToken, (req, res) => {
    const html_path = path.resolve('/opt/app/MarkovProprietary/pipelinestages/app/mount/output', 'index.html');
    
    if (!fs.existsSync(html_path)) {
        console.log(`HTML file '${html_path}' not found.`);
        return res.status(404).send('HTML file not found.');
    }

    console.log(`Serving ${html_path}`);
    res.sendFile(html_path);
});

// API to check if the PDB file is available
app.get('/check-file', authenticateToken, (req, res) => {
    const pdb_path = path.resolve('/opt/app/MarkovProprietary/pipelinestages/app/mount/output', 'lightdock_0.pdb');

    if (fs.existsSync(pdb_path)) {
        console.log(`File ${pdb_path} exists.`);
        return res.json({ exists: true });
    }

    console.log(`File ${pdb_path} does not exist.`);
    return res.json({ exists: false });
});

// API to download the PDB file
app.get(['/download', '/download/'], authenticateToken, (req, res) => {
    const pdb_path = path.resolve('/opt/app/MarkovProprietary/pipelinestages/app/mount/output', 'lightdock_0.pdb');

    if (!fs.existsSync(pdb_path)) {
        console.log(`File '${pdb_path}' not found.`);
        return res.status(404).send('File not found.');
    }

    console.log(`Downloading ${pdb_path}`);
    res.setHeader('Content-Type', 'chemical/x-pdb');
    res.setHeader('Content-Disposition', 'attachment; filename="lightdock_0.pdb"');

    const fileStream = fs.createReadStream(pdb_path);
    fileStream.pipe(res);

    // Remove the file after sending
    fileStream.on('close', () => {
        fs.unlink(pdb_path, (err) => {
            if (err) {
                console.error('Error occurred while removing the file:', err);
            } else {
                console.log('File removed successfully.');
            }
        });
    });
});

// Error handler for missing logo.png
app.use((req, res, next) => {
    if (req.url.includes('logo.png')) {
        const logoPath = path.resolve('/opt/app/MarkovProprietary/pipelinestages/app/mount/output', 'logo.png');
        
        // Check if the logo.png file exists and log if not
        if (!fs.existsSync(logoPath)) {
            console.log(`ERROR: logo.png was requested but could not be found at ${logoPath}`);
            return res.status(404).send('logo.png not found');
        } else {
            console.log(`logo.png found and served successfully from ${logoPath}`);
        }
    }
    next();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP server running on port ${PORT}`);
});
