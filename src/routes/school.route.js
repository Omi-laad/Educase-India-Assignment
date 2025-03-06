import express from "express";
import {
    addSchool,
    listSchools,
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



export default router;
