# Contenus d'origine

Ces fichiers sont les contenus du site **avant** sa mise sous CMS, déplacés ici
sans être modifiés d'un caractère. Ils ne sont plus importés par l'application :
leur unique usage est de servir de source à `scripts/reprise-contenus.ts`.

Ils restent versionnés pour deux raisons. Ils permettent de rejouer la reprise
sur un nouveau jeu de données — un environnement de test, par exemple. Et ils
constituent la référence à laquelle comparer le rendu après migration : c'est le
seul moyen de démontrer que rien n'a bougé.

Une fois les contenus repris et vérifiés en production, ce dossier peut être
supprimé. Ne le modifiez pas : toute correction éditoriale se fait désormais
dans le Studio, et une retouche ici ferait diverger la référence de la réalité.

## Ces fichiers ne décrivent plus le site

Le 1er octobre 2026, le site a changé de positionnement — « expert en
transformation IA et digitale » — et les quatre offres ont été renommées : Audit
devient Diagnostic, Sprints devient Solutions ciblées, Accompagnement devient
Pilotage, Formation ne bouge pas. Les URL et les ancres, elles, sont restées.

La quasi-totalité des textes a été réécrite directement dans le jeu de données,
et **ces fichiers n'ont pas suivi**.

Ils restent la photographie du site de septembre 2026, ce qui est encore utile :
`verifier-fidelite.ts` et `verifier-edition.ts` s'en servent comme jeu d'essai,
et aucun des deux ne prétend décrire la production.

En revanche, lancer `reprise-contenus.ts --appliquer` sur un jeu de données
**neuf** y installerait l'ancien positionnement. Sur un jeu existant, la reprise
s'écrit en `createIfNotExists` et ne touche à rien : le risque ne concerne que
la création d'un environnement à partir de zéro.

Pour repartir d'une base propre, mieux vaut dupliquer le jeu de données de
production depuis Sanity que rejouer cette reprise.
