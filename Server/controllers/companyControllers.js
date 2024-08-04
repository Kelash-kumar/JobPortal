//1. registerCompany
//2. getCompanies
//3. getCompanybyId
//4. updateCompany
const Company = require('../Models/company.model');
const User = require('../Models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const errorHandler = require('../utils/errorHandler');


exports.registerCompany = asyncHandler(async (req, res, next) => {
    try {
        // const { name, description, website, location, logo } = req.body;
       const {name} = req.body;
        if (!name) {
            return next(new errorHandler(400, 'Please provide name'));
        }
        let company = await Company.findOne({ name });
        if (company) {
            return next(new errorHandler(400, 'Company already exists you cannot register the same company twice'));
        }
         company = await Company.create({
            name,
            userId: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Company registered successfully',
            company,
        });
    } catch (error) {
        return next(new errorHandler(500, error.message));
    }
});
