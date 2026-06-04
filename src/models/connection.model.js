const mongoose = require('mongoose');

/**
 * Contact / Inquiry Form Schema
 */
const connectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[0-9]{10,15}$/,
        'Phone number must contain 10 to 15 digits'
      ]
    },

    interests: {
      type: [String],
      required: [true, 'Please select at least one interest'],
      enum: {
        values: [
          'Web Development',
          'Mobile Apps',
          'AI Solutions',
          'WhatsApp Integration',
          'Automation',
          'UI/UX Design',
          'Other'
        ],
        message: '{VALUE} is not a valid interest option'
      },
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one interest must be selected'
      }
    },

    customInterest: {
      type: String,
      trim: true,
      maxlength: [100, 'Custom interest cannot exceed 100 characters'],
      validate: {
        validator: function (value) {
          if (this.interests?.includes('Other')) {
            return value && value.trim().length > 0;
          }
          return true;
        },
        message: 'Please specify your custom interest'
      }
    },

    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/**
 * Indexes
 */
connectionSchema.index({ email: 1 });
connectionSchema.index({ createdAt: -1 });

/**
 * Clean customInterest when "Other" is not selected
 */
connectionSchema.pre('save', function () {
  if (!this.interests?.includes('Other')) {
    this.customInterest = undefined;
  }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;