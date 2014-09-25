if (Posts.find().count() == 0){
	Posts.insert({
		title: 'Introducing Telescope',
		author: 'Sacha Grief',
		url: 'http://sachagreif.com/introducing-telescope/'
	});

	Posts.insert({
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com'
	});

	Posts.insert({
		title: 'The Meteor Book',
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com'
	});

	Posts.insert({
		title: 'Memoirs of a Mountain Guide',
		author: 'Lou Whittaker',
		url: 'http://louwhittaker.com'
	});
}