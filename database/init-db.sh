#!/bin/bash
set -e

# Выполняем SQL через psql. 
# Переменные POSTGRES_USER и POSTGRES_DB доступны в контейнере по умолчанию.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

  -------------------- Logto --------------------

  -- 1. Создаем пользователя приложения
  CREATE USER ${LOGTO_USER:-logto} WITH PASSWORD '${LOGTO_PASSWORD:-l0gt0}';

  ALTER ROLE ${LOGTO_USER:-logto} WITH CREATEROLE;

  -- Logto аутентификация
  CREATE DATABASE ${LOGTO_DB:-logto} WITH OWNER ${LOGTO_USER:-logto};

  -------------------- Backend --------------------

  -- 1. Создаем пользователя приложения
  CREATE USER ${DATABASE_USERNAME:-backend} WITH PASSWORD '${BACKEND_PASSWORD:-b4ck3nd}';

  CREATE DATABASE ${DATABASE_NAME:-nestjs_cqrs_starter} WITH OWNER ${DATABASE_USERNAME:-backend};

EOSQL
