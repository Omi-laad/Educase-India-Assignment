import express from "express";
import {
    addSchool,
    listSchools,
    getSchoolById,
    deleteSchoolById,
    deleteAllSchools
} from "../controllers/school.controller.js";

const router = express.Router();

/**
 * @route POST /addSchool
 * @desc Add a new school
 */
router.post("/addSchool", addSchool);

/**
 * @route GET /listSchools
 * @desc Get all schools sorted by proximity
 */
router.get("/listSchools", listSchools);

/**
 * @route GET /getSchool/:id
 * @desc Get a school by ID
 */
router.get("/getSchool/:id", getSchoolById);

/**
 * @route DELETE /deleteSchool/:id
 * @desc Delete a school by ID
 */
router.delete("/deleteSchool/:id", deleteSchoolById);

/**
 * @route DELETE /deleteAllSchools
 * @desc Delete all schools
 */
router.delete("/deleteAllSchools", deleteAllSchools);

export default router;
