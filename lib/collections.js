Items = new Mongo.Collection('items');
Categories = new Mongo.Collection('categories');
Annotations = new Mongo.Collection('annotations');

Items.initEasySearch('title');

Items.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
    slug: {
        type: String,
        label: "Slug",
        max: 50
    },
  description: {
    type: String,
    label: "description",
    optional: true
  },
 medium: {
    type: String,
    label: "medium",
    optional: true
  },
  categoryName: {
    type: String,
    label: "category",
    optional: true
  },
  url: {
    type: String,
    label: "url",
    optional: true
  },
  order: {
    type: Number,
    label: "order",
    optional: true
  },
  place: {
    type: String,
    label: "Place of publication",
    optional: true
  },
  date: {
    type: Number,
    label: "date",
    optional: true
  },
  artist: {
    type: String,
    label: "artist",
    optional: true
  },
  shelfmark: {
    type: String,
    label: "shelfmark",
    optional: true
  }
}));


Annotations.attachSchema(new SimpleSchema({
  itemId: {
    type: String,
    label: "itemID"
  },
  body: {
    type: String,
    label: "Body",
    optional: true
  },
    publish: {
        type: [Boolean],
        label: "Public?",
        optional: true
    },
  author: {
      type: String,
      autoValue:function(){ return this.userId }
  }

  }));



Categories.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    }
}));


Schema = {};
Schema.contact = new SimpleSchema({
    name: {
        type: String,
        label: "Your name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});


// Config for editable text widget
EditableText.useTransactions = true;
