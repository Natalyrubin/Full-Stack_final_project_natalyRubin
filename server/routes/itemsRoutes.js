const router = require('express').Router();
const { getAllItems, getItemById, createNewItem, deleteItem, updateItem, /* likeItem */ } = require('../controllers/itemsControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');


router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', mustLogin, allowedRoles(['admin']), createNewItem);
router.delete('/:id', mustLogin, allowedRoles(['admin']), deleteItem)
router.put('/:id', mustLogin, allowedRoles(['admin']), updateItem)


module.exports = router;


