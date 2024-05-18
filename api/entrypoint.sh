#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    # Wait for PostgreSQL to be ready
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Run any pending database migrations or create the database if necessary
python manage.py create_db

# Seed the database with initial data
python manage.py seed_db

# Execute any additional commands passed as arguments
exec "$@"
