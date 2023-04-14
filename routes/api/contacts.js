const express = require('express')
const {
  getAllContacts,
  getContactInfoById,
  addNewContact,
  removeContactById,
  updateInfoContactById,
  updateStatusContact
} = require('../../controllers/contact/contacts');

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getContactInfoById)

router.post('/', addNewContact)

router.delete('/:contactId', removeContactById)

router.put('/:contactId', updateInfoContactById)

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router
