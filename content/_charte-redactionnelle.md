# Charte rédactionnelle — Template MDX et checklist

> Avant chaque rédaction : lire `CLAUDE.md` (charte) puis utiliser ce fichier comme template + checklist finale.

---

## Template MDX

Copier-coller ce squelette dans `content/blog/<slug>.mdx`, puis remplir.

```mdx
---
title: '<55-60 chars — mot-clé en début + année si transactionnel>'
description: '<140-160 chars — mot-clé + chiffre + bénéfice>'
date: '2026-MM-DD'
updatedAt: '2026-MM-DD'
category: <Pathologie | Race | Comparatif | Guide | Prix | Avis>
readTime: <X min>
coverImage: '<URL Unsplash ou /races/xxx.webp>'
faq:
  - q: '<question 1 conversationnelle, telle que tapée dans Google>'
    a: '<réponse 60-90 mots, autonome, contient un chiffre ou une condition concrète>'
  - q: '...'
    a: '...'
  # 6 à 8 questions au total
---

<!-- INTRO : 3-5 phrases. Problème + chiffre choc + ce que l'article apporte. -->

<KNBox>
  <KN val="<chiffre 1>" label="<libellé court>" color="#DC2626" />
  <KN val="<chiffre 2>" label="<libellé court>" color="#D97706" />
  <KN val="<chiffre 3>" label="<libellé court>" color="#1D4ED8" />
</KNBox>

## H2 — Contexte / définition

### H3 — Sous-aspect 1

Texte avec **chiffres en gras** et au moins un lien vers une [source autorité](https://www.veterinaire.fr).

### H3 — Sous-aspect 2

## H2 — Données chiffrées (prix, prévalence, durée)

| Colonne | Colonne | Colonne |
|---|---|---|
| ... | ... | ... |

## H2 — Ce que les assurances couvrent (anonymisé)

Assurance 1 propose… Assurance 4 exclut… (référencer `memory/project_insurer_mapping.md`).

## H2 — Critères pour choisir / comparer

- Critère 1 : explication concrète
- Critère 2 : explication concrète

## H2 — Étapes pratiques / checklist

1. ...
2. ...

## Conclusion

CTA implicite : « Pour comparer les formules disponibles, voyez notre [comparateur assurance chien](/chien). »

[Lien interne 1](/blog/...) · [Lien interne 2](/races/...) · [Lien interne 3](/blog/...) · [Lien interne 4](/...)

---

*Sources vérifiées le <date>. Cet article est informatif et ne se substitue pas à l'avis d'un vétérinaire ni aux conditions générales du contrat d'assurance.*
```

---

## Checklist finale (avant commit)

### Frontmatter
- [ ] `title` 50-60 caractères, mot-clé principal en début, année si transactionnel
- [ ] `description` 140-160 caractères, contient mot-clé + chiffre + bénéfice
- [ ] `date` et `updatedAt` au format `YYYY-MM-DD`
- [ ] `category` parmi : Pathologie / Race / Comparatif / Guide / Prix / Avis
- [ ] `readTime` réaliste (1 min ≈ 200 mots lus)
- [ ] `coverImage` valide (Unsplash ou local)
- [ ] `faq` 6 à 8 entrées, réponses 60-90 mots, autonomes, avec chiffre ou condition

### Corps
- [ ] Intro 3-5 phrases, contient au moins 1 chiffre clé
- [ ] `<KNBox>` avec 3 chiffres en début d'article
- [ ] 1 200 mots minimum (info) / 2 000 mots minimum (TX)
- [ ] H2 logiques, H3 utilisés pour sous-aspects
- [ ] 1 tableau minimum (obligatoire pour comparatifs et "meilleure assurance X")
- [ ] **3+ liens externes** vers sources autorité whitelistées (cf. CLAUDE.md §7)
- [ ] **4+ liens internes** vers blog / race / hubs
- [ ] Tous les chiffres en gras dans le corps
- [ ] Pas de superlatif vide, pas d'emoji, pas de tutoiement

### Anonymisation
- [ ] Aucun nom réel d'assureur (Santévet, Kozoo, Dalma, Acheel, Assur'OPoil, Barkibu, Lovys, Lassie, Fidanimo, Hypnia, Bulle Bleue) sauf exception validée
- [ ] Placeholders `Assurance 1` à `Assurance 11` cohérents avec `project_insurer_mapping.md`

### E-E-A-T
- [ ] Aucun nom de personne (auteur, vétérinaire) inventé
- [ ] Toute affirmation médicale ou chiffrée a une source réelle
- [ ] Mention finale "Sources vérifiées le …"

### Conformité juridique
- [ ] Pas de "garantie totale" / "remboursement à 100% systématique"
- [ ] Délais de carence et exclusions mentionnés
- [ ] Pas de conseil financier ou médical personnalisé

### SEO technique
- [ ] Slug kebab-case, mot-clé principal sans stop words
- [ ] Alt text descriptif pour chaque image
- [ ] 2-3 articles existants mis à jour pour pointer vers ce nouvel article (maillage interne entrant)

### Post-publication
- [ ] Mettre à jour `content/_pipeline.md` (status `published` + date)
- [ ] Vérifier rendu en local (`npm run dev`)
- [ ] Tester URL dans Rich Results Test (FAQ + Article schema)
- [ ] Commit message format : `Blog: <focus> — <angle clé>`
