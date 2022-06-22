const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../db/db");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user = await user.save();
  res.send(user);
  console.log(user);
});

router.put("/:id", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  if (!users) return res.status(400).send("The given ID was not found....");
  res.send(users);
});

router.delete("/:id", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = await User.findByIdAndDelete(req.params.id);

  if (!users) return res.status(400).send("The given ID was not found....");

  res.send(users);
});

router.get("/:id", async (req, res) => {
  const error = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = await User.findById(req.params.id);

  res.send(users);
});

module.exports = router;
