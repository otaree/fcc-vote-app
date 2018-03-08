const User = require('../models/user');
const Poll = require('../models/poll');

const user_createPoll = (formData, user) => {
    var body = {options: []};
    var count = 0;
    for (let prop in formData) {
        if (formData[prop].trim() !== '') {
            
           if (prop.indexOf('option') !== -1) { 
               if (body.options.indexOf(formData[prop]) !== -1) {
                   continue;
               }              
               body.options.push({text: formData[prop]});
           } else {
               body["question"] = formData[prop];
           }
           count++;
        }
    }

    if (count < 3) {
        return Promise.reject(new Error('Fill the form correctly'));
    }

    const newPoll = new Poll();
    newPoll.question = body.question;
    newPoll.options = body.options;
    newPoll.author = user._id;

    return new Promise((resolve, reject) => {
        newPoll.save()
            .then(poll => resolve(poll))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

module.exports = { user_createPoll };
