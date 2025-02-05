#!/bin/sh

set -e

host="$DB_HOST"
port="$DB_PORT"
max_retries=30

echo "Checking if MariaDB is ready at $host:$port..."

retries=0
while ! nc -z "$host" "$port"; do
  retries=$((retries + 1))
  if [ "$retries" -ge "$max_retries" ]; then
    echo "MariaDB did not become ready in time. Exiting."
    exit 1
  fi
  echo "MariaDB not ready yet. Waiting..."
  sleep 2
done

echo "MariaDB is ready!"
exec "$@"
