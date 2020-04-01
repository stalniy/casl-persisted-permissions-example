import { findBy } from './services/users';
import * as articles from './services/articles';
import { createAbility } from './services/appAbility';

export default async function main() {
  const [admin, author] = await Promise.all([
    findBy({ email: 'admin@casl.io' }),
    findBy({ email: 'author@casl.io' }),
  ]);

  const adminAbility = createAbility(admin!.permissions);
  const authorAbility = createAbility(author!.permissions);

  const adminArticle = {
    title: 'CASl and TypeScript',
    description: 'Is very powerful',
    authorId: admin!.id
  };

  await articles.create(adminAbility, adminArticle);
  console.log('[admin]: created own article')

  try {
    await articles.create(authorAbility, adminArticle);
    console.log('[member]: created article written by admin');
  } catch (error) {
    console.log('[member]: cannot create an article written by admin');
  }

  const authorArticle = {
    title: 'CASl and TypeScript',
    description: 'Is very powerful',
    authorId: author!.id
  };

  await articles.create(adminAbility, authorArticle);
  console.log('[admin]: created article written by author');

  await articles.create(authorAbility, authorArticle);
  console.log('[member]: created article written by himself');

  console.log('\nAll articles ');
  const rawArticles = await articles.find();

  rawArticles.forEach((article) => {
    const prefix = article.authorId === admin!.id ? '[admin]' : '[member]';
    console.log(`${prefix}: ${article.title}`);
  });
}
