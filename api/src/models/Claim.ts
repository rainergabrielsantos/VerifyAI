import mongoose, { Schema, Document } from 'mongoose';

export interface IClaim extends Document {
  id: string; // Keep custom ID for frontend compatibility
  timestamp: string;
  category: string;
  status: string;
  confidence: number;
  headline: string;
  description: string;
  thumbnail: string;
  viralMetrics: {
    shares: string;
    reach: string;
    platforms: number;
  };
  sources: string[];
  expert: string;
}

const ClaimSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  confidence: { type: Number, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  viralMetrics: {
    shares: { type: String, required: true },
    reach: { type: String, required: true },
    platforms: { type: Number, required: true }
  },
  sources: [{ type: String }],
  expert: { type: String, required: true }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export const Claim = mongoose.models.Claim || mongoose.model<IClaim>('Claim', ClaimSchema);
