import { Request, Response } from "express";
import { ProfilesService } from "./profilesService";
import { createProfileSchema, updateProfileSchema } from "./schemas/profilesZodSchema";
import { ZodError } from "zod";

const profilesService = new ProfilesService();

export const createProfile = async (req: Request, res: Response) => {
  try {
    const validatedData = createProfileSchema.parse(req.body);
    const profile = await profilesService.createProfile(validatedData);
    res.status(201).json(profile);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getAllProfiles = async (_req: Request, res: Response) => {
  try {
    const profiles = await profilesService.getAllProfiles();
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await profilesService.getProfileById(id);
    res.json(profile);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProfileSchema.parse(req.body);
    const profile = await profilesService.updateProfile(id, validatedData);
    res.json(profile);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    res.status(404).json({ error: error.message });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await profilesService.deleteProfile(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
