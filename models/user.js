const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String
    }
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'username']);
};

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
});


UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;

    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

UserSchema.statics.findAndUpdatePassword = function (_id, password) {
    const User = this;

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                const hashedPassword = hash;
                User.findOneAndUpdate({ _id},{ $set: { password: hashedPassword } }, { new: true }).then(user => {
                    if (user) {
                        resolve(user)
                    } else {
                        reject(new Error('No User Found'));
                    }
                });
            });
        });
    });


}

const User = mongoose.model('User', UserSchema);

module.exports = User;