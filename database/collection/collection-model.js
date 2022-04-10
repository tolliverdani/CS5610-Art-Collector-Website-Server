import mongoose from "mongoose";
import collectionSchema from "./collection-schema.js";

const collectionModel = mongoose.model(
    'CollectionModel',
    collectionSchema
);

export default collectionModel;