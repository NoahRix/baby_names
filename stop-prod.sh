#!/bin/bash
docker compose -f docker-compose.prod.yml -p baby-names-prod down --remove-orphans