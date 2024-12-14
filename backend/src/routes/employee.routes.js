const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Employee = require('../models/Employee');
const authMiddleware = require('../middlewares/auth.middleware');

// Configuration de Multer pour l'upload des photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/employees';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Seules les images (jpeg, jpg, png) sont autorisées'));
  }
});

// Obtenir tous les employés
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Obtenir un employé par ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Créer un nouvel employé
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const employeeData = req.body;
    if (req.file) {
      employeeData.photoUrl = `/uploads/employees/${req.file.filename}`;
    }

    const employee = new Employee(employeeData);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Mettre à jour un employé
router.put('/:id', authMiddleware, upload.single('photo'), async (req, res) => {
  try {
    const employeeData = req.body;
    if (req.file) {
      employeeData.photoUrl = `/uploads/employees/${req.file.filename}`;
      
      // Supprimer l'ancienne photo
      const oldEmployee = await Employee.findById(req.params.id);
      if (oldEmployee?.photoUrl) {
        const oldPhotoPath = path.join(__dirname, '../../', oldEmployee.photoUrl);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      employeeData,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    res.json(employee);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Supprimer un employé
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    // Supprimer la photo si elle existe
    if (employee.photoUrl) {
      const photoPath = path.join(__dirname, '../../', employee.photoUrl);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await employee.remove();
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Mettre à jour le statut de présence
router.post('/:id/attendance', authMiddleware, async (req, res) => {
  try {
    const { status, date } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    // Ajouter ou mettre à jour le statut de présence
    const presenceIndex = employee.presence.findIndex(
      p => p.date.toISOString().split('T')[0] === date
    );

    if (presenceIndex > -1) {
      employee.presence[presenceIndex].status = status;
    } else {
      employee.presence.push({ date, status });
    }

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router; 