FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    curl

# Install PHP extensions using pre-compiled binaries (bypasses slow compilation of mongodb)
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo pdo_mysql mbstring exif pcntl bcmath gd mongodb

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

COPY start.sh /usr/local/bin/start
RUN chmod +x /usr/local/bin/start \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 10000
CMD ["start"]
