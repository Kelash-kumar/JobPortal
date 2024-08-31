//1. registerCompany
//2. getCompanies
//3. getCompanybyId
//4. updateCompany
const Company = require("../Models/company.model");
const asyncHandler = require("../utils/asyncHandler");
const errorHandler = require("../utils/errorHandler");
const upload = require("../middlewares/upload");
const cloudinary = require("cloudinary").v2;
const { getDataUriParser } = require("../utils/getDatauri");

exports.registerCompany = asyncHandler(async (req, res, next) => {
  try {
    // const { name, description, website, location, logo } = req.body;
    const { name } = req.body;
    if (!name) {
      return next(new errorHandler(400, "Please provide company name"));
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
exports.updateCompany = [
  upload.single("logo"),

  asyncHandler(async (req, res, next) => {
    try {
      const { name, description, website, location } = req.body;
      let uploadedCompanyLogoURL = null;
      const logo = req.file;
      // cloudinary upload here;
      if (logo) {
        //saving logo to cloudinay
        const CompanyLogoURI = getDataUriParser(logo);
        const uploadCompanyLogo = await cloudinary.uploader.upload(
          CompanyLogoURI
        );
        uploadedCompanyLogoURL = uploadCompanyLogo.secure_url;
      }
      const companyId = req.params.id;
      if (!name || !description || !location) {
        return next(new errorHandler(401, "fill all fields"));
      }
      let company = await Company.findByIdAndUpdate(
        companyId,
        {
          name,
          description,
          website,
          location,
          logo: uploadedCompanyLogoURL,
        },
        { new: true }
      );

      if (!company) {
        return next(new errorHandler(404, "Company  not exsit"));
      }

      res.status(200).json({
        success: true,
        message: "Company updated successfully",
        company,
      });
    } catch (error) {
      return next(new errorHandler(500, error.message));
    }
  }),
];

exports.deleteCompany =async(req,res,next)=>{
  try {
    const companyId = req.params.id;
    await Company.findByIdAndDelete(companyId);
    res.status(200).json({message:"successfully deleted "})
  } catch (error) {
    return next(new errorHandler(500,error.message))
  }
}