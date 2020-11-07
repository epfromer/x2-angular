export interface AppTheme {
  name: string
  primary: string
  secondary: string
}

export const appThemes: Array<AppTheme> = [
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=C62828
    name: 'Red',
    primary: '#8e0000',
    secondary: '#c62828',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=F57C00
    name: 'Orange',
    primary: '#bb4d00',
    secondary: '#f57c00',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=FFFF00
    name: 'Yellow',
    primary: '#c7cc00',
    secondary: '#ffff00',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=2E7D32
    name: 'Green',
    primary: '#005005',
    secondary: '#2e7d32',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=283593
    name: 'Blue',
    primary: '#003c8f',
    secondary: '#1565c0',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=6A1B9A
    name: 'Purple',
    primary: '#38006b',
    secondary: '#6a1b9a',
  },
  {
    // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=5D4037
    name: 'Brown',
    primary: '#321911',
    secondary: '#5d4037',
  },
]
