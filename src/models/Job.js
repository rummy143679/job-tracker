import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    link: { type: String },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected", "saved"],
      default: "applied",
    },
    appliedDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
