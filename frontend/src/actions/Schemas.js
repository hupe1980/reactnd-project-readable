import { schema } from 'normalizr';

const category = new schema.Entity('categories', {}, {
  idAttribute: 'name',
});
const categoryArray = { categories: new schema.Array(category) };

const post = new schema.Entity('posts');

const comment = new schema.Entity('comments');

const Schemas = {
  CATEGORY: category,
  CATEGORY_ARRAY: categoryArray,
  POST: post,
  POST_ARRAY: [post],
  COMMENT: comment,
  COMMENT_ARRAY: [comment],
};

export default Schemas;
