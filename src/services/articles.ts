import { ForbiddenError, subject } from '@casl/ability';
import db from '../db';
import { AppAbility } from './appAbility';
import { Article } from '../models/Article';

const articles = () => db<Article>('articles');
type PatchedKeys = Partial<Record<keyof Article, any>>;

export async function find(where?: PatchedKeys) {
  return where ? articles().where(where) : articles();
}

export async function create(ability: AppAbility, item: Omit<Article, 'id'>) {
  ForbiddenError.from(ability).throwUnlessCan('create', subject('Article', item));
  const [id] = await articles().insert(item);

  return { id, ...item } as Article;
}

export async function update(ability: AppAbility, item: Article, patch: Partial<Omit<Article, 'id'>>) {
  ForbiddenError.from(ability).throwUnlessCan('update', subject('Article', item));
  await articles()
    .update(patch)
    .where('id', item.id);
}

export async function destroy(ability: AppAbility, item: Article) {
  ForbiddenError.from(ability).throwUnlessCan('delete', subject('Article', item));
  await articles()
    .delete()
    .where('id', item.id);
}
