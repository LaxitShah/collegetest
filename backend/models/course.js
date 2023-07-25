const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        unique: true
    },
    college: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    }]
});

// Define pre 'remove' middleware on the College schema
courseSchema.pre('remove', function(next) {
    const collegeId = this._id;

    // Update all courses that reference the deleted college
    this.model('Course').updateMany(
        { college: collegeId },
        { $pull: { college: collegeId } }
    )
        .then(() => next())
        .catch(next);
});

module.exports = mongoose.model('Course', courseSchema);
