const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'karigar-ai-sih2026-super-secret-key';

// Real Database User Registration Controller
exports.register = async (req, res) => {
  const { phone, password, role = 'ARTISAN', name } = req.body;

  try {
    const cleanPhone = String(phone || '').trim();
    if (!cleanPhone || !password) {
      return res.status(400).json({ error: 'Phone number/email and password are required.' });
    }

    // Check if user already exists in XAMPP MySQL Database
    const existingUser = await prisma.user.findUnique({
      where: { phone: cleanPhone }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Account already exists. Please log in.' });
    }

    // Create real user in XAMPP MySQL Database
    const hashedPassword = await bcrypt.hash(password, 10);
    const displayName = name || (cleanPhone.includes('@') ? cleanPhone.split('@')[0] : `Artisan (${cleanPhone.slice(-4)})`);

    const newUser = await prisma.user.create({
      data: {
        phone: cleanPhone,
        password: hashedPassword,
        name: displayName,
        role: role,
        ...(role === 'ARTISAN' ? {
          artisan: {
            create: {
              craft: 'Handicraft',
              location: 'India',
              experience: 1,
              salesTotal: 0.0,
              ordersTotal: 0,
              story: {
                create: {
                  rawStory: `Craft store legacy by ${displayName}`,
                  aiEnhancedStory: `Master artisan ${displayName} carries forward traditional handmade craft traditions.`,
                  heritage: 'Authentic Indian Craft'
                }
              }
            }
          }
        } : {
          buyer: {
            create: {
              companyName: `${displayName} Enterprise`,
              location: 'India',
              businessType: 'Retailer'
            }
          }
        })
      },
      include: { artisan: true, buyer: true }
    });

    console.log(`✅ Real User Registered in MySQL DB: ${newUser.name} (${newUser.phone})`);

    const payload = {
      id: newUser.id,
      phone: newUser.phone,
      name: newUser.name,
      role: newUser.role,
      artisan: newUser.artisan,
      buyer: newUser.buyer
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ success: true, token, user: payload });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ error: 'Failed to create user account' });
  }
};

// Real Database User Login Controller
exports.login = async (req, res) => {
  const { phone, password, role = 'ARTISAN', name } = req.body;

  try {
    const cleanPhone = String(phone || '').trim();
    if (!cleanPhone || !password) {
      return res.status(400).json({ error: 'Phone/email and password are required' });
    }

    // Query XAMPP MySQL Database for real user
    let user = await prisma.user.findUnique({
      where: { phone: cleanPhone },
      include: { artisan: true, buyer: true }
    });

    // If user does not exist, auto-register them if name is provided or prompt registration
    if (!user) {
      if (name || req.body.autoRegister) {
        return exports.register(req, res);
      }
      return res.status(404).json({ error: 'Account not found. Please sign up first.', notFound: true });
    }

    // Verify Password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
    if (!isMatch && user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    const payload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
      artisan: user.artisan,
      buyer: user.buyer
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, user: payload });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

// Real Database Google OAuth Controller
exports.googleLogin = async (req, res) => {
  const { credential, role = 'ARTISAN', email: directEmail, name: directName } = req.body;

  try {
    let email = directEmail || 'artisan.user@gmail.com';
    let name = directName || 'Artisan User';

    if (credential) {
      try {
        const decoded = jwt.decode(credential);
        if (decoded && decoded.email) {
          email = decoded.email;
          name = decoded.name || decoded.given_name || 'Google User';
        }
      } catch (e) {
        console.warn('Google JWT token decoding info');
      }
    }

    // Check or create real user in XAMPP MySQL Database
    let user = await prisma.user.findUnique({
      where: { phone: email },
      include: { artisan: true, buyer: true }
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash('google-auth-pass', 10);
      user = await prisma.user.create({
        data: {
          phone: email,
          password: hashedPassword,
          name,
          role,
          ...(role === 'ARTISAN' ? {
            artisan: {
              create: {
                craft: 'Handicraft',
                location: 'India',
                experience: 1,
                salesTotal: 0.0,
                ordersTotal: 0
              }
            }
          } : {
            buyer: {
              create: {
                companyName: `${name} Retail`,
                location: 'India',
                businessType: 'Retailer'
              }
            }
          })
        },
        include: { artisan: true, buyer: true }
      });
      console.log(`✅ Google Account created in MySQL DB: ${user.name}`);
    }

    const payload = {
      id: user.id,
      phone: user.phone,
      name: user.name,
      role: user.role,
      artisan: user.artisan,
      buyer: user.buyer
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, user: payload });
  } catch (error) {
    console.error('Google Auth DB Error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
};
