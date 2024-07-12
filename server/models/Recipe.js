const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    imageUrl: { type: String },
    difficulty: { type: Number, min: 1, max: 5, required: true },
    cookingTime: { type: String, required: true },
    description: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);