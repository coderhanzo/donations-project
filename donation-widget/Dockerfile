# syntax=docker/dockerfile:1
ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION}-slim as base

ENV APP_HOME=/app \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_NO_INTERACTION=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

RUN apt-get update && apt-get install -y \
    gcc \
    binutils \
    libproj-dev \
    gdal-bin \
    pkg-config \
    libpq-dev \
    libmagic1 \
    proj-bin \
    proj-data \
    default-libmysqlclient-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR $APP_HOME

COPY . .

CMD ["flask", "--app", "run"]
