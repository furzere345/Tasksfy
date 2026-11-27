# GestExp — Plateforme de gestion des expérimentations scientifiques

**Projet SAE S3.01 (2026–2027)** — *Département Informatique, IUT de Laval (Le Mans Université)*

Application web centralisée dédiée au pilotage, à la planification et au suivi des expérimentations scientifiques menées au sein des 15 laboratoires de recherche de **Le Mans Université**.

---

## 1. Présentation et objectifs

Les laboratoires de recherche conduisent de nombreuses études impliquant des enseignants-chercheurs, ingénieurs, doctorants et participants volontaires. **GestExp** remplace les outils dispersés par une plateforme unique permettant de :
* Créer et paramétrer des protocoles expérimentaux (ou partir de modèles réutilisables).
* Planifier les créneaux horaires et réserver les ressources matérielles (salles, équipements).
* Gérer les inscriptions, vérifier l'éligibilité des volontaires et recueillir leur consentement éthique (RGPD).
* Suivre les présences, déclencher les rétributions et générer des statistiques d'activité.

---

## 2. Rôles et périmètre fonctionnel

L'application gère **6 profils utilisateurs** avec un contrôle d'accès strict (RBAC) :

1. **Enseignant-chercheur (Responsable d'expérimentation) :** Création/archivage d'études, définition des critères de restriction (âge, langue, port de lunettes, etc.), gestion des créneaux, validation des participants, suivi des présences et attribution des rétributions.
2. **Gestionnaire / Ingénieur de laboratoire :** Gestion du parc matériel et des salles, affectation des ressources et documents aux études, co-validation du planning.
3. **Participant :** Gestion du profil personnel, consultation des études éligibles, signature du consentement, réservation de créneaux, accès aux questionnaires (ex. LimeSurvey) et historique des rétributions.
4. **Responsable d'équipe de recherche :** Supervision de l'avancement des expérimentations, statistiques et rapports d'activité de son équipe.
5. **Directeur de laboratoire :** Vue consolidée et indicateurs de pilotage à l'échelle complète du laboratoire.
6. **Administrateur :** Gestion des comptes et des rôles, administration des modèles globaux, consultation des journaux d'activité (logs), conformité RGPD (anonymisation/archivage) et paramétrage dynamique de l'application.

---

## 3. Architecture et arborescence

Le projet repose sur une architecture **PHP 8.2+ Orientée Objet (MVC)** sans framework lourd, articulée autour d'un point d'entrée unique (*Front Controller*) et d'une base de données relationnelle (**MySQL / MariaDB** ou **SQL Server**).

```text
gestion-experimentations/
├── config/                 # Configuration dynamique (app_config.json) et routeur
├── database/               # Scripts SQL (schema.sql, droits, seed.sql)
├── lang/                   # Dictionnaires multilingues (fr.json, en.json)
├── public/                 # Racine web exposée (index.php, assets CSS/JS, uploads/)
└── src/
    ├── Core/               # Classes socles (Router, BaseController, Session)
    ├── Controllers/        # Contrôleurs métier par domaine fonctionnel
    ├── Models/             # Accès aux données via requêtes préparées PDO
    ├── Services/           # Sécurité, SSO, Journalisation (Logs), RGPD, Config
    └── Views/              # Gabarits HTML5 accessibles (layouts, partials, vues)
```

---

## 4. Exigences techniques, sécurité et accessibilité

* **Zéro valeur en dur :** L'adresse de la base de données, les identifiants, le nom de l'application ainsi que l'ensemble des libellés d'interface sont entièrement paramétrables via `config/app_config.json` et les fichiers `lang/*.json`.
* **Sécurité & Traçabilité :**
  * Authentification unique universitaire (**SSO / ENT**) avec mode de connexion invité/local.
  * Protection contre les injections SQL (PDO préparé), failles XSS, CSRF, force brute et élévation de privilèges.
  * Journalisation complète des connexions, déconnexions, adresses IP et erreurs d'authentification.
  * Conformité **RGPD** (recueil explicite du consentement, droit à l'anonymisation et archivage).
* **Accessibilité & Ergonomie (RGAA / W3C) :**
  * Navigation complète au clavier sans souris (`Tab`, raccourcis et gestion visible du focus).
  * Compatibilité avec les lecteurs d'écran (NVDA, VoiceOver, JAWS, Orca, TalkBack).
  * Basculement natif entre **thème clair** et **thème sombre** avec contrastes adaptés aux personnes malvoyantes et daltoniennes.
  * Interface multilingue (**Français / Anglais**) et responsive (ordinateur, tablette, mobile).

---

## 5. Installation et déploiement

### Prérequis
* Serveur Web (**Apache** avec `mod_rewrite` activé ou **Nginx**)
* **PHP 8.2** ou supérieur (extensions requises : `pdo`, `pdo_mysql` ou `pdo_sqlsrv`, `json`, `mbstring`)
* SGBD **MySQL 8.0+ / MariaDB 10.6+** ou **SQL Server**

### Étapes d'installation

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-depot-git> gestion-experimentations
   cd gestion-experimentations
   ```

2. **Configurer la base de données :**
   * Créer une base de données vide encodée en `utf8mb4` (ex. `gestexp_db`).
   * Exécuter le script de structure :
     ```bash
     mysql -u root -p gestexp_db < database/schema.sql
     ```
   * Importer le jeu d'essai initial (les 6 rôles, laboratoires, équipes et comptes de démonstration) :
     ```bash
     mysql -u root -p gestexp_db < database/seed.sql
     ```

3. **Paramétrer l'application :**
   * Dupliquer le modèle de configuration :
     ```bash
     cp config/app_config.example.json config/app_config.json
     ```
   * Éditer `config/app_config.json` pour renseigner le pilote SQL (`mysql` ou `sqlsrv`), l'hôte, le nom de la base et les identifiants de connexion.

4. **Configurer le serveur web et les permissions :**
   * Faire pointer le `DocumentRoot` de votre hôte virtuel directement sur le dossier **`public/`** afin de protéger `src/` et `config/`.
   * Vérifier que le serveur web dispose des droits d'écriture sur `public/uploads/` et `config/app_config.json`.

---

## 6. Équipe projet

* **Formation :** BUT Informatique — 2ᵉ année (Semestre 3), IUT de Laval
* **Client :** Le Mans Université — Pôle Recherche & Laboratoires
* **Membres du groupe :** *(À compléter avec les noms des membres de votre trinôme)*
