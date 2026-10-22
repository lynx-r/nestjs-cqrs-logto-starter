#!/bin/bash

# 1. Загружаем переменные из .env, если файл существует
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# 2. Проверяем, задан ли DOMAIN, если нет — ставим значение по умолчанию
DOMAIN=${DOMAIN:-localhost.test}
# Папка для сертификатов
SSL_DIR="./ssl"

mkdir -p "$SSL_DIR"

if [ ! -f "$SSL_DIR/$DOMAIN.key" ]; then
    echo "Генерация SSL сертификата для $DOMAIN..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout "$SSL_DIR/localhost.test-key.pem" \
      -out "$SSL_DIR/localhost.test.pem" \
      -subj "/CN=$DOMAIN" \
      -addext "subjectAltName=DNS:$DOMAIN,DNS:*.$DOMAIN"
    echo "Сертификаты созданы в $SSL_DIR"
else
    echo "Сертификаты уже существуют. Пропуск."
fi
