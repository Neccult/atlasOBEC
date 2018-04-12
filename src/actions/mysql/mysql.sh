echo "[******] Starts Mysql";
/etc/init.d/mysql start

echo "[******] Create database";
mysqladmin create Atlas

echo "[******] Dump";
mysql -u root < /var/www/atlasOBEC/data/sql/dump-Atlas.sql
