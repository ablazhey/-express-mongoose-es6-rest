import Article from '../models/article.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Article.get(id)
    .then((article) => {
      req.article = article; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get article
 * @returns {Article}
 */
function get(req, res) {
  return res.json(req.article);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Article}
 */
function create(req, res, next) {

  const article = new Article({
    title: req.body.title,
    text: req.body.text
  });

  article.save()
    .then(savedArticle => res.json(savedArticle))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Article}
 */
function update(req, res, next) {
  const article = req.article;
  article.title = req.body.title;
  article.text = req.body.text;

  article.save()
    .then(savedArticle => res.json(savedArticle))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Article[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Article.list({ limit, skip })
    .then(articles => res.json(articles))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {Article}
 */
function remove(req, res, next) {
  const article = req.article;
  article.remove()
    .then(deletedArticle => res.json(deletedArticle))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
