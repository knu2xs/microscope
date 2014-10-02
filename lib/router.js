Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function () {
        return [
          Meteor.subscribe('posts'),
          Meteor.subscribe('comments')
        ];
    }
});

Router.map(function () {
    this.route('postsList', { path: '/' });

    this.route('postPage', {
        path: '/posts/:_id',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });

    this.route('postEdit', {
        path: '/posts/:_id/edit',
        data: function(){
            return Posts.findOne(this.params._id);
        }
    });

    this.route('postSubmit', {
        path: '/submit'
    });
});

var requireLogin = function(pause){
    if (!Meteor.user()){
        if (Meteor.loggingIn()){
            this.render('loading')
        } else {
            this.render('accessDenied');
        }
        pause();
    }
};

// display spinner while loading data
Router.onBeforeAction('loading');

// display spinner when submitting a new post
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

// clear error list
Router.onBeforeAction(function(){ clearErrors() });
