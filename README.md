Para acceder a la base de datos y trabajar con las credenciales, debes crear una cuenta.

CMD ==========
mysql -u root -p'password';

mysql> CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'password';

mysql> GRANT ALL PRIVILEGES ON _ . _ TO 'new_user'@'localhost';

mysql> FLUSH PRIVILEGES;
CMD ==========
