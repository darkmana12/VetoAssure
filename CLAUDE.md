# CLAUDE.md — Charte éditoriale et opérationnelle VetoAssure

Ce fichier est le **contrat** pour toute rédaction sur ce site. Lis-le intégralement avant d'écrire ou modifier un article.

---

## 0. Règle méta : priorité aux pratiques officielles 2026 (et plus récentes)

**En cas de contradiction entre une pratique de cette charte (ou d'un savoir antérieur) et une source officielle 2026+, la source la plus récente prime systématiquement.** Cette règle s'applique au SEO, au GEO (Generative Engine Optimization), à la perf, à la sécurité et à toute autre pratique technique.

**Hiérarchie des sources** (à appliquer dans cet ordre) :
1. **Officielles** (priorité absolue) : Google Search Central (developers.google.com/search), web.dev, Bing Webmaster Blog, Microsoft Learn, Search Quality Rater Guidelines, documentation Anthropic/OpenAI pour GEO
2. **Secondaires reconnues** : Search Engine Land, Search Engine Journal, Ahrefs Blog, Semrush Blog, Abondance (FR), Search Foresight (FR) — uniquement avec date ≥ 2026 vérifiée
3. **Tertiaires** : autres blogs SEO/dev → seulement par recoupement avec une source 1 ou 2

**Sources interdites** : sources non datées, blogs sans signature, contenu généré IA non vérifié, sites avec historique de désinformation. Si une source est douteuse, on l'ignore.

**Avant d'appliquer une pratique apprise pré-2026** : faire une WebSearch ciblée pour vérifier qu'elle est toujours d'actualité. Si la source 2026+ contredit, c'est elle qui gagne — y compris si cette charte dit autrement.

**Cette charte sera amendée** à chaque évolution majeure documentée par une source officielle.

---

## 1. Mission du site

Comparateur français d'assurances animaux (chien / chat / NAC). Objectif #1 : **revenu d'affiliation**. Le contenu existe pour faire ranker des pages transactionnelles, attirer du trafic qualifié, et convertir vers les assureurs partenaires.

Marché : **France uniquement** (99% du trafic GSC). Pas de version BE / CH / QC pour l'instant.

---

## 2. Règles dures (non négociables)

### Anonymisation des assureurs
- **Tous les articles** (nouveaux ET existants) utilisent des placeholders : `Assurance 1`, `Assurance 2`, … `Assurance 11`.
- Le mapping placeholder → nom réel est dans `~/.claude/projects/<projet>/memory/project_insurer_mapping.md`. Même numéro = même marque sur tout le site.
- **Ne jamais citer** Santévet, Kozoo, Dalma, Acheel, Assur O'Poil, Barkibu, Lovys, Lassie, Fidanimo, Hypnia, Bulle Bleue, ni les liens vers leurs sites (santevet.com, dalma.co, etc.) tant que les contrats d'affiliation ne sont pas signés.
- **Plus aucune exception** (décision 2026-05-03) : zéro nom réel dans `content/`, `app/`, `components/`, `public/`. Vérification : `grep -rn "Santévet\|Dalma\|Lassie\|Bulle Bleue\|Kozoo\|Acheel\|Barkibu\|Lovys\|Fidanimo\|Hypnia\|SelfAssurance\|Assur O" content/ app/ components/ public/` doit renvoyer zéro résultat.
- Activation : quand les contrats sont signés, find-replace global basé sur le mapping (1 paire par marque) pour réintroduire les noms.

### E-E-A-T avec auteur réel autorisé (révisé 2026-05-04)
- **Personas inventés interdits** : pas de vétérinaire fictif (illégal en France, art. L243-1 Code rural), pas d'auteur imaginaire, pas de credentials inventés.
- **Vrai responsable éditorial avec credentials réels = encouragé**. Conforme aux guidelines Google Search Central 2026 sur l'E-E-A-T : « Show full author bylines, credentials, and revision history » et « clear byline with a link on the author's name leading to a bio ». Sur YMYL (assurance), c'est un facteur fort.
- En attente d'ORIAS : signature « **Rédaction VetoAssure** » + page Méthodologie/À propos détaillant l'équipe.
- Dès réception du numéro ORIAS : signature nominative avec mention « Intermédiaire d'assurance ORIAS n° XXXX, formation IOBSP », bio liée, Schema.org `Person` ↔ `Organization.founder`.
- Toute affirmation médicale / chiffrée est **liée à une source publique réelle** : Ordre national des vétérinaires, ANSES, AFVAC, Sevetys, Fregis, VetAgro Sup, INRAE, RVC, études peer-reviewed. Pas de citation inventée.
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
title: '<viser ~60 chars pour display SERP — précision > longueur fixe (Google rewrite 76% des titles)>'
description: '<140-160 chars, contient promesse + chiffre + déclencheur d''action>'
date: '2026-MM-DD'           # date de publication
updatedAt: '2026-MM-DD'      # dernière révision
category: <Pathologie | Race | Comparatif | Guide | Prix | Avis>
readTime: <X min>
coverImage: <URL Unsplash ou /races/xxx.webp>
faq:
  - q: '...'
    a: '...'
  # 4 à 8 questions selon longueur d'article — utile pour AI/GEO (ChatGPT, Perplexity, AIO),
  # PAS pour rich snippets Google (désactivés depuis août 2023 sauf gov/health)
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

Exigences qualitatives (priment sur le word count) :
- Couvrir **tous les sujets** identifiés dans : (a) les People Also Ask Google sur la requête cible, (b) les top 5 résultats SERP, (c) les FAQ frontmatter de l'article. Si un sujet attendu n'est pas traité, l'article est incomplet quel que soit le nombre de mots.
- **3+ liens externes** vers sources autorité réelles (cf. §7), datées récemment (Google 2026 : 85% des citations AIO viennent de contenu < 3 ans).
- **3-5 liens internes contextuels** dans le corps du texte (anchor text varié et descriptif, pas générique « cliquez ici »). Référence : Google Search Central « Links best practices » + Ahrefs guide internal links 2026.
- 1 tableau comparatif minimum dans les comparatifs et "meilleure assurance X".
- **FAQ JSON-LD** : 4-8 questions selon longueur, structure utile pour AI/GEO (ChatGPT, Perplexity, AIO). Note 2026 : Google a désactivé les FAQ rich snippets en août 2023 sauf sites gov/health — on garde le markup pour la valeur GEO, pas SEO direct.

Word count **indicatif, jamais bloquant** (la profondeur prime sur la longueur — Google 2026 : « depth means addressing the searcher's main question and related follow-ups, not writing more ». Donnée AIO : 53% des pages citées font < 1000 mots) :
- Comparatif assureur vs assureur : viser **1 800-2 500 mots**
- "Meilleure assurance [race]" / transactionnel : viser **1 500-2 200 mots**
- Pathologie + coût : viser **1 200-1 800 mots**
- Prix acte vétérinaire / Q&R simple : viser **800-1 500 mots**

→ Si tu ne peux pas tenir la fourchette sans fluff, fais plus court. Mieux vaut 900 mots denses que 1 500 mots dilués (Helpful Content 2026).

Règle anti-remplissage :
- **Aucune phrase sans chiffre, source, condition contractuelle, ou conseil actionnable.** Bannir les tournures vides : « il est important de noter que… », « comme nous l'avons vu… », « dans cet article nous allons voir… », « en résumé, vous l'aurez compris… ».
- **Test du retrait** : si supprimer 200 mots de l'article ne fait perdre aucune info au lecteur, ces 200 mots étaient en trop.
- Préférer un **paragraphe dense de 80 mots** à trois paragraphes vagues de 60 mots.

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

## 5. SEO on-page (révisé 2026-05-04 contre sources officielles)

- **Title** : mot-clé principal en début, viser ~60 caractères pour le display SERP. Note 2026 : Google rewrite 76% des titles (Q1 2025) — la précision et l'alignement avec le contenu priment sur la longueur exacte. Source : Google Search Central « Influencing title links ». Année dans le title si pertinent (« 2026 »).
- **Meta description** : 140-160 caractères, contient le mot-clé, une promesse mesurable, un déclencheur d'action. Note : Google la réécrit aussi souvent — viser le clic, pas le ranking.
- **Slug** : kebab-case, mot-clé principal sans stop words.
- **H1** = `title` du frontmatter (rendu par le template).
- **H2/H3** : intègrent variations sémantiques du mot-clé. Structure claire (bullets, tableaux) — Google 2026 : pages bien structurées 40% plus citées dans AI Overviews.
- **Alt text** images : descriptif réel, pas de keyword stuffing.
- **Maillage interne** : 3-5 liens contextuels par article minimum, anchor text varié et descriptif, dans le corps du texte (pas seulement footer/sidebar). Lier le nouvel article depuis 2-3 articles existants pertinents. Source : Google Search Central + Ahrefs internal links guide 2026.
- **Schema.org** : `Article` + `FAQPage` (utile pour AI/GEO) + `Organization`/`AboutPage` sur pages stratégiques. Vérifier via Rich Results Test après publication. Note : `FAQPage` ne génère plus de rich snippet Google depuis août 2023 sauf gov/health — on le garde pour la valeur GEO (citations ChatGPT, Perplexity, AIO).
- **Author byline** : visible en haut/bas d'article quand un nom est nommable (post-ORIAS), avec lien vers la bio (page Méthodologie/À propos). Source : Google Search Central E-E-A-T 2026.

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
- En particulier : `feedback_anonymisation.md`, `feedback_no_persona.md`, `feedback_seo_geo_2026_priority.md`, `project_insurer_mapping.md`, `project_gsc_baseline.md`

Mettre à jour au fil de l'eau quand des décisions stratégiques changent (cadence, partenariats signés, nouvelles règles).

---

## 10. GEO (Generative Engine Optimization) — pratiques 2026

VetoAssure cible aussi la visibilité dans les moteurs génératifs (ChatGPT Search, Perplexity, Google AI Overviews, Copilot). GEO complète le SEO — ne le remplace pas.

**Faits 2026 (sources officielles + Search Engine Land + Ahrefs)** :
- ChatGPT utilise l'index Bing → 87% de corrélation rang Bing ↔ citation ChatGPT. Bing Webmaster Tools = canal obligatoire.
- AI Overviews : top 3 facteurs de citation = brand web mentions (corr. 0,664), brand anchors (0,527), brand search volume (0,392). Off-site > on-page.
- 85% des citations AIO viennent de contenu < 3 ans → fraîcheur compte.
- 81% du trafic citation AIO est mobile.
- Pages avec structure claire (H2/H3 + bullets) 40% plus citées.

**Actions concrètes pour VetoAssure** :
- **Bing Webmaster Tools** + IndexNow (déjà configuré : workflow GitHub Actions ping après chaque push).
- **Brand mentions** : pitch listicles, forums (Doctissimo, 30millionsdamis, Reddit FR), avis Trustpilot. Mentions non-liées comptent.
- **Schema.org** : `Article`, `FAQPage`, `Organization`, `Person` pour author. Aide les LLMs à mapper les entités.
- **Auteur nommé avec credentials** (ORIAS post-formation) = signal entity authority majeur.
- **Anonymisation** : reconnue comme handicap entity authority. Activer find-replace dès le 1er contrat affiliation.

**Bots à laisser ouverts** (déjà OK dans `app/robots.ts`) : Bingbot, Googlebot, OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot, Google-Extended, CCBot.
