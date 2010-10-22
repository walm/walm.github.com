---
lang: sv
layout: post
title: IRC Bouncer push me!
description: Push notifications av irc till iPhone med hjälp av ZNC IRC Bouncer och Colloguy Mobile.
---

[Colloguy](http://colloquy.info/) för Mac har en grym funktion som gör att du kan köra en [IRC Bouncer](http://en.wikipedia.org/wiki/Bouncer_\(networking\)) som skicka push notifications till iPhone/iPad på highlights och meddelanden.

Men då kräves det att du har en Mac igång samt att du har tillgång till den över internet för att koppla [Colloguy Mobile](http://colloquy.mobi/).

Själv har jag ingen Mac som står igång uppkopplad hela tiden, däremot har jag en Linux VPS som är igång 24x7.

Så för att få igång det hela med Linux rekommenderar [Colloguy att köra ZNC IRC Bouncer](http://colloquy.info/project/wiki/PushNotifications#ZNCforMacOSXandLinux) *(finns även till Win)*. Till det lägger du till en [module](http://github.com/wired/colloquypush) som gör det möjligt att skicka push till Colloguy Mobile.

Inga svårigheter att få igång och det fungerar riktigt bra.

## Installera ZNC med Colloguy modul

*Ladda ner senaste [ZNC](http://sourceforge.net/projects/znc/files/)*

    tar zxvf znc*.*gz
    ./configure
    make
    sudo make install


ZNC är nu installerat under */usr/local/bin/znc*

Kompilera Colloguy modulen


    curl -LO http://github.com/wired/colloquypush/raw/master/znc/colloquy.cpp

    /usr/local/bin/znc-buildmod colloquy.cpp
    mv colloquy.so ~/.znc/modules/


## Konfigurera

    znc --makeconf

Du får svara på lite frågor *Yes/No*, när det är klart kommer konfigurations filen skrivas till *~/.znc/configs/znc.conf*.

    [ ** ] Building new config
    [ ** ] 
    [ ** ] First lets start with some global settings...
    [ ** ] 
    [ ?? ] What port would you like ZNC to listen on? (1 to 65535): 7070
    [ ?? ] Would you like ZNC to listen using SSL? (yes/no) [no]: yes
    [ ?? ] Would you like to create a new pem file now? (yes/no) [yes]: yes
    [ ?? ] hostname of your shell (including the '.com' portion): my.server.com
    [ ?? ] Would you like ZNC to listen using ipv6? (yes/no) [no]: no
    [ ?? ] Listen Host (Blank for all ips): 
    [ ** ] 
    [ ** ] -- Global Modules --
    [ ** ] 
    [ ?? ] Do you want to load any global modules? (yes/no): yes
    [ ** ] 
    [ ?? ] Load global module <partyline>? (yes/no) [no]: no
    [ ?? ] Load global module <webadmin>? (yes/no) [no]: yes
    [ ** ] 
    [ ** ] Now we need to setup a user...
    [ ** ] 
    [ ?? ] Username (AlphaNumeric): myuser
    [ ?? ] Enter Password: *****
    [ ?? ] Confirm Password: *****
    [ ?? ] Would you like this user to be an admin? (yes/no) [yes]: 
    [ ?? ] Nick [myuser]: 
    [ ?? ] Alt Nick [myuser_]: 
    [ ?? ] Ident [myuser]: 
    [ ?? ] Real Name [Got ZNC?]: My Name
    [ ?? ] VHost (optional): 
    [ ?? ] Number of lines to buffer per channel [50]: 
    [ ?? ] Would you like to keep buffers after replay? (yes/no) [no]: yes
    [ ?? ] Default channel modes [+stn]: 
    [ ** ] 
    [ ** ] -- User Modules --
    [ ** ] 
    [ ?? ] Do you want to automatically load any user modules for this user? (yes/no): yes
    [ ** ] 
    [ ?? ] Load module <admin>? (yes/no) [no]: 
    [ ?? ] Load module <chansaver>? (yes/no) [no]: yes
    [ ?? ] Load module <keepnick>? (yes/no) [no]: 
    [ ?? ] Load module <kickrejoin>? (yes/no) [no]: 
    [ ?? ] Load module <nickserv>? (yes/no) [no]: 
    [ ?? ] Load module <perform>? (yes/no) [no]: 
    [ ?? ] Load module <simple_away>? (yes/no) [no]: 
    [ ** ] 
    [ ** ] -- IRC Servers --
    [ ** ] 
    [ ?? ] IRC server (host only): irc.server.com
    [ ?? ] [irc.server.com] Port (1 to 65535) [6667]: 
    [ ?? ] [irc.server.com] Password (probably empty): 
    [ ?? ] Does this server use SSL? (probably no) (yes/no) [no]: yes
    [ ** ] 
    [ ?? ] Would you like to add another server? (yes/no) [no]: 
    [ ** ] 
    [ ** ] -- Channels --
    [ ** ] 
    [ ?? ] Would you like to add a channel for ZNC to automatically join? (yes/no) [yes]: no
    [ ** ] 
    [ ?? ] Would you like to setup another user? (yes/no) [no]: 
    [ ** ] 
    [ ** ] To connect to this znc you need to connect to it as your irc server
    [ ** ] using the port that you supplied.  You have to supply your login info
    [ ** ] as the irc server password like so... user:pass.
    [ ** ] 
    [ ** ] Try something like this in your IRC client...
    [ ** ] /server <znc_server_ip> 7070 walan:<pass>
    [ ** ] 
    [ ?? ] Launch znc now? (yes/no) [yes]: no

Nu behöver du bara modifiera konfigurationen *(~/.znc/configs/znc.conf)* så att den även laddar Colloguy modulen.
    
    <User myuser>
    .. 

    LoadModule = colloquy

    </User>

Nu är det bara att starta serven och du är redo att ansluta.

    znc

Nu ska du kunna komma åt webadmin för ZNC via https://my.server.com:7070/

## Koppla Colloguy Mobile

1. Lägg till en ny IRC Connection.
2. Fyll i adress till din server
3. Sätt Push Notifications till ON
4. Välj "Advanced"
5. Skriv in port tex 7070 *(som i exemplet ovan)*
6. Aktivera SSL
7. Fyll i username / password
8. Klart!

När du är kopplat emot serven kan du se om din iPhone/iPad är inlagd för push

    /msg *colloquy list


### Tips!

Lägg till flera användare i din ZNC konfig, för att koppla emot fler nät.

Läs [ZNC dokumentationen!](http://en.znc.in/wiki/ZNC)

