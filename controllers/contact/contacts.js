const { ContactModel } = require('../../database/model/contact.model');
const { contactSchema, favoriteJoiSchema } = require('../../schemas/contacts');



const getAllContacts = async (req, res, next) => {
    const user = req.user;
    const contacts = await ContactModel.find({ owner: user });
    res.json(contacts);
};

const getContactInfoById = async (req, res, next) => {

    const { contactId } = req.params;
    const contact = await ContactModel.findById(contactId)
        .catch((error) => {
            const err = Error(error.message);
            err.code = 404;
            throw err;
        });
    if (!contact) {
        const error = new Error('Nothing found');
        error.code = 404;
        throw error;
    }

    res.json({
        status: "success",
        code: 200,
        data: {
            contact,
        }
    });

};

const addNewContact = async (req, res, next) => {

    const user = req.user;
    const { name, email, phone, favorite } = req.body;
    const { error } = contactSchema.validate({ name, email, phone, favorite });
    if (error) {
        const e = new Error(error.message);
        e.code = 400;
        throw e
    }
    const newContact = await ContactModel.create({ name, email, phone, favorite, owner: user });
    res.status(201).send(newContact);


};

const removeContactById = async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;
    const contact = await ContactModel.findByIdAndDelete(contactId, { owner: user })
        .catch((error) => {
            const err = Error(error.message)
            err.code = 400
            throw err
        })

    if (!contact) {
        const error = new Error('Nothing found');
        error.code = 404;
        throw error;
    }
    res.status(204).send({ message: 'Contact remove' });
};

const updateInfoContactById = async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { error } = contactSchema.validate({ name, email, phone, favorite });
    if (error) {
        const e = new Error(error.message);
        e.code = 400;
        throw e
    }
    const contact = await ContactModel.findByIdAndUpdate(contactId, { name, email, phone, favorite, owner: user })
        .catch((error) => {
            const err = Error(error.message);
            err.code = 400;
            throw err;
        });

    if (!contact) {
        const error = new Error('Nothing found');
        error.code = 404;
        throw error;
    }
    res.status(200).json(contact);

};

const updateStatusContact = async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { error } = favoriteJoiSchema.validate({ favorite });
    if (error) {
        const e = new Error(error.message);
        e.code = 400;
        throw e
    }
    const contact = await ContactModel.findByIdAndUpdate(contactId, { owner: user }, { favorite }, { new: true })
        .catch((error) => {
            const err = Error(error.message);
            err.code = 400;
            throw err;
        });

    if (!contact) {
        const error = new Error('Nothing found');
        error.code = 404;
        throw error;
    }
    res.status(200).json(contact);
};



module.exports = {
    getAllContacts,
    getContactInfoById,
    addNewContact,
    removeContactById,
    updateInfoContactById,
    updateStatusContact,

};