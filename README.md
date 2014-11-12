mtpjs-node-redis
================

MontpellierJS sur Nodejs et Redis


## Caractéristiques de Nodejs

* Evenementiel
* Monothred
* Garbage Collector

Une application nodejs se constituera a 99% de plusieurs process, 
soit à cause d'un cluster, 
soit par la multiplicité des services
(voir les deux)

## Caractéristiques de Redis

* Minimaliste 
* Performante 
* Evenementiel

## Code stateless 

Autant que possible, il est préférable de produire du code "stateless"

* Facilité de cluster
* Reduction des fuites mémoires 

## Exemple d'architecture

* Tweetping: cerveau + cluster
* Tic Tac Toe: full stateless (100% clusterisable)

## Étapes du tictactoe

1) bootstraping du projet
2) mise en place du server de websocket
3) ecriture du client
4) initialisé le jeu
5) coché une case

TODO: 
6) implement React from
http://jsbin.com/cosucemuva/1/edit?js,output
