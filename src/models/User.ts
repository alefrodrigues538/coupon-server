import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

// Define uma interface para o seu documento Mongoose (opcional, mas recomendado para tipagem)
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}

// Define o Schema do Mongoose
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, {
  timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
});

// pré-salvamento para hash de senha (você deve usar uma lib como bcrypt)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export const User = model<IUser>('User', UserSchema);