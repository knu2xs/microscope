// deliberately global client side variable
Errors = new Meteor.Collection(null);

// method to call to throw an error
throwError = function(message){
    Errors.insert({
        message: message,
        seen: false
    });
};

// clear error if it has been seen
clearErrors = function() {
    Errors.remove({seen: true});
};

// set up helpers
Template.error.helpers({
    errors: function(){
        return Errors.find();
    }
});

// set up defer action to enable clear errors to work properly
Template.error.rendered = function(){
    var error = this.data;
    Meteor.defer(function(){
        Errors.update(error._id, {$set: {seen: true} });
    });
};