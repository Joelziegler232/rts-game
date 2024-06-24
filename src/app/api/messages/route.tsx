const router = express.Router();
// Ruta para obtener todos los mensajes
router.get('/messages', getMessages);

// Ruta para crear un nuevo mensaje
router.post('/messages', createMessage);

module.exports = router;
