bash /tmp/src/actions/apache2/apache.sh
bash /tmp/src/actions/mysql/mysql.sh

rm /var/www/html
ln -s /var/www/atlasOBEC /var/www/html

exit 0
