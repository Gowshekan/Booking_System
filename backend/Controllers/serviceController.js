const Service = require("../Models/Service");

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({isActive: true});
        res.status(200).json({
            status: "success",
            results: services.length,
            services
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                status: "fail",
                message: "Service not found"
            });
        }
        res.status(200).json({
            status: "success",
            service
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json({
            status: "success",
            service: newService
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!service) {
            return res.status(404).json({
                status: "fail",
                message: "Service not found"
            });
        }
        res.status(200).json({
            status: "success",
            service
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, {isActive: false});
        if (!service) {
            return res.status(404).json({
                status: "fail",
                message: "Service not found"
            });
        }
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};