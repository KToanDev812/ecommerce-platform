'use strict';

const shopModel = require('../models/shop.model');
const bycrypt = require('bcrypt');
const crypto = require('crypto');

const RoleShop = {
    SHOP: "0001",
    WRITER: "0002",
    EDITOR: "0003",
    ADMIN: "0004"
}

class AccessService {

    static signUp = async ({ name, email, password }) => {
        try {

            const shopHolder = await shopModel.findOne({ email }).lean();

            if (shopHolder) {
                return {
                    code: 'xxxx',
                    message: 'Email already exists',
                    status: 'error'
                }
            }

            const passwordHash = await bycrypt.hash(password, 10);

            const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] });

            if (newShop) {
                // created privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                });
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

}

model.exports = AccessService;