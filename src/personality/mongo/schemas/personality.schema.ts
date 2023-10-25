import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class MongoPersonality extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ unique: true, sparse: true })
  wikidata: string;

  @Prop({ type: Boolean, default: false, required: true })
  isHidden: boolean;
}

export const PersonalitySchema = SchemaFactory.createForClass(MongoPersonality);

// Create a virtual field 'id' that gets/sets '_id'
PersonalitySchema.virtual('id').get(function () {
  return this._id.toHexString();
}).set(function (id) {
  this._id = id;
});
