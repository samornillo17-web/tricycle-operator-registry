const express = require("express");

const router = express.Router();

const Tricycle = require("../models/Tricycle");


// ==========================================
// GET ALL TRICYCLES
// ==========================================

router.get("/", async (req, res) => {

  try {

    const tricycles = await Tricycle
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json(tricycles);

  } catch (error) {

    console.error(
      "GET TRICYCLES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to retrieve tricycles."
    });
  }
});


// ==========================================
// GET ONE TRICYCLE
// ==========================================

router.get("/:id", async (req, res) => {

  try {

    const tricycle =
      await Tricycle.findById(req.params.id);

    if (!tricycle) {

      return res.status(404).json({
        message: "Tricycle not found."
      });
    }

    res.status(200).json(tricycle);

  } catch (error) {

    console.error(
      "GET ONE TRICYCLE ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to retrieve tricycle."
    });
  }
});


// ==========================================
// CREATE TRICYCLE
// ==========================================

router.post("/", async (req, res) => {

  try {

    const {
      body_number,
      driver_name,
      plate_number,
      route,
      status
    } = req.body;


    // Validation

    if (
      !body_number ||
      !driver_name ||
      !plate_number ||
      !route ||
      !status
    ) {

      return res.status(400).json({
        message: "All fields are required."
      });
    }


    // Check duplicate body number

    const existingBodyNumber =
      await Tricycle.findOne({
        body_number: body_number.trim()
      });

    if (existingBodyNumber) {

      return res.status(409).json({
        message:
          "Body number already exists."
      });
    }


    // Check duplicate plate number

    const existingPlate =
      await Tricycle.findOne({
        plate_number: plate_number.trim()
      });

    if (existingPlate) {

      return res.status(409).json({
        message:
          "Plate number already exists."
      });
    }


    // Create

    const tricycle =
      await Tricycle.create({
        body_number: body_number.trim(),
        driver_name: driver_name.trim(),
        plate_number: plate_number.trim(),
        route: route.trim(),
        status
      });


    res.status(201).json({
      message:
        "Tricycle registered successfully.",
      tricycle
    });

  } catch (error) {

    console.error(
      "CREATE TRICYCLE ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to register tricycle."
    });
  }
});


// ==========================================
// UPDATE TRICYCLE
// ==========================================

router.put("/:id", async (req, res) => {

  try {

    const {
      body_number,
      driver_name,
      plate_number,
      route,
      status
    } = req.body;


    if (
      !body_number ||
      !driver_name ||
      !plate_number ||
      !route ||
      !status
    ) {

      return res.status(400).json({
        message:
          "All fields are required."
      });
    }


    const tricycle =
      await Tricycle.findById(
        req.params.id
      );

    if (!tricycle) {

      return res.status(404).json({
        message:
          "Tricycle not found."
      });
    }


    // Check body number belonging to another unit

    const duplicateBody =
      await Tricycle.findOne({
        body_number: body_number.trim(),
        _id: {
          $ne: req.params.id
        }
      });

    if (duplicateBody) {

      return res.status(409).json({
        message:
          "Body number already exists."
      });
    }


    // Check plate number belonging to another unit

    const duplicatePlate =
      await Tricycle.findOne({
        plate_number: plate_number.trim(),
        _id: {
          $ne: req.params.id
        }
      });

    if (duplicatePlate) {

      return res.status(409).json({
        message:
          "Plate number already exists."
      });
    }


    tricycle.body_number =
      body_number.trim();

    tricycle.driver_name =
      driver_name.trim();

    tricycle.plate_number =
      plate_number.trim();

    tricycle.route =
      route.trim();

    tricycle.status =
      status;


    await tricycle.save();


    res.status(200).json({
      message:
        "Tricycle updated successfully.",
      tricycle
    });

  } catch (error) {

    console.error(
      "UPDATE TRICYCLE ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update tricycle."
    });
  }
});


// ==========================================
// DELETE TRICYCLE
// ==========================================

router.delete("/:id", async (req, res) => {

  try {

    const tricycle =
      await Tricycle.findByIdAndDelete(
        req.params.id
      );

    if (!tricycle) {

      return res.status(404).json({
        message:
          "Tricycle not found."
      });
    }


    res.status(200).json({
      message:
        "Tricycle deleted successfully."
    });

  } catch (error) {

    console.error(
      "DELETE TRICYCLE ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete tricycle."
    });
  }
});


module.exports = router;