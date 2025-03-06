import School from "../models/school.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @desc    Add a new school
 * @route   POST /addSchool
 * @access  Public
 */
export const addSchool = asyncHandler(async (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    // ✅ Input Validation
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return next(new ApiError(400, "All fields are required!"));
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return next(new ApiError(400, "Latitude and longitude must be numbers"));
    }

    // ✅ Create new school
    const newSchool = await School.create({ name, address, latitude, longitude });

    res.status(201).json(new ApiResponse(201, newSchool, "School added successfully!"));
});

/**
 * @desc    List all schools sorted by proximity
 * @route   GET /listSchools
 * @access  Public
 */
export const listSchools = asyncHandler(async (req, res, next) => {
    const { latitude, longitude } = req.query;

    // ✅ Input Validation
    if (!latitude || !longitude) {
        return next(new ApiError(400, "Latitude and longitude are required!"));
    }

    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        return next(new ApiError(400, "Latitude and longitude must be valid numbers"));
    }

    // ✅ Fetch all schools
    const schools = await School.findAll();

    if (!schools.length) {
        return res.status(200).json(new ApiResponse(200, [], "No schools found."));
    }

    // ✅ Sorting schools by proximity using the Haversine formula
    const sortedSchools = schools.map(school => {
        const schoolLatitude = school.latitude;
        const schoolLongitude = school.longitude;

        // Haversine Formula to calculate distance (in kilometers)
        const distance = getDistance(userLatitude, userLongitude, schoolLatitude, schoolLongitude);

        return { ...school.toJSON(), distance };
    }).sort((a, b) => a.distance - b.distance);

    // ✅ Respond with sorted school list
    res.status(200).json(new ApiResponse(200, sortedSchools, "Schools sorted by proximity."));
});

/**
 * @desc    Get a school by ID
 * @route   GET /getSchool/:id
 * @access  Public
 */
export const getSchoolById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // ✅ Find school by ID
    const school = await School.findByPk(id);

    if (!school) {
        return next(new ApiError(404, "School not found"));
    }

    res.status(200).json(new ApiResponse(200, school, "School retrieved successfully."));
});

/**
 * @desc    Delete a school by ID
 * @route   DELETE /deleteSchool/:id
 * @access  Public
 */
export const deleteSchoolById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // ✅ Find school by ID
    const school = await School.findByPk(id);

    if (!school) {
        return next(new ApiError(404, "School not found"));
    }

    // ✅ Delete school
    await school.destroy();

    res.status(200).json(new ApiResponse(200, {}, "School deleted successfully."));
});

/**
 * @desc    Delete all schools
 * @route   DELETE /deleteAllSchools
 * @access  Public
 */
export const deleteAllSchools = asyncHandler(async (req, res, next) => {
    // ✅ Delete all schools
    await School.destroy({ where: {} });

    res.status(200).json(new ApiResponse(200, {}, "All schools deleted successfully."));
});

/**
 * Haversine Formula: Calculates the distance between two coordinates on Earth.
 * @param {number} lat1 - User's latitude
 * @param {number} lon1 - User's longitude
 * @param {number} lat2 - School's latitude
 * @param {number} lon2 - School's longitude
 * @returns {number} Distance in kilometers
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
};
