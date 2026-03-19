'use strict';

const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'Keys';
const COLLECTION_NAME = 'Keys';

const keyTokenSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    }
  },
  {
    COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = model(DOCUMENT_NAME, keyTokenSchema);
