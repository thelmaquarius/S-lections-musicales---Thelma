fetch('musiques.json')
  .then(response => response.json())
  .then(data => {
    var codeDuBloc = `
      <section>
        <img class="couverture" src="{{image}}" alt="{{musique}} image">
        <br>
        <h1 class="h1js">{{titre}}</h1>
        <br>
        <h2 class="h2js">{{artiste}}</h2>
        <br>
        <div class="fichiers-audio">
      <audio id="audio-{{index}}" src="{{audio}}" preload="auto"></audio>
      <button class="play" data-index="{{index}}">⏵</button>
      <button class="volume" data-action="mute" data-index="{{index}}"> 🔈</button>
      </div>
      <br>
        <p class="p1js">{{description}}</p>
        <br>
        <div class="liens">
          <a href="{{spotify}}" target="_blank"><img src="images/spotify_logo.webp" alt="Lien vers Spotify" class="logo"></a>
          <a href="{{youtube}}" target="_blank"><img src="images/youtube_logo.png" alt="Lien vers YouTube" class="logo"></a>
          <a href="{{deezer}}" target="_blank"><img src="images/deezer_logo.png" alt="Lien vers Deezer" class="logo"></a>
        </div>
      <br>
      </section>
    `;

    let contenuFinal = "";

    data.forEach((musique, index) => {
      let codeFinal = codeDuBloc
        .replace("{{titre}}", musique.titre) // cela remplace le titre de la musique par les données dans le fichier musiques.json
        .replace("{{artiste}}", musique.artiste)
        .replace("{{description}}", musique.description)
        .replace("{{image}}", "images/" + musique.image)
        .replace("{{audio}}", "fichiers_audio/" + musique.audio)
        .replace("{{index}}", index)
        .replace("{{spotify}}", musique.spotify)
        .replace("{{deezer}}", musique.deezer)
        .replace("{{youtube}}", musique.youtube)
               
      contenuFinal += codeFinal;  // permet d'ajouter le code généré à la variable
    });

    document.querySelector("div.liste-musiques").innerHTML = contenuFinal;

      // bouton play/pause pour chaque chanson
      document.querySelectorAll(".play").forEach((button, index) => {
        button.addEventListener("click", function () {
     
          var audio = document.querySelectorAll("audio")[index];
    
          if (button.innerHTML === "⏵") {
            // arrête les autres audios en cours de lecture
            document.querySelectorAll("audio").forEach((otherAudio, i) => {
              if (i !== index) {
                otherAudio.pause();
                otherAudio.currentTime = 0; // Remet à 0
                document.querySelectorAll(".play")[i].innerHTML = "⏵";
              }
            });
    
            audio.play();
            button.innerHTML = "⏸";
          } else {
            audio.pause();
            button.innerHTML = "⏵";
          }
          audio.addEventListener("ended", function () {
            button.innerHTML = "⏵";
          });
        });
    
      });
    
      // bouton de volume pour chaque chanson
      document.querySelectorAll(".volume").forEach((volumeButton, index) => {
        volumeButton.addEventListener("click", function () {
          var audio = document.querySelectorAll("audio")[index];
    
          if (volumeButton.getAttribute("data-action") === "mute") {
            audio.muted = true;
            volumeButton.innerHTML = "🔇";
            volumeButton.setAttribute("data-action", "unmute");
          } else {
            audio.muted = false;
            volumeButton.innerHTML = " 🔈";
            volumeButton.setAttribute("data-action", "mute");
          }
        });
      
    });
    
  })
  .catch(error => {
    console.error('Erreur de chargement du fichier JSON :', error);
  });

var listeMusiques = document.querySelector("div.liste-musiques");
console.log(listeMusiques);

var champs = ["titre", "artiste", "description", "url"];

champs.forEach(champ => {
  document.querySelector(`#${champ}`).addEventListener("keyup", function () {
    console.log(`${champ} : ${document.querySelector(`#${champ}`).value}`);
  });
});

var buttons = document.querySelectorAll('.menu-button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
  });
});

// formulaire
document.querySelector("#bouton").addEventListener("click", function () {
  // cela permet de récupérer les valeurs du formulaire en html
  var titre = document.querySelector("#titre").value;
  var artiste = document.querySelector("#artiste").value;
  var description = document.querySelector("#description").value;

   // cela crée l'URL avec les données récupérées
  var urlVisitee = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?login=tabury&format=json&courriel=philippe.gambette@univ-eiffel.fr&message=${encodeURIComponent(description)}&musique=${encodeURIComponent(titre)}&artiste=${encodeURIComponent(artiste)}&url=${encodeURIComponent(url)}`;

  console.log("URL générée : ");
  console.log(urlVisitee);

  document.querySelector("#bouton").addEventListener("click", function (event) {
    var titre = document.querySelector("#titre").value;
    var artiste = document.querySelector("#artiste").value;
    var description = document.querySelector("#description").value;
    var url = document.querySelector("#url").value;
  
    if (!titre || !artiste || !description || !url) {
      alert("Tous les champs doivent être remplis !");
      return; // ce code empêche l'envoi si des champs sont vides
    }

    else {
  
      alert("Formulaire envoyé !");
      window.scrollTo(0, 0);
    }
  
    var urlVisitee = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?login=tabury&format=json&courriel=philippe.gambette@univ-eiffel.fr&message=${encodeURIComponent(description)}&musique=${encodeURIComponent(titre)}&artiste=${encodeURIComponent(artiste)}&url=${encodeURIComponent(url)}`;
  
    console.log("URL générée : ");
    console.log(urlVisitee);

  // requête avec fetch
  fetch(urlVisitee).then(function(response) {
      response.json().then(function(data) {
        console.log("Réponse reçue : ");
        console.log(data);
      });
    })
    .catch(function(error) {
      console.error("Erreur lors de l'appel à l'API :", error);
    })
})
})

function scrollToPercentage(percentage) {
  var scrollHeight = document.documentElement.scrollHeight; // Hauteur totale de la page
  var targetPosition = (scrollHeight * percentage) / 100; // Position cible
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth' // Défilement fluide
  });
}

// cache les crédits par défaut
document.getElementById("creditsSection").classList.add("hidden");

document.getElementById("credits").addEventListener("click", function() {
  var creditsSection = document.getElementById("creditsSection");
  var creditsButton = document.getElementById("credits");

  if (creditsSection.classList.contains("hidden")) {
      creditsSection.classList.remove("hidden");
      creditsButton.textContent = "Fermer les crédits";
  } else {
      creditsSection.classList.add("hidden");
      creditsButton.textContent = "Afficher les crédits"; 
  }
});
