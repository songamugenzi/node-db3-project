const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove,
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then((scheme) => {
      if (!scheme) {
        return null;
      } else {
        return scheme;
      }
    });
}

function findSteps(id) {
  return db("steps as c")
    .join("schemes as s", "s.id", "c.scheme_id")
    .select("s.scheme_name", "c.step_number", "c.instructions")
    .where({ scheme_id: id })
    .orderBy("c.step_number");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addStep(stepData, id) {
  return db("steps")
    .where("scheme_id", id)
    .insert(stepData)
    .then(() => {
      return stepData;
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes").where({ id }).del();
}
