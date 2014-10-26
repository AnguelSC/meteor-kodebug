Practices = new Mongo.Collection("practices");
Practices.attachSchema(new SimpleSchema({
  lenguage: {
    type: String,
    allowedValues: [
    'php',
    'javascript',
    'htmlmixed'
    ],
    label: "Lenguage",
  },
  codeOriginal: {
    type: String,
    label: "Code Original",
    autoform: {
       rows: 5
    }
  },
  codeError: {
    type: String,
    label: "Code Error",
    autoform: {
       rows: 5
    }
  },
  points: {
    type: Number,
    label: "Points",
    min:0
  }
}));