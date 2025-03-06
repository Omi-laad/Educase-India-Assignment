import { Litigant } from "../models/litigant.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"



export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "UnAuthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        const litigant = await Litigant.findById(decodedToken?._id)
            .select("-password -refreshToken")

        if (!litigant) {
            throw new ApiError(401, "Invalid Access token")
        }

        req.litigant = litigant;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }



})


