import main from './main';
import db from './db';

main()
.catch(console.error)
.then(() => db.destroy());
