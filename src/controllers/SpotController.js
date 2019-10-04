const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res){
        const { tech } = req.query;
        const spots = await Spot.find({ technologies: tech });

        return res.json(spots);
    },

    async store(req, res){
        const { filename } = req.file;
        const { company, technologies, price } = req.body;
        const { user_id } = req.headers; 

        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({ error: "The user specified does not exists"})
        }

        const spot = await Spot.create({
            user: user_id,
            company,
            price,
            thumbnail: filename,
            technologies: technologies.split(',').map(technologies => technologies.trim()),
        })

        return res.json(spot);

    }
}