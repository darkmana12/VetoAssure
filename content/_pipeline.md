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
| ✅ title/meta refait 2026-05-03 | `sterilisation-remboursement-assurance` | 5.25 | Title chiffré (100-450 €) + meta avec promesse forfait prévention |
| ✅ title/meta refait 2026-05-03 | `maladies-preexistantes-assurance-animaux` | 5.85 | Title déclencheur "3 solutions" + meta orientée action |
| ✅ title/meta refait 2026-05-03 | `combien-coute-veterinaire-2026` | 6.04 | Title avec fourchette consult/chirurgie + meta enrichie (vaccin, stéri, chir) |
| ✅ title/meta refait 2026-05-03 | `cancer-chien-cout-traitement` | 6.45 | Title resserré + meta avec 3 chiffres clés (chir 1500, chimio 3000, radio 5000) |
| ✅ title/meta refait 2026-05-03 | `dilatation-torsion-estomac-chien` | 8.45 | Title "2026 chirurgie urgence" + meta avec 3 races à risque nommées |
| ✅ title/meta refait 2026-05-03 | `diabete-chien-cout-traitement` | 9.21 | Title "à vie" pour intent durée + meta avec délai carence + astuces budget |
| ✅ title/meta refait 2026-05-03 | `insuffisance-renale-chronique-chat` | 6.65 | Title avec proportion "1 chat sur 3" + meta avec pronostic explicite |

### 🥈 P2 — Pages races sous-exploitées (impressions élevées, position page 3-4)
| Statut | Race / page | Impressions | Position | Action |
|---|---|---|---|---|
| ✅ refondu 2026-05-02 | `bouledogue-francais` | 339 | 31.85 | Article support refondu au standard charte v2 (2 433 mots, 8 FAQ, tableau Assurance 1-6, sources autorité) |
| `to-update` | `berger-allemand` | 219 | 36.58 | Idem |
| `to-update` | `ragdoll` | 212 | 33.77 | Idem (chat) |
| `to-update` | `chihuahua` | 188 | 21.14 | Plus proche du top 10 — push final |
| `to-update` | `siamois` | 177 | 39.62 | Race chat — on-page + article |
| `to-update` | `labrador` | 116 | 22.00 | Top 20, push final |
| ✅ refondu 2026-05-02 | `golden-retriever` | 116 | 28.80 | Article support refondu charte v2 (2 324 mots, 8 FAQ, tableau Assurance 1-6, plafond oncologique en focus) |
| ✅ publié 2026-05-02 | `beagle` | 79 | 24.01 | Article support créé charte v2 (2 190 mots, 8 FAQ, tableau Assurance 1-6, focus épilepsie + hernie discale chondrodystrophie) |
| `to-update` | `yorkshire-terrier` | 77 | 11.25 | Très proche top 10 — push priorité |
| ✅ publié 2026-05-02 | `persan` | 65 | 42.09 | Article support créé charte v2 (2 275 mots, 8 FAQ, tableau Assurance 1-6, focus PKD + brachycéphale + ophtalmo) |

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

Chiens : ✅ `meilleure-assurance-labrador` (publié), ✅ `-berger-allemand` (publié), ✅ `-yorkshire-terrier` (publié), ✅ `-chihuahua` (publié), ✅ `-bouledogue-francais` (refondu 2026-05-02), ✅ `-golden-retriever` (refondu 2026-05-02), ✅ `-beagle` (publié 2026-05-02), ✅ `-boxer` (publié 2026-05-02), `-cavalier-king-charles`, `-cocker`, `-jack-russell`, `-shih-tzu`, `-bichon-maltais`, `-rottweiler`, `-husky`, `-shiba-inu`, `-staffie`, `-american-staffordshire`, `-berger-australien`, `-border-collie`, `-teckel`, `-bulldog-anglais`.

Chats : ✅ `meilleure-assurance-siamois` (publié), ✅ `-persan` (publié 2026-05-02), ✅ `-ragdoll` (publié), ✅ `-maine-coon` (refondu 2026-05-02), ✅ `-bengal` (publié 2026-05-02), ✅ `-sphynx` (publié 2026-05-02), ✅ `-british-shorthair` (publié 2026-05-02), ✅ `-abyssin` (publié 2026-05-02), `-norvegien`, `-savannah`, `-sacre-de-birmanie`.

### 📝 Avis assureur (à reconstruire après décision /avis)
> 11 pages, format avis structuré (note globale, prix, garanties, points forts/faibles, FAQ).

`avis-assurance-1` → `avis-assurance-11`.

---

## Phase 3 — Cluster informationnel (volume + autorité)

### 🩺 Pathologies (étendre l'existant)
| Statut | Sujet |
|---|---|
| ✅ publié 2026-05-03 | `epilepsie-chien-cout-traitement` |
| ✅ publié 2026-05-03 | `cardiomyopathie-hypertrophique-chat` |
| ✅ publié 2026-05-03 | `arthrose-chien-cout-traitement` |
| ✅ publié 2026-05-03 | `leishmaniose-chien-traitement` |
| ✅ publié 2026-05-03 | `parvovirose-chiot-cout-vaccination` |
| ✅ publié 2026-05-03 | `hyperthyroidie-chat-traitement` |
| ✅ publié 2026-05-03 | `lymphome-chat-cout-traitement` |
| ✅ publié 2026-05-03 | `pyometre-chienne-urgence-cout` |
| ✅ publié 2026-05-03 | `obstruction-intestinale-chien-chirurgie` |
| ✅ publié 2026-05-03 | `hernie-discale-chien-cout-operation` |
| ✅ publié 2026-05-03 | `cushing-chien-cout-traitement` |
| ✅ publié 2026-05-03 | `coryza-chat-traitement` |
| ✅ publié 2026-05-03 | `fiv-felv-chat-cout-prise-en-charge` |
| ✅ publié 2026-05-03 | `glaucome-chien-chat-traitement` |
| ✅ publié 2026-05-03 | `cataracte-chien-cout-operation` |

### 💰 Prix actes vétérinaires
| Statut | Sujet |
|---|---|
| ✅ publié 2026-05-02 | `prix-vaccin-chien-2026` |
| ✅ publié 2026-05-02 | `prix-vaccin-chat-2026` |
| ✅ publié 2026-05-02 | `prix-sterilisation-chat-2026` |
| ✅ publié 2026-05-03 | `prix-castration-chien-2026` |
| ✅ publié 2026-05-03 | `prix-radio-veterinaire-2026` |
| ✅ publié 2026-05-02 | `prix-irm-veterinaire-2026` |
| ✅ publié 2026-05-02 | `prix-scanner-veterinaire-2026` |
| ✅ publié 2026-05-02 | `prix-detartrage-chien-2026` |
| ✅ publié 2026-05-03 | `prix-consultation-veterinaire-urgence-2026` |
| ✅ publié 2026-05-03 | `prix-euthanasie-incineration-2026` |

### 📚 Guides fonctionnement assurance
| Statut | Sujet |
|---|---|
| ✅ publié 2026-05-03 | `comment-choisir-assurance-animaux-2026` |
| ✅ publié 2026-05-03 | `assurance-animaux-comment-ca-marche` |
| ✅ publié 2026-05-03 | `delai-remboursement-assurance-animaux` |
| ✅ publié 2026-05-03 | `plafond-annuel-assurance-animaux` |
| ✅ publié 2026-05-03 | `taux-remboursement-assurance-animaux-comparaison` |
| ✅ publié 2026-05-03 | `forfait-prevention-assurance-animaux` |
| ✅ publié 2026-05-03 | `resilier-assurance-animaux-loi-hamon` |
| ✅ publié 2026-05-03 | `assurance-animaux-deductible-vs-franchise` |
| ✅ publié 2026-05-03 | `assurance-animaux-multi-animaux-reduction` |
| ✅ publié 2026-05-03 | `assurance-chien-categorie-1-2-obligation` |

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
