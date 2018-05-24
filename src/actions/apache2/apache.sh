echo "[******] Copying and enable virtualhost 'site.conf'";
cp /tmp/src/actions/apache2/sites-available/site.conf /etc/apache2/sites-available/000-default.conf

echo "[******] Enable Apache Mod CGI";
a2enmod cgi

echo "[******] Enable Site Atlas";
a2ensite 000-default

echo "[******] Restarting Apache 2 Service";
service apache2 reload

echo "[******] Starts Apache using Foreground Mode";
apache2ctl -D FOREGROUND
