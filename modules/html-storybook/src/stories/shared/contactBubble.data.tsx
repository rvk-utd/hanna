import { ContactBubbleProps } from '@reykjavik/hanna-react/ContactBubble';

export const contactBubbleData: ContactBubbleProps = {
  title: 'Hvað getum við gert fyrir þig?',
  links: [
    {
      href: 'https://abendingar.reykjavik.is/',
      target: '_blank',
      label: 'Ábendingar',
      extraLabel: 'Sendu okkur línu',
      icon: 'suggestions',
    },
    {
      label: 'Netspjall',
      extraLabel: 'Opið virka daga kl. 8:30–16:00',
      onClick: () => alert('Netspjall!!'),
      icon: 'livechat',
    },
    {
      href: '/spurt-og-svarad',
      label: 'Spurt og svarað',
      extraLabel: 'Algengar spurningar og svör',
      icon: 'faq',
    },
    {
      href: 'tel:+3544111111',
      label: 'Þjónustuver 411-1111',
      extraLabel: 'Opið virka daga kl. 8:30–16:00',
      icon: 'phone',
    },
    {
      href: 'mailto:upplysingar@reykjavik.is',
      label: 'upplysingar@reykjavik.is',
      extraLabel: 'Sendu okkur línu',
      icon: 'suggestions',
    },
  ],
};
