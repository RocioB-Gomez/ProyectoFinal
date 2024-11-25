const { validationResult, body, check } = require("express-validator");

//separamos las reglas por un lado
const rulesUser = () => [
    body('mail')
        .notEmpty().withMessage('El mail no puede estar vacío')
        .isEmail().withMessage('Por favor ingrese un mail válido')
        .normalizeEmail(),
    body('contraseña')
        .notEmpty().withMessage('La contraseña no puede estar vacía')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .isLength({ max: 16 }).withMessage('La contraseña debe tener menos de 16 caracteres')
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    body('nombre')
        .notEmpty().withMessage('El nombre no puede estar vacío')
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('El nombre solo puede contener letras'),
    body('apellido')
        .notEmpty().withMessage('El apellido no puede estar vacío')
        .isAlpha('es-ES', { ignore: ' ' }).withMessage('El apellido solo puede contener letras'),
    body('rol')
        .notEmpty().withMessage('El rol no puede estar vacío')
        .isIn(['Tutor', 'Docente', 'Institucion']).withMessage('El rol debe ser Tutor, Docente o Institucion')
];


const alumnoRules = () => [
    // Validación para DNI (ej. Argentina: 8 dígitos, sin puntos ni guiones)
    check('dni')
        .isInt({ min: 1000000, max: 99999999 })
        .withMessage('DNI debe ser un número de 7 a 8 dígitos'),

    // Validación para nombre (solo letras, mínimo 2 caracteres)
    check('nombre')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('El nombre debe contener solo letras')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    // Validación para apellido (solo letras, mínimo 2 caracteres)
    check('apellido')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('El apellido debe contener solo letras')
        .isLength({ min: 2, max: 50 })
        .withMessage('El apellido debe tener entre 2 y 50 caracteres'),

    check('anio_ingreso')
        .isInt().withMessage('El año de ingreso debe ser un entero'),
       
    check('curso')
        .matches(/^[A-Z][1-9]$/).withMessage('El curso debe ser una letra mayúscula seguida de un número del 1 al 9')

];

   
  
  

// y el atrapador de errores por otro lado
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = { validate, rulesUser, alumnoRules };
