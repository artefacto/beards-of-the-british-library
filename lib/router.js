Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  waitOn: function(){
    return [Meteor.subscribe('items'), Meteor.subscribe('publishedAnnotations')];
  }

});

Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('about');
  this.route('contact');


this.route('Admin', {
  path: '/admin',
  template: 'Admin',
  onBeforeAction: AccountsTemplates.ensureSignedIn
});

this.route('myCollection',{
    path: '/my-collection'
})

    this.route('fullCollection',{
        path: '/full-collection',
        template: 'full_collection'
    })


    this.route('userAccount', {
        waitOn: function() {
            return [Meteor.subscribe('items'), Meteor.subscribe('favorites')];
        },
        path: '/users/:_id',
        template: 'watercooler'
        });


    this.route('slideshow', {
        path: '/slideshow'
    });


    this.route('categories', {
        path: '/categories'
    });

    this.route('browse_by_popularity', {
        waitOn: function() {
            return [Meteor.subscribe('items'), Meteor.subscribe('favorites')];
        },
        data: function(){
            return Items.find()
        },
        path: '/most_collected'
    });

this.route('items', {
        layoutTemplate:'layout',

        path:'/:name',

        waitOn: function() {
            return [Meteor.subscribe('items'), Meteor.subscribe('favorites')];
          },
        data: function() {
            Session.set('category',this.params.name);
            },
        template:'layout'
    });

});


Router.route('/item/:slug', {
    name: 'itemShow',
    template: 'itemShow',
    subscriptions: function() {
        return Meteor.subscribe('singleItem', this.params.slug);
    },
    data: function() {
        var item = Items.findOne({"slug": this.params.slug});
        if (item) {
            return item;
        }
    }
});

Router.route('/category/:name', {
    name: 'byCategory',
    template: 'browse_by_category',
    data: function(){
        Session.set('category',this.params.name);
        var category = category

        return Items.findOne({ categoryName: category });
    }
});

Router.plugin('ensureSignedIn', {
  only: ['admin']
});


