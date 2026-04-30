# CLAUDE.md — Charte éditoriale et opérationnelle VetoAssure

Ce fichier est le **contrat** pour toute rédaction sur ce site. Lis-le intégralement avant d'écrire ou modifier un article.

---

## 1. Mission du site

Comparateur français d'assurances animaux (chien / chat / NAC). Objectif #1 : **revenu d'affiliation**. Le contenu existe pour faire ranker des pages transactionnelles, attirer du trafic qualifié, et convertir vers les assureurs partenaires.

Marché : **France uniquement** (99% du trafic GSC). Pas de version BE / CH / QC pour l'instant.

---

## 2. Règles dures (non négociables)

### Anonymisation des assureurs
- Tous les **nouveaux articles** utilisent des placeholders : `Assurance 1`, `Assurance 2`, … `Assurance 11`.
- Le mapping placeholder → nom réel est dans `~/.claude/projects/<projet>/memory/project_insurer_mapping.md`. Même numéro = même marque sur tout le site.
- **Ne jamais citer** Santévet, Kozoo, Dalma, Acheel, Assur O'Poil, Barkibu, Lovys, Lassie, Fidanimo, Hypnia, Bulle Bleue dans un nouvel article tant que les contrats d'affiliation ne sont pas signés.
- Exception : pages déjà existantes qui les citent (le comparatif `assurance-1-vs-assurance-2-comparatif.mdx`, anciennes routes `/avis/[slug]` désormais redirigées) — ne pas y toucher sans validation explicite.

### E-E-A-T sans persona
- Auteur affiché = **« L'équipe VetoAssure »** ou **« Rédaction VetoAssure »**. Jamais de nom personnel, jamais de vétérinaire fictif (illégal en France, art. L243-1 Code rural).
- Toute affirmation médicale / chiffrée est **liée à une source publique réelle** : Ordre national des vétérinaires, ANSES, AFVAC, Sevetys, Fregis, vetagro-sup.fr, INRAE, RVC, études peer-reviewed. Pas de citation inventée.
- Chaque article finit sur une ligne `Sources vérifiées le [date]`.

### Conformité juridique assurance
- Ne jamais écrire « garantie totale », « remboursement à 100% systématique », « toujours couvert ». L'assurance dépend du contrat.
- Mentionner les délais de carence et exclusions chaque fois qu'on parle d'une garantie.
- Pas de conseil financier ou médical personnalisé. Toujours renvoyer vers vétérinaire pour un cas individuel.
- Les chiffres de prix doivent être datés (« en 2026 », « relevés en avril 2026 »).

### Pas de confirmation utilisateur ?
Voir `memory/project_editorial_workflow.md` pour la liste des actions qui exigent un go explicite (publication transactionnelle, modif article top 10, suppression d'URL).

---

## 3. Structure type d'un article

Frontmatter MDX **obligatoire** :

```yaml
---
title: '<55-60 chars, contient le mot-clé principal et l'année si pertinent>'
description: '<140-160 chars, contient promesse + chiffre + appel à action implicite>'
date: '2026-MM-DD'           # date de publication
updatedAt: '2026-MM-DD'      # dernière révision
category: <Pathologie | Race | Comparatif | Guide | Prix | Avis>
readTime: <X min>
coverImage: <URL Unsplash ou /races/xxx.webp>
faq:
  - q: '...'
    a: '...'
  # 6 à 8 questions
---
```

Squelette du corps :

1. **Intro** (3-5 phrases) : pose le problème, donne 1-2 chiffres chocs, annonce ce que l'article apporte.
2. **`<KNBox>`** avec 3 chiffres clés (coût, délai, prévalence, etc.).
3. **H2 #1** — contexte / définition (la pathologie, la race, le concept).
4. **H2 #2** — chiffrage / données (prix, prévalence, durée).
5. **H2 #3** — ce que les assurances couvrent / ne couvrent pas (anonymisé).
6. **H2 #4** — quels critères choisir / comparer.
7. **H2 #5** — étapes pratiques / checklist.
8. **Conclusion** courte avec CTA implicite vers comparateur ou autre article.
9. **Sources vérifiées le …**

Exigences quantitatives :
- 1 200 mots **minimum** pour un article informationnel
- 2 000 mots **minimum** pour un comparatif / transactionnel
- **3+ liens externes** vers sources autorité réelles
- **4+ liens internes** vers d'autres pages du site (race, pathologie, guide)
- 1 tableau comparatif minimum dans les comparatifs et "meilleure assurance X"
- 6-8 questions FAQ JSON-LD

---

## 4. Ton éditorial

- **Direct, expert, pédagogique.** Pas de blabla introductif. Le lecteur cherche une réponse, on la donne.
- Phrases courtes. Une idée par phrase quand possible.
- Chiffres en gras dans le texte courant : **3 000 à 9 000 €**.
- Tutoiement interdit. Vouvoiement neutre.
- Pas d'emoji dans le contenu publié.
- Pas de superlatifs vides (« incroyable », « extraordinaire »).
- Quand on parle d'un assureur anonymisé : « Assurance 1 propose… », « contrairement à Assurance 4 qui exclut… ».

---

## 5. SEO on-page

- **Title** : mot-clé principal en début, 50-60 caractères, année si transactionnel.
- **Meta description** : 140-160 caractères, contient le mot-clé, une promesse mesurable, un déclencheur d'action.
- **Slug** : kebab-case, mot-clé principal sans stop words.
- **H1** = `title` du frontmatter (rendu par le template).
- **H2/H3** : intègrent variations sémantiques du mot-clé.
- **Alt text** images : descriptif réel, pas de keyword stuffing.
- **Maillage interne** : depuis chaque nouvel article, lier au moins 4 pages cousines (race, pathologie, guide, comparateur). Ajouter aussi un lien depuis 2-3 articles existants vers le nouveau.
- **Schema.org** : Article + FAQPage déjà gérés par le template `app/blog/[slug]/page.tsx`. Vérifier après publication via Rich Results Test.

---

## 6. Workflow de production

Pas à pas pour un article :

1. Choisir un sujet dans `content/_pipeline.md` (status `idea`).
2. Lancer une recherche web sur la requête cible. Noter les 5 premiers résultats : angle, longueur, ce qu'ils omettent.
3. Rédiger un **outline** (H2/H3 + FAQ) et le proposer à l'utilisateur si l'article est transactionnel.
4. Rédiger le MDX.
5. Cocher la **checklist finale** (voir `content/_charte-redactionnelle.md`).
6. Mettre à jour `_pipeline.md` (status `published`).
7. Commit avec format : `Blog: <focus de l'article> — <angle clé>`.

---

## 7. Sources autorité whitelistées

À privilégier pour les liens externes (en France) :
- Ordre national des vétérinaires : https://www.veterinaire.fr
- ANSES : https://www.anses.fr
- AFVAC : https://afvac.com
- Sevetys (réseau cliniques) : https://sevetys.fr
- Fregis (clinique référente) : https://www.fregis.com
- VetAgro Sup (école vétérinaire Lyon) : https://www.vetagro-sup.fr
- Royal Veterinary College : https://www.rvc.ac.uk
- INRAE : https://www.inrae.fr
- Centrale Canine : https://www.centrale-canine.fr
- LOOF (registre chats) : https://www.loof.asso.fr
- Veterinary Medicines Directorate, NIH PMC pour études cliniques

Sources interdites : Wikipedia comme source principale, blogs sans signature, sites concurrents directs (autres comparateurs).

---

## 8. Stack technique pertinente

- **Framework** : Next.js 14 App Router. Articles en MDX avec `next-mdx-remote`.
- **Composants custom dispo** : `<KNBox>`, `<KN>` pour chiffres clés.
- **Sitemap** : `app/sitemap.ts` (auto depuis `lib/mdx`).
- **Robots** : `app/robots.ts`.
- **Images** : Unsplash via API (route `app/api/unsplash`) ou fichiers `/public/races`.

---

## 9. Mémoire persistante

Avant toute session, lire :
- `~/.claude/projects/<projet>/memory/MEMORY.md` (index)
- En particulier : `feedback_anonymisation.md`, `feedback_no_persona.md`, `project_insurer_mapping.md`, `project_gsc_baseline.md`

Mettre à jour au fil de l'eau quand des décisions stratégiques changent (cadence, partenariats signés, nouvelles règles).
