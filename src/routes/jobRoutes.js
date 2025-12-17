import express from "express";
import Job from "../models/Job.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/jobs?status=&search=
router.get("/", protect, async (req, res) => {
  const { status, search } = req.query;
  const query = { user: req.user._id };

  if (status && status !== "all") query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  const jobs = await Job.find(query).sort({ createdAt: -1 });
  res.json(jobs);
});

// POST /api/jobs
router.post("/", protect, async (req, res) => {
  const { title, company, link, status, appliedDate, notes } = req.body;
  const job = await Job.create({
    user: req.user._id,
    title,
    company,
    link,
    status,
    appliedDate,
    notes,
  });
  res.status(201).json(job);
});

// PUT /api/jobs/:id
router.put("/:id", protect, async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found" });

  Object.assign(job, req.body);
  const updated = await job.save();
  res.json(updated);
});

// DELETE /api/jobs/:id
router.delete("/:id", protect, async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found" });

  await job.deleteOne();
  res.json({ message: "Job removed" });
});

export default router;
