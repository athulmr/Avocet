const Config = require('../../../model/Config');
const SoldItem = require('../../../model/SoldItem');
const Restaurant = require('../../../model/Restaurant');


module.exports = {
    /**
     * Saves configurations of the restaurant.
     * @param {config} args Contains details about restaurant configurations.
     */
    saveConfig: async args => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const configInput = args.config;

            const result = await Restaurant.findById(configInput.restaurant)
                .then(restaurant => {
                    if (!restaurant) throw new Error('Restaurant not found');

                    // create new config if id not present
                    if(typeof(configInput.id) === 'undefined') {
                        const config = new Config(configInput);
                        
                        return config.save()
                        .then(savedConfig => {
                            // link this config in restaurant
                            restaurant.config = savedConfig
                                return restaurant.save()
                                .then(()=>{
                                    return {
                                        data: [savedConfig]
                                    };
                                });  
                        })
                        .catch(err => {
                            console.log("Cart Unable to save New data to DB", err.message);
                            return {
                                error: err.message
                            };
                        });
                    } else {
                        // Find the already existing config and update the same
                        return Config.findById(configInput.id)
                        .then(config => {
                            if (!config) throw new Error('Configuration not found');
                                                        
                            config.delivery = configInput.delivery
                            return config.save()
                            .then(savedConfig => {
                            
                                return {
                                    data: [savedConfig]
                                };
                            })
                            .catch(err => {
                                console.log("Cart Unable to save New data to DB", err.message);
                                return {
                                    error: err.message
                                };
                            });
                        })
                    }
                })
                .catch(err => {
                    console.log("Unable to save config",err);
                    return {
                        error: err.message
                    };
                });


            return result;

        } catch (err) {
            throw err;
        }
    }

}