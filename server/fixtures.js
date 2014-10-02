// if the database is empty, put some test data in it
if (Posts.find().count() === 0){

	// save now to a variable
	var now = new Date().getTime();

	// create a couple of users
	var createUser = function(userName){
		var userId = Meteor.users.insert({
			profile: {name: userName}
		});
		return Meteor.users.findOne(userId);
	};
	var tom = createUser('Tom Coleman');
	var sacha = createUser('Sacha Greif');

	// create a coupe of posts and comments
	var telescopeId = Posts.insert({
		title: 'Introducing Telecsope',
		userId: sacha._id,
		author: sacha.profile.name,
		url: 'http://sachagreif.com/introducing-telescope',
		submitted: now - 7 * 24 * 3600 * 1000
	});
	Comments.insert({
		postId: telescopeId,
		userId: tom._id,
		author: tom.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: 'Interesting project Sacha, can I get involved?'
	});
	Comments.insert({
		postId: telescopeId,
		userId: sacha._id,
		author: sacha.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'You sure can Tom!'
	});

	Posts.insert({
		title: 'Meteor',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://meteor.com',
		submitted: now - 10 * 3600 * 1000
	});

	Posts.insert({
		title: 'The Meteor Book',
		userId: tom._id,
		author: tom.profile.name,
		url: 'http://themeteorbook.com',
		submitted: now - 12 * 3600 * 1000
	})
}
