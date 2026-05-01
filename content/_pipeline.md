# Pipeline éditorial VetoAssure

> Backlog priorisé d'articles à produire. Mis à jour à chaque session.
> Statuts : `idea` → `briefed` → `in-progress` → `published` → `to-update`

Légende clusters :
- 🔥 **TX** = Transactionnel (comparatifs, "meilleure", avis)
- 💰 **PRX** = Prix / coût acte vétérinaire ou pathologie
- 🐾 **RACE** = Page race ou article race-spécifique
- 🩺 **PAT** = Pathologie
- 📚 **GUIDE** = Guide / fonctionnement assurance

---

## Phase 1 — Quick wins prioritaires (issus du GSC baseline 2026-04-30)

Ces actions captent du trafic **déjà en demande** sur le site. Priorité absolue avant toute nouvelle rédac.

### 🚨 P0 — Bloquant SEO
| Action | Type | Détail |
|---|---|---|
| `published` | Restaurer `/avis` + `/avis/[slug]` | TX | Pages supprimées (commit 40406fd) mais 300+ impressions GSC. Soit reconstruire, soit 301 vers `/blog/<slug-équivalent>`. **À discuter avec utilisateur.** |
| `idea` | Fix sitemap `lastModified` | tech | Utiliser `updatedAt` MDX au lieu de `new Date()`. |

### 🥇 P1 — Pages déjà top 10, CTR à zéro → réécrire title/meta
| Statut | Page | Position | Action |
|---|---|---|---|
| `to-update` | `sterilisation-remboursement-assurance` | 5.25 | Title + meta + intro, ajouter chiffres en SERP |
| `to-update` | `maladies-preexistantes-assurance-animaux` | 5.85 | Title plus émotionnel, meta avec promesse claire |
| `to-update` | `combien-coute-veterinaire-2026` | 6.04 | Ajouter "2026" + fourchette de prix dans title |
| `to-update` | `cancer-chien-cout-traitement` | 6.45 | Ajouter coût en title (déjà), durcir la meta |
| `to-update` | `dilatation-torsion-estomac-chien` | 8.45 | Une requête "torsion estomac chien prix" CTR 16.67% — push prix dans le title |
| `to-update` | `diabete-chien-cout-traitement` | 9.21 | Title + meta orientés coût annuel |
| `to-update` | `insuffisance-renale-chronique-chat` | 6.65 | Déjà CTR 1.83% — étendre l'article pour gagner pos 1-3 |

### 🥈 P2 — Pages races sous-exploitées (impressions élevées, position page 3-4)
| Statut | Race / page | Impressions | Position | Action |
|---|---|---|---|---|
| `to-update` | `bouledogue-francais` | 339 | 31.85 | On-page boost + 1 article support « assurance bouledogue français » dans le blog |
| `to-update` | `berger-allemand` | 219 | 36.58 | Idem |
| `to-update` | `ragdoll` | 212 | 33.77 | Idem (chat) |
| `to-update` | `chihuahua` | 188 | 21.14 | Plus proche du top 10 — push final |
| `to-update` | `siamois` | 177 | 39.62 | Race chat — on-page + article |
| `to-update` | `labrador` | 116 | 22.00 | Top 20, push final |
| `to-update` | `golden-retriever` | 116 | 28.80 | On-page boost |
| `to-update` | `beagle` | 79 | 24.01 | Push |
| `to-update` | `yorkshire-terrier` | 77 | 11.25 | Très proche top 10 — push priorité |
| `to-update` | `persan` | 65 | 42.09 | Refonte profonde |

---

## Phase 2 — Cluster transactionnel (priorité revenu)

### 🔥 Comparatifs assureur vs assureur (anonymisés)
> Un par couple stratégique. Format 1 800-2 500 mots, tableau comparatif obligatoire.

| Statut | Sujet (slug suggéré) |
|---|---|
| `idea` | `assurance-1-vs-assurance-2-comparatif` (Santévet vs Kozoo — **existe déjà nommé**, à compléter) |
| `idea` | `assurance-1-vs-assurance-4-comparatif` (Santévet vs Dalma) |
| `idea` | `assurance-2-vs-assurance-4-comparatif` (Kozoo vs Dalma) |
| `idea` | `assurance-1-vs-assurance-5-comparatif` (Santévet vs Acheel) |
| `idea` | `assurance-4-vs-assurance-5-comparatif` (Dalma vs Acheel) |
| `idea` | `assurance-3-vs-assurance-2-comparatif` (Assur'OPoil vs Kozoo) |
| `idea` | `top-assurances-chien-2026` |
| `idea` | `top-assurances-chat-2026` |
| `idea` | `meilleure-assurance-animaux-pas-chere-2026` |
| `idea` | `meilleure-assurance-animaux-premium-2026` |

### 🐾 « Meilleure assurance [race] » — extension du cluster existant
> Tu as 3 articles race ; il en faut 25-30 pour saturer le cluster.

Chiens : `meilleure-assurance-labrador`, `-berger-allemand`, ✅ `-yorkshire-terrier` (publié 2026-05-01), `-chihuahua`, `-cavalier-king-charles`, `-cocker`, `-jack-russell`, `-shih-tzu`, `-bichon-maltais`, `-rottweiler`, `-husky`, `-shiba-inu`, `-staffie`, `-american-staffordshire`, `-berger-australien`, `-border-collie`, `-beagle`, `-teckel`, `-bulldog-anglais`.

Chats : `meilleure-assurance-chat-siamois`, `-persan`, `-ragdoll`, `-bengal`, `-sphynx`, `-british-shorthair`, `-norvegien`, `-savannah`, `-sacre-de-birmanie`.

### 📝 Avis assureur (à reconstruire après décision /avis)
> 11 pages, format avis structuré (note globale, prix, garanties, points forts/faibles, FAQ).

`avis-assurance-1` → `avis-assurance-11`.

---

## Phase 3 — Cluster informationnel (volume + autorité)

### 🩺 Pathologies (étendre l'existant)
| Statut | Sujet |
|---|---|
| `idea` | `epilepsie-chien-cout-traitement` |
| `idea` | `cardiomyopathie-hypertrophique-chat` |
| `idea` | `arthrose-chien-cout-traitement` |
| `idea` | `leishmaniose-chien-traitement` |
| `idea` | `parvovirose-chiot-cout-vaccination` |
| `idea` | `hyperthyroidie-chat-traitement` |
| `idea` | `lymphome-chat-cout-traitement` |
| `idea` | `pyometre-chienne-urgence-cout` |
| `idea` | `obstruction-intestinale-chien-chirurgie` |
| `idea` | `hernie-discale-chien-cout-operation` |
| `idea` | `cushing-chien-cout-traitement` |
| `idea` | `coryza-chat-traitement` |
| `idea` | `fiv-felv-chat-cout-prise-en-charge` |
| `idea` | `glaucome-chien-chat-traitement` |
| `idea` | `cataracte-chien-cout-operation` |

### 💰 Prix actes vétérinaires
| Statut | Sujet |
|---|---|
| `idea` | `prix-vaccin-chien-2026` |
| `idea` | `prix-vaccin-chat-2026` |
| `idea` | `prix-sterilisation-chat-2026` |
| `idea` | `prix-castration-chien-2026` |
| `idea` | `prix-radio-veterinaire-2026` |
| `idea` | `prix-irm-veterinaire-2026` |
| `idea` | `prix-scanner-veterinaire-2026` |
| `idea` | `prix-detartrage-chien-2026` |
| `idea` | `prix-consultation-veterinaire-urgence-2026` |
| `idea` | `prix-euthanasie-incineration-2026` |

### 📚 Guides fonctionnement assurance
| Statut | Sujet |
|---|---|
| `idea` | `comment-choisir-assurance-animaux-2026` |
| `idea` | `assurance-animaux-comment-ca-marche` |
| `idea` | `delai-remboursement-assurance-animaux` |
| `idea` | `plafond-annuel-assurance-animaux` |
| `idea` | `taux-remboursement-assurance-animaux-comparaison` |
| `idea` | `forfait-prevention-assurance-animaux` |
| `idea` | `resilier-assurance-animaux-loi-hamon` |
| `idea` | `assurance-animaux-deductible-vs-franchise` |
| `idea` | `assurance-animaux-multi-animaux-reduction` |
| `idea` | `assurance-chien-categorie-1-2-obligation` |

### 🐰 NAC (volume faible mais peu de concurrence)
| Statut | Sujet |
|---|---|
| `idea` | `assurance-lapin-est-ce-utile` |
| `idea` | `assurance-furet-couverture-2026` |
| `idea` | `assurance-cheval-prix-garanties-2026` |
| `idea` | `assurance-NAC-tortue-perroquet-rongeur` |

---

## Suivi

- Cadence cible : voir `memory/project_vetoassure.md`.
- Re-export GSC mensuel pour mettre à jour priorités quick wins.
- Quand un sujet passe `published`, ajouter date et lien dans cette table.
