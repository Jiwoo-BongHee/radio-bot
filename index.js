var Discord = require('discord.js');
var token = process.env.Discord_Token; 
var client = new Discord.Client();
var radio = "https://listen.moe/stream" 


client.on("ready", () => {
	console.log("En cours de préparation...")
	console.log("................................................")
	console.log(new Date + "Je suis désormais connecté, merci de ne surtout pas fermer cette fenêtre")
	client.user.setGame("?help pour voir la liste des commandes | Joue actuellement : " + radio)
});

client.on("message", (message) => {

if (message.content === "?join"){
	if (message.member.roles.find("name", "DJ")){
	var channel = message.guild.channels.find('name', "Radio 24/7");
	var auteur = message.author.username;
	var guild = message.guild;
	var radio = "https://listen.moe/stream" 
		if (channel){
		channel.join().then(connection => {
        	connection.playStream(radio);
      		console.log(new Date + auteur + " m'a connecté sur le channel \"Radio 24/7\" du serveur " + guild)
        	});
		}

	if (!channel) { 
		message.channel.send("Le channel \"Radio 24/7\"n'existe pas, merci de le créer")
    	};
    }

    if (!message.member.roles.find("name", "DJ")){
    		message.channel.send("Vous n'avez pas la permission de me controler")
    	}	
}


if (message.content === "?stop"){
var channel = message.guild.channels.find('name', "Radio 24/7");
var auteur = message.author.username;
var guild = message.guild;
	if (channel){
    	if (message.member.roles.find("name", "DJ")){
        	channel.leave();
        	console.log("--Deconnexion--")
        	console.log(new Date + auteur + " m'a déconnecté du channel \"Radio\" du serveur " + guild)
        	};

    	if (!message.member.roles.find("name", "DJ")){
    		message.channel.send("Vous n'avez pas la permission de me controler")
    	}	
	}
};

if (message.content === "?invite"){
	message.channel.send("Voici le lien pour m'ajouter à votre serveur : https://discordapp.com/oauth2/authorize?&client_id=342119944651276290&scope=bot&permissions=0x00000008")
}
	
if (message.content === "?playlist"){
	message.channel.send("Voici la playlist que je joue actuellement : " + radio)
}

if (message.content === "?help"){
	message.channel.send("Regarde tes MP ! :smile:")
	message.author.send([
		"Commandes utilisables :",
		"`?join` : Me fait rejoindre le channel `Radio 24/7` (DJ seuleument)",
		"`?stop` : Me fait quitter le channel `Radio 24/7` (DJ seuleument)",
		"`?help` : Envoie ce message",
		"`?invite` : Envoie le lien pour m'ajouter à votre serveur",
		"`?playlist`: Indique la playlist que je joue actuellement",
		"`?config`: Indique comment faire fonctionner le bot (commande en Message Privé avec le bot uniquement)",
		"Pour la création d'un bot personnalisé, merci de contacter `Atanabe Rio#0178` en MP !"
		])
}

if (message.channel.type == 'dm'){
	if (message.content == '?config'){
		message.author.send([
		"Pour pouvoir gérer le bot (faire les commandes `join` et `stop`), vous devez posséder un rôle `DJ` sans permissions particulières.",
		"Le bot joindra automatiquement un channel intitulé `Radio 24/7`, s'il ne le trouve pas, le bot vous le signalera et vous dira de le créer.",
		"Lors de l'utilisation de `?stop`, le bot quitte automatiquement le channel auquel il est connecté.",
		"Si un problème se pose, merci de contacter `Atanabe Rio#0178` en MP !"
		])
	}
}
	
});

client.login(token);




