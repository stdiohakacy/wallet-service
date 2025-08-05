import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BASE_SCHEMA } from './base.schema';

@Schema({ timestamps: true })
export class BaseOrmDocument extends Document {
    @Prop({ type: String })
    [BASE_SCHEMA.FIELDS.ID]: string;

    @Prop({ type: String })
    [BASE_SCHEMA.FIELDS.CREATED_BY]?: string;

    @Prop({ type: Date, default: Date.now })
    [BASE_SCHEMA.FIELDS.CREATED_AT]?: Date;

    @Prop({ type: String })
    [BASE_SCHEMA.FIELDS.UPDATED_BY]?: string;

    @Prop({ type: Date })
    [BASE_SCHEMA.FIELDS.UPDATED_AT]?: Date;

    @Prop({ type: String })
    [BASE_SCHEMA.FIELDS.DELETED_BY]?: string;

    @Prop({ type: Date })
    [BASE_SCHEMA.FIELDS.DELETED_AT]?: Date;

    @Prop({ type: Boolean, default: false })
    [BASE_SCHEMA.FIELDS.DELETED]?: boolean;
}

export const BaseOrmSchema = SchemaFactory.createForClass(BaseOrmDocument);
