import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import articleCtrl from '../controllers/article.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(articleCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createArticle), articleCtrl.create);

router.route('/:articleId')
  /** GET /api/users/:userId - Get user */
  .get(articleCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateArticle), articleCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(articleCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('articleId', articleCtrl.load);

export default router;
