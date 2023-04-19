const express = require('express')
const {
  getAllContacts,
  getContactInfoById,
  addNewContact,
  removeContactById,
  updateInfoContactById,
  updateStatusContact
} = require('../../controllers/contact/contacts');
const { userAuthMiddleware } = require('../../middlewares/user-auth.middlewares');
const { controllerWrapper } = require('../../services/controller-wrapper.service')

const router = express.Router()

router.get('/', userAuthMiddleware, controllerWrapper(getAllContacts))

router.get('/:contactId', userAuthMiddleware, controllerWrapper(getContactInfoById))

router.post('/', userAuthMiddleware, controllerWrapper(addNewContact))

router.delete('/:contactId', userAuthMiddleware, controllerWrapper(removeContactById))

router.put('/:contactId', userAuthMiddleware, controllerWrapper(updateInfoContactById))

router.patch('/:contactId/favorite', userAuthMiddleware, controllerWrapper(updateStatusContact))

module.exports = router
