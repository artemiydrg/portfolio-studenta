export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  year: number;
};

export const projects: Project[] = [
  {
    id: '1',
    name: 'Tetris Mobile',
    description:
      'Klasyczna gra Tetris zaimplementowana jako natywna aplikacja na Androida. Gra zawiera pełną mechanikę spadających klocków, system punktacji, poziomy trudności oraz animacje. Interfejs został zaprojektowany z myślą o wygodnej obsłudze dotykowej.',
    technologies: ['Java', 'Android Studio', 'XML'],
    year: 2024,
  },
  {
    id: '2',
    name: 'Komunikator (Telegram-like)',
    description:
      'Aplikacja do komunikacji w czasie rzeczywistym inspirowana Telegramem. Umożliwia wysyłanie wiadomości, zakładanie kont użytkowników oraz przeglądanie historii czatu. Projekt jest wdrożony i dostępny w sieci — działa do dziś.',
    technologies: ['Java', 'CSS', 'HTML', 'Visual Studio Code'],
    year: 2026,
  },
  {
    id: '3',
    name: 'Formularz kontaktowy',
    description:
      'Interaktywna karta kontaktowa umożliwiająca użytkownikowi wprowadzenie swoich danych osobowych, adresu e-mail oraz wiadomości. Formularz posiada walidację pól, responsywny układ oraz potwierdzenie wysłania danych.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Visual Studio Code'],
    year: 2026,
  },
];