//1. registerCompany
//2. getCompanies
//3. getCompanybyId
//4. updateCompany
const Company = require("../Models/company.model");
const asyncHandler = require("../utils/asyncHandler");
const errorHandler = require("../utils/errorHandler");

exports.registerCompany = asyncHandler(async (req, res, next) => {
  try {
    // const { name, description, website, location, logo } = req.body;
    const { name } = req.body;
    if (!name) {
      return next(new errorHandler(400, "Please provide name"));
    }
    let company = await Company.findOne({ name });
    if (company) {
      return next(
        new errorHandler(
          400,
          "Company already exists you cannot register the same company twice"
        )
      );
    }
    company = await Company.create({
      name,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.getCompanies = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return next(new errorHandler(404, "No companies found"));
    }
    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
exports.getCompanyById = asyncHandler(async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return next(new errorHandler(404, "Company not found"));
    }
    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
exports.updateCompany = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, website, location } = req.body;
    const logo = req.file;
    // cloudinary upload here;
    const companyId = req.params.id;
    let company = await Company.findByIdAndUpdate(
      companyId,
      {
        name,
        description,
        website,
        location,
      },
      { new: true }
    );

    if (!company) {
      return next(new errorHandler(404, "Company not found"));
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
