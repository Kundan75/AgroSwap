import Tool from "../models/tool.js";
// import cloudinary from "../utils/cloudinary.js";

export const CreateTool = async (req, res) => {
  try {
    const { name, category, price, power, fuel, drive, location, description } =
      req.body;

    // 🔍 Required validation
    if (!name || !category || !price || !location) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path; // 🔥 already uploaded by middleware
    }

    // 🔥 Build object dynamically (IMPORTANT FIX)
    const toolData = {
      name,
      category,
      price,
      location,
      description,
      image: imageUrl,
      owner: req.user.id,
    };

    // ✅ Only add optional fields if they are valid
    if (power) toolData.power = power;
    if (fuel && fuel.trim() !== "") toolData.fuel = fuel;
    if (drive && drive.trim() !== "") toolData.drive = drive;

    const newTool = new Tool(toolData);

    await newTool.save();

    return res.status(201).json({
      success: true,
      message: "Tool created successfully",
      data: newTool,
    });
  } catch (error) {
    console.log("CreateTool Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find()
      .populate("owner", "fullName mobile") // optional
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tools",
      error: error.message,
    });
  }
};

export const getUserTools = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔒 Safety check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 🔥 Fetch only user's tools
    const tools = await Tool.find({ owner: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error("getUserTools Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};