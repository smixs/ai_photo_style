import { Style } from './types';
import { 
  PlushToyIcon, 
  CartoonIcon, 
  StatueIcon, 
  HologramIcon, 
  EightiesIcon, 
  NineteenthCenturyIcon, 
  PhotoBoothIcon, 
  PsychedelicIcon, 
  EightBitIcon, 
  BeardIcon, 
  FunkoPopIcon, 
  OldAgeIcon 
} from './components/icons';


export const STYLES: Style[] = [
  {
    id: 'plush',
    name: 'Плюшевая игрушка',
    icon: PlushToyIcon,
    prompt: 'A soft, high-quality plush toy of a person on the picture, with an oversized head, small body, and stubby limbs. Made of fuzzy fabric with visible stitching and embroidered facial features.',
  },
  {
    id: 'cartoon',
    name: 'Мультфильм',
    icon: CartoonIcon,
    prompt: 'Transform this image into a cute simple cartoon. Use minimal lines and solid colors.',
  },
  {
    id: 'statue',
    name: 'Статуя',
    icon: StatueIcon,
    prompt: 'Make the person look like a classical marble statue, including the clothes and eyes.',
  },
  {
    id: '3d',
    name: '3D Голограмма',
    icon: HologramIcon,
    prompt: 'Turn the person on the provided photo into a 3D transparent line art hologram',
  },
  {
    id: '80s',
    name: '80-е',
    icon: EightiesIcon,
    prompt: 'Make the person in the photo look like a 1980s yearbook photo. Feel free to change the hairstyle and clothing.',
  },
  {
    id: '19th-century',
    name: '19 век',
    icon: NineteenthCenturyIcon,
    prompt: 'Make the photo look like a 19th century daguerreotype. Feel free to change the background to make it period appropriate and add props like Victorian clothing.',
  },
  {
    id: 'photobooth',
    name: 'Photo Booth',
    icon: PhotoBoothIcon,
    prompt: 'Turn the photo into a 3x3 grid of photo strips with different studio-style poses and expressions.',
  },
  {
    id: 'psychedelic',
    name: 'Психоделика',
    icon: PsychedelicIcon,
    prompt: 'Create a 1960s psychedelic hand-drawn poster-style illustration based on this image with bright bold solid colors and swirling shapes.',
  },
  {
    id: '8bit',
    name: '8-бит',
    icon: EightBitIcon,
    prompt: 'Transform this image into a minimalist 8-bit brightly colored cute pixel art scene on a 80x80 pixel grid.',
  },
  {
    id: 'beard',
    name: 'Борода',
    icon: BeardIcon,
    prompt: 'Make the person in the photo look like they have a huge beard.',
  },
  {
    id: 'funko',
    name: 'Funko Pop',
    icon: FunkoPopIcon,
    prompt: 'Create a detailed 3D render of a chibi Funko Pop figure, strictly based on the provided reference photo. The figure should accurately reflect the person\'s appearance, hairstyle, attire, and characteristic style from the photo.',
  },
  {
    id: 'old',
    name: 'Старость',
    icon: OldAgeIcon,
    prompt: 'Make the person in the photo look extremely old.',
  },
];