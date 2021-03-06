var mongoose = require("mongoose");
//schema setup
var commentSchema = new mongoose.Schema({
   text: String,
   createdAt: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

// compile a schema into a model
module.exports = mongoose.model("Comment", commentSchema);
