sdk install java 8.0.452-zulu
sdk install grails 3.3.18
brew install mariadb
$ hash -r && type node | awk '{print $3}' | xargs file
\*\*/.nvm/versions/node/v14.21.3/bin/node: Mach-O 64-bit executable x86_64
$ arch; node --version
arm64
v14.21.3
mysql -u root -p -e 'create database openboxes default charset utf8;'
mysql -u root -p -e 'CREATE USER "openboxes"@"localhost" IDENTIFIED BY "openboxes";'
mysql -u root -p -e 'GRANT ALL PRIVILEGES ON openboxes.* TO "openboxes"@"localhost";'
mysql -u root -p -e 'FLUSH PRIVILEGES;'
dataSource:
  url: jdbc:mariadb://localhost:3306/openboxes?serverTimezone=UTC&useSSL=false
  driverClassName: org.mariadb.jdbc.Driver
  npm config set engine-strict true
npm install
grails run-app

