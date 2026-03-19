'use strict';

class AccessController {

    signUp = async (req, res, next) => {
        try{
            // Handle user signup logic here
            console.log('User signup request received:', req.body);

            return res.status(201).json({
                code: '20001',
                metadata: { userId: 1 }
            });

        } catch (error) {
            next(error);
        }
    }   
}

module.exports = new AccessController();