module.exports = mongoose => {
  var schema = mongoose.Schema(
    {_id: String,
      title: String,
      authors: String,
      source: String,
      pubyear: String,
      doi: String,
      claim: String,
      evidence: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Article = mongoose.model("article", schema);
  return Article;
};
