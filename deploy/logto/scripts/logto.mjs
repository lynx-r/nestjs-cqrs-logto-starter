#!/usr/bin/env zx

// Хелпер для команд с dotenv (дамп/рестор)
const withEnv = (cmd) => {
  $`dotenv -e .env -e ../database/.env -- sh -c ${cmd}`;
  console.log('Done!')
};

const command = argv._[0];

switch (command) {
  case "dump":
    withEnv(
      `docker exec -t $DB_HOST pg_dump -U $DB_USER -d $DB_DATABASE -f /backup/logto_backup.dump`,
    );
    break;

  case "restore":
    withEnv(
      `docker exec -t $DB_HOST psql -U $POSTGRES_USER -d $DB_DATABASE -f /backup/logto_backup.dump`,
    );
    break;

  default:
    console.log("Unknown command");
    process.exit(1);
}
