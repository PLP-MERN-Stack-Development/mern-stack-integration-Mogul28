const { body } = require('express-validator');


exports.registerValidator = [
body('name').optional().isString().isLength({ min: 2 }),
body('email').isEmail().withMessage('Valid email required'),
body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];


exports.loginValidator = [
body('email').isEmail(),
body('password').exists()
];


exports.postCreateValidator = [
body('title').isString().isLength({ min: 3 }),
body('body').isString().isLength({ min: 10 })
];


exports.categoryValidator = [
body('name').isString().isLength({ min: 2 })
];