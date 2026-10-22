Для установки коннектора для ВКонтакте, один раз выполните команду установки прямо с хоста:

```bash
# Local Dev
docker compose -f docker-compose-dev.yml exec logto npm run cli connector add @workingbit/connector-vk

# Production
docker compose exec logto npm run cli connector add @workingbit/connector-vk
```
