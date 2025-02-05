#!/bin/bash

set -e

# # Start MariaDB in the background
# echo "Starting MariaDB service..."
# mysqld_safe &

# echo "Waiting for MariaDB to become available..."
# until mysqladmin ping -h "127.0.0.1" --silent; do
#   sleep 1
# done

export DB_HOST="mariadb"
export DB_USER="root"
export DB_PASS="my-secret-password"
export DB_NAME="baby_names_db"
export DATA_DIR="./data"  # Path to your data directory

# Activate virtual environment if needed
# source /path/to/your/venv/bin/activate

# Run the Python script to load the data
python3 load_data.py

# Optionally, deactivate the virtual environment if used
# deactivate