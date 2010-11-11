---
lang: sv
layout: post
title: Installera Etherpad
description: Etherpad, tjänsten som gjorde det möjligt att redigera dokument med flera i realtid.
---

Etherpad, tjänsten som gjorde det möjligt att redigera dokument med flera i realtid. Men som Google köpte upp och stängde ner för att dra nytta av tekniken i [Google Wave](http://wave.google.com).

Som tur är gav Google ut [Etherpad](https://github.com/ether/pad) koden som opensource.

Det finns ett antal Etherpad kloner på nätet som låter dig skapa publika dokument och som oftast har någon form av abonnemang för privata dokument. 

Men eftersom det är opensource, varför inte installera det själv.

Jag utgick ifrån en Ubuntu 10.10 server.

Installera Java, Scala, MySql och Git

    sudo apt-get install scala openjdk-6-jdk libmysql-java mysql-server git-core

ladda ner källkoden från Github

    git clone https://github.com/ether/pad.git /usr/local/etherpad/

skapa databas och en användare

    mysql -u root -p

    create database etherpad;

    grant all privileges on etherpad.* to 'etherpad'@'localhost' identified by 'ettlosenord';

bygg Etherpad

    cd /usr/local/etherpad/
    ./bin/build.sh

kopiera default konfigurations filen

    cd /usr/local/etherpad/etherpad/etc/
    cp etherpad.localdev-default.properties etherpad.local.properties

editera inställningarna i filen *etherpad.local.properties*

    etherpad.SQL_PASSWORD = ettlosenord
    etherpad.SQL_USERNAME = etherpad
    etherpad.adminPass = adminlosen
    topdomains = mindoman.se,localhost
    customEmailAddress = support@mindoman.se

nu är det bara att starta Etherpad

    cd /usr/local/etherpad/
    ./bin/run.sh

om allt gick bra ska det vara igång

    http://localhost:9000/

Hurra!!

För att administrera och aktivera plugins gå till

    http://localhost:9000/ep/admin/


Om du hade tänkt att köra publikt bör du säkra upp lite och enklast är att använda dig av en reverse proxy tex [Nginx](http://nginx.org/) eller [Apache mod_proxy](http://httpd.apache.org/docs/2.0/mod/mod_proxy.html).

