'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Faut-il vraiment assurer son animal ?',
    a: "Une opération vétérinaire peut coûter entre 500 € et 5 000 €. L'assurance permet de ne pas choisir entre la santé de votre animal et votre budget.",
  },
  {
    q: "Quel est le prix moyen d'une assurance chien ?",
    a: 'Entre 15 € et 55 € par mois selon la race, l\'âge et la formule choisie.',
  },
  {
    q: 'À quel âge souscrire une assurance pour son animal ?',
    a: "Le plus tôt possible — idéalement dès 8 semaines. Plus vous souscrivez jeune, moins il y aura de risque de refus pour maladie préexistante.",
  },
  {
    q: "Qu'est-ce que le délai de carence ?",
    a: "C'est la période après souscription pendant laquelle les sinistres ne sont pas couverts. Généralement 0–15 jours pour les accidents et 15–30 jours pour les maladies.",
  },
  {
    q: 'Comment choisir entre une assurance rapide et une assurance complète ?',
    a: 'Une assurance avec remboursement en 24h est idéale pour les chats et petites races. Pour les chiens de grande race exposés aux dysplasies, privilégiez une formule avec couverture à vie des maladies chroniques.',
  },
  {
    q: 'Les maladies préexistantes sont-elles couvertes ?',
    a: "Non, aucune assurance animaux ne couvre les maladies diagnostiquées avant la souscription.",
  },
]

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className="faq-item">
              <div
                className={`faq-question${isOpen ? ' open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <svg
                  className="faq-chevron"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 5L7 9L11 5"
                    stroke={isOpen ? '#fff' : '#9CA3AF'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={`faq-answer${isOpen ? ' open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
