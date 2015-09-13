Meteor.startup(function() {

  if (Items.find().count() === 0) {

  var items = JSON.parse(Assets.getText("data/sample-data.json"));

  for (var i = 0, len = items.length; i < len; i++) {
    var item = items[i];

    Items.insert({
      title: item.title,
      slug:item.title.replace(/\s/g,'-').substring(0, 50), //crate a slug
      url: item.url,
      description: item.description || item.identifier,
      order: item.order,
      date: item.date,
      medium: item.medium,
      categoryName: item.categoryName,
      artist: item.artist || item.author,
      place: item.place,
      shelfmark: item.shelfmark
    });
  }
}

  if (Categories.find().count() === 0) {
    // Some initial categories
    Categories.insert({
      name: 'Beards'
    });
    Categories.insert({
      name: 'Pirates'
    });
    Categories.insert({
      name: 'Cats'
    });
    Categories.insert({
      name: 'Mustaches'
    });
    Categories.insert({
      name: 'Boredom'
    });
    Categories.insert({
      name: 'Canada'
    });
  }
});

Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schema.contact);

    // Build the e-mail text
    var text = "Name: " + doc.name + "\n\n"
        + "Email: " + doc.email + "\n\n\n\n"
        + doc.message;

    this.unblock();

    // Send the e-mail
    Email.send({
      to: "hello@artefacto.org.uk",
      from: doc.email,
      subject: "Curatorial Contact Form - Message From " + doc.name,
      text: text
    });
  }


});

Meteor.publish("items", function() {
  return Items.find();
});

Meteor.publish("categories", function() {
  return Categories.find();
})

Meteor.publish('singleItem', function(slug){
  check(slug, String);
  var data = Items.find({"slug": slug});
  if (data) {
    return data;
  }
  this.ready();
});

// return the user's own annotations only
Meteor.publish('itemAnnotations', function() {
  return Annotations.find({
    author: this.userId
  });
});

  //public annotations
  Meteor.publish('publishedAnnotations', function() {
    return Annotations.find({
      publish:true
    });
});

Meteor.publish('userByUsername', function(username){
  return Meteor.users.find({});
})

Sortable.collections = Favorites;
Sortable.collections = Items;