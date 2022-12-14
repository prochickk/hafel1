const express = require("express");
const router = express.Router();

const Driver = require('../store/Driver');


router.get("/", async (req, res) => {
    try {
        let driversNotConf = await Driver.find({ groupConfirmation: false})
        if (!driversNotConf[0]){
            driversNotConf = [{
                name: "لا يوجد أي طلبات للتوثيق",
                group: '',
                email: "",
                mobileNumber: "0",
                groupConfirmation: null,
                id: 5
            }]}

        console.log("driversNotConf", driversNotConf)
        res.status(201).send(driversNotConf);

    } catch (error) {
        console.log(error.message)
    return res.status(404).send(error.message)
  }

});

router.post("/", async (req, res) => {
    console.log("req.params.id", req.query.id)
   
    try {
        let updateConfirm = await Driver.updateOne({ id: parseInt(req.query.id) }, { $set: { groupConfirmation: true }})
        res.status(201).send(updateConfirm)

    } catch (error) {
        console.log(error.message)
    return res.status(404).send(error.message)
  }

});

router.put("/", async (req, res) => {
    console.log("req.query.id", req.query.id)

      try {
        
        const confirmDelete = await Driver.updateOne(
            {id: req.query.id}, { $unset: {groupConfirmation: ""}})

        } catch (error) {
          console.log(error.message)
          return res.status(404).send(error.message)
        }
    });

module.exports = router;

