# app-pangolin : Etapes

# Back-end :

* Utilisation d'Express.js pour créer l'API.

* Utilisation de MongoDB comme base de données pour stocker les informations sur les Pangolins.

* Utilisation de Mongoose pour définir les modèles de données et les schémas de validation.

* Implémentation des routes suivantes :

    * POST /signup pour permettre à un Pangolin de s'inscrire avec son nom, son adresse e-mail et un mot de passe.
    * POST /login pour permettre à un Pangolin de se connecter en utilisant son adresse e-mail et son mot de passe.
    * POST /logout pour permettre à un Pangolin de se déconnecter de l'application.
    * GET /me pour récupérer les informations sur le Pangolin connecté.
    * PUT /me pour permettre au Pangolin connecté de modifier son nom et/ou son mot de passe.
    * GET /pangolins pour récupérer la liste des Pangolins inscrits.
    * GET /pangolins/:id pour récupérer les informations sur un Pangolin spécifique.
    * PUT /me/role pour permettre au Pangolin connecté de modifier son propre rôle.
    * POST /me/friends pour permettre au Pangolin connecté d'ajouter un ami à partir de la liste des autres Pangolins inscrits.
    * DELETE /me/friends/:id pour permettre au Pangolin connecté de supprimer un ami de sa liste d'amis.

# Front-end :

* Utilisation d'Angular pour créer l'interface utilisateur.

* Utilisation de Bootstrap pour la mise en page et la présentation.

* Création de trois pages principales :
    * Une page de connexion/inscription pour permettre aux Pangolin de se connecter ou de s'inscrire.
    * Une page de profil pour permettre aux Pangolins connectés de voir et de modifier leurs propres informations, y compris leur rôle et leur liste d'amis.
    * Une page de liste des Pangolins pour permettre aux Pangolins connectés de voir les profils des autres Pangolins inscrits et d'ajouter des amis à leur propre liste d'amis.
